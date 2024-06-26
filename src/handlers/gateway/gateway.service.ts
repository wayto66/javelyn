import { Inject, OnModuleInit, forwardRef } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { WhatsappService } from "src/modules/whatsapp/whatsapp.service";

@WebSocketGateway({
  cors: {
    allowedHeaders: ["Authorization", "User-id", "Company-id"],
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  },
})
export class GatewayService implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => WhatsappService))
    private whatsappService: WhatsappService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on("connection", async (socket) => {
      socket.emit("connection", null);
      const companyId = socket.handshake.headers["company-id"];
      const userId = socket.handshake.headers["user-id"];
      if (!companyId || !userId) {
        console.error("Error connecting ws:", socket.id);
        socket.disconnect();
        return;
      }

      socket.join(`ws-room-${companyId}`);
      socket.join(`ws-solo-room-${userId}`);

      const client = this.whatsappService.clientsMap.get(
        `wweb-client-${userId}`,
      );

      let state: string;
      if (!client || typeof client === "string") {
        state = "disconnected";
      } else {
        state = await client.getState();
      }

      if (!client || state === "disconnected") {
        this.server.to(`ws-solo-room-${userId}`).emit("client-disconnected");
      }
      if (state === "CONNECTED" && typeof client !== "string") {
        this.server.to(`ws-solo-room-${userId}`).emit("client-ready", {
          name: client?.info.pushname,
          phone: client?.info.me.user,
        });
      }

      if (!state) {
        this.server.to(`ws-solo-room-${userId}`).emit("client-loading_screen");
      }

      console.log("ws-connected", userId);

      socket.on("disconnectme", async () => {
        socket.disconnect();
        console.log("ws-disconnect", userId);
      });
    });
  }
}
