import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { PrismaService } from "prisma/prisma.service";
import { rimraf } from "rimraf";
import {
  ConnectWhatsappInput,
  DisconnectWhatsappInput,
  SendMessageInput,
  SendMessageResponse,
  ShutdownResponse,
  ShutdownWhatsappInput,
  WhatsappConnectionResponse,
} from "src/graphql";
import { GatewayService } from "src/handlers/gateway/gateway.service";
import { Client, MessageMedia, NoAuth } from "whatsapp-web.js";

@Injectable()
export class WhatsappService {
  constructor(
    private prismaService: PrismaService,
    private gatewayService: GatewayService,
  ) {}

  public clientsMap: Map<string, Client | null> = new Map();

  async shutdown({
    companyId,
  }: ShutdownWhatsappInput): Promise<ShutdownResponse> {
    const company = await this.prismaService.company.findFirst({
      where: {
        id: companyId,
      },
      include: {
        users: true,
      },
    });

    if (!company) throw new Error("Company não encontrada.");

    for (const user of company.users) {
      const directoryPath =
        "/home/ec2-user/javelyn/.wwebjs_auth/session-client-" + user.id;

      if (fs.existsSync(directoryPath)) {
        try {
          await rimraf(directoryPath, {});
        } catch (err) {
          console.error("Erro ao excluir a pasta:", err);
        }
      }

      const client = this.clientsMap.get(`wweb-client-${user.id}`);

      if (!client) continue;
      if (client.pupBrowser) {
        const events = client.eventNames();
        if (!events.includes("qr")) continue;
        console.log("shutting down pupbrowser for wweb-client-" + user.id);
        await client.pupBrowser.close();
      } else if (client.pupPage) {
        console.log("shutting down puppage for wweb-client-" + user.id);
        await client.pupPage.close();
      } else {
        console.log("no pup. skipping for wweb-client-" + user.id);
      }

      this.clientsMap.set(`wweb-client-${user.id}`, null);
    }

    const io = this.gatewayService.server;
    io.to(`ws-room-${company.id}`).emit("client-disconnected");

    // await this.prismaService.company.update({
    //   where: {
    //     id: company.id,
    //   },
    //   data: {
    //     whatsappFreeSlots: company.whatsappSlots,
    //   },
    // });

    return { succeeded: true };
  }

  async disconnect({
    userId,
  }: DisconnectWhatsappInput): Promise<WhatsappConnectionResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        company: true,
      },
    });

    if (!user) throw new Error("ERRO: não foi possível encontrar 'user'.");

    const client = this.clientsMap.get(`wweb-client-${userId}`);
    if (!client?.pupBrowser)
      return {
        isConnected: false,
        message: "Não está conectado.",
      };

    const state = await client.getState();

    if (state === "CONNECTED") {
      await client.pupBrowser.close();
    } else {
      client.removeAllListeners();
      client.pupBrowser.close();
    }

    await this.prismaService.$transaction([
      // this.prismaService.company.update({
      //   where: {
      //     id: user.company.id,
      //   },
      //   data: {
      //     whatsappFreeSlots: {
      //       increment: 1,
      //     },
      //   },
      // }),
      this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          zapStatus: "disconnected",
        },
      }),
    ]);

    this.clientsMap.set(`wweb-client-${userId}`, null);
    const socket = this.gatewayService.server;
    socket.to(`ws-solo-room-${user.id}`).emit("client-disconnected");

    return {
      isConnected: false,
      message: "Desconectado com sucesso.",
    };
  }

  async sendMessage({
    userId,
    message,
    leadIds,
    companyId,
    file,
    phoneNumbers,
  }: SendMessageInput): Promise<SendMessageResponse> {
    const client = this.clientsMap.get(`wweb-client-${userId}`);
    if (!client) throw new Error("Sem conexão.");
    if (!leadIds && !phoneNumbers) throw new Error("Sem alvos.");

    if (!leadIds && leadIds.length === 0) {
      for (const phone of phoneNumbers) {
        if (phone.toString().length < 8) {
          console.log("Invalid phone number: " + phone);
          continue;
        }

        if (file) {
          const imageBuffer = Buffer.from(file.buffer, "base64");
          const media = new MessageMedia(
            file.mimetype,
            imageBuffer.toString("base64"),
          );

          await client.sendMessage(
            `55${phone.toString().trim()}@c.us`,
            message,
            {
              media,
            },
          );
          console.log("Sending message with no cdata to: " + phone);
          await new Promise((resolve) => setTimeout(resolve, 1000)); ///// WAITS FOR 1 SECOND TO PREVENT WHATSAPP BUG FOR SENDING TOO MANY MSGS
        } else {
          await client.sendMessage(
            `55${phone.toString().trim()}@c.us`,
            message,
          );
          console.log("Sending message with no cdata to: " + phone);
          await new Promise((resolve) => setTimeout(resolve, 1000)); ///// WAITS FOR 1 SECOND TO PREVENT WHATSAPP BUG FOR SENDING TOO MANY MSGS
        }
      }
      return { succeeded: true };
    }

    const leads = await this.prismaService.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
        companyId: companyId,
      },
      select: {
        id: true,
        phone: true,
        name: true,
      },
    });

    const imageBuffer = file ? Buffer.from(file.buffer, "base64") : null;
    const media = imageBuffer
      ? new MessageMedia(file.mimetype, imageBuffer.toString("base64"))
      : null;

    for (const lead of leads) {
      if (!lead.phone) {
        console.log("No phone provided for client: " + lead.name);
        continue;
      }
      const name = lead.name.split(" ")[0].toLowerCase();
      const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
      const format1 = message.replace("$[NOME]", formatedName);

      if (lead.phone!.length < 8) {
        console.log("Invalid phone number: " + lead.phone);
        continue;
      }

      if (lead.phone) {
        if (media)
          await client.sendMessage(
            `55${lead.phone.toString().trim()}@c.us`,
            message,
            {
              media,
            },
          );
        else
          await client.sendMessage(
            `55${lead.phone?.toString().trim()}@c.us`,
            format1,
          );
        console.log("Sending message to: " + lead.phone);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); ///// WAITS FOR 1 SECOND TO PREVENT WHATSAPP BUG FOR SENDING TOO MANY MSGS
    }

    await this.prismaService.throw.create({
      data: {
        companyId: companyId,
        targets: {
          connect: leads.map((lead) => {
            return {
              id: lead.id,
            };
          }),
        },
        userId,
        body: message,
      },
    });

    return { succeeded: true };
  }

  async connect(
    data: ConnectWhatsappInput,
  ): Promise<{ isConnected: boolean; qrCode: string; message?: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: data.userId,
      },
      include: {
        company: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!user)
      return {
        isConnected: false,
        qrCode: "",
      };

    if ((user.company.customFields as any).whatsappFreeSlots === 0)
      return {
        isConnected: false,
        qrCode: "",
        message: `Todas as vagas de conexão ao whatsapp estão ocupadas nessa unidade.`,
      };

    const client = this.clientsMap.get(`wweb-client-${user.id}`);

    if (!client) {
      const client = new Client({
        authStrategy: new NoAuth(),
        puppeteer: {
          executablePath:
            "C:/Program Files/Google/Chrome/Application/chrome.exe",
        },
        webVersionCache: {
          type: "remote",
          remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
        },
      });
      this.clientsMap.set(`wweb-client-${user.id}`, client);
      console.log(
        `client created and registered for user: #${user.id} ${user.name}`,
      );
      client.initialize();
      console.log(`client initialized for user:  #${user.id} ${user.name}`);

      const io = this.gatewayService.server;

      io.to(`ws-room-${user.companyId}`).emit("client-initialized", {
        id: user.id,
        info: client.info,
      });

      client.on("loading_screen", (percent, message) => {
        console.log("client-" + user.id + " LOADING SCREEN", percent, message);
        io.to(`ws-room-${user.companyId}`).emit("client-loading_screen", {
          id: user.id,
          percent,
          message,
        });
      });
      client.on("authenticated", () => {
        console.log("client-" + user.id + " AUTHENTICATED");
        io.to(`ws-room-${user.companyId}`).emit("client-authenticated", {
          id: user.id,
        });
      });
      client.on("auth_failure", (msg) => {
        console.error("client-" + user.id + " AUTHENTICATION FAILURE", msg);
      });
      client.on("ready", async () => {
        console.log("client-" + user.id + " READY");
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: {
            zapStatus: "connected",
          },
        });
        await this.prismaService.company.update({
          where: {
            id: user.company.id,
          },
          data: {
            customFields: {
              whatsappFreeSlots: {
                decrement: 1,
              },
            },
          },
        });
        io.to(`ws-solo-room-${user.id}`).emit("client-ready", {
          name: client?.info.pushname,
          phone: client?.info.me.user,
        });
      });

      client.on("disconnected", async () => {
        this.clientsMap.set(`wweb-client-${user.id}`, null);
        console.log("client-" + user.id + " disconnected.");

        io.to(`ws-solo-room-${user.id}`).emit("client-disconnected");

        await this.prismaService.company.update({
          where: {
            id: user.company.id,
          },
          data: {
            customFields: {
              whatsappFreeSlots: {
                increment: 1,
              },
            },
          },
        });
      });

      console.log(`getting qrcode for user:  #${user.id} ${user.name}`);
      io.to(`ws-solo-room-${user.id}`).emit("client-waiting-qr");

      const qrCode: string = await new Promise((resolve) => {
        client.on("qr", async (qr) => {
          console.log("client-" + user.id + " qr on nmeth");
          io.to(`ws-solo-room-${user.id}`).emit("client-qr-acquired", {
            id: user.id,
            qr,
          });
          await this.prismaService.user.update({
            where: {
              id: data.userId,
            },
            data: {
              zapQrcode: qr,
            },
          });
          resolve(qr);
        });
      });

      return {
        isConnected: false,
        qrCode,
      };
    }

    return {
      isConnected: true,
      qrCode: user.zapQrcode,
    };
  }
}
