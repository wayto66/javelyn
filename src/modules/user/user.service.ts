import { Injectable } from "@nestjs/common";
import { GraphQLResolveInfo } from "graphql";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserInput, FiltersInput, UpdateUserInput } from "src/graphql";
import { isFieldRequested } from "src/helpers/isFieldRequested";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    const { name, username, password, permissions, companyId } =
      createUserInput;
    return this.prismaService.user.create({
      data: {
        name,
        username,
        password,
        permissions,
        companyId,
      },
    });
  }

  async findAll(
    info: GraphQLResolveInfo,
    page: number,
    pageSize: number,
    filters: FiltersInput,
  ) {
    const { companyId, name } = filters;
    const total = await this.prismaService.user.findMany({
      where: {
        companyId,
        name: name
          ? {
              contains: name,
            }
          : undefined,
      },
      select: {
        id: true,
      },
    });
    const objects = await this.prismaService.user.findMany({
      where: {
        companyId,
        name: name
          ? {
              contains: name,
            }
          : undefined,
      },
      include: {
        leads: isFieldRequested(info, "leads"),
        quotes: isFieldRequested(info, "quotes"),
        tasks: isFieldRequested(info, "tasks"),
        tickets: isFieldRequested(info, "tickets"),
        throws: isFieldRequested(info, "throws"),
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      objects,
      total: total.length,
    };
  }

  async findOne(id: number, info?: GraphQLResolveInfo) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        leads: isFieldRequested(info, "leads"),
        quotes: isFieldRequested(info, "quotes"),
        tasks: isFieldRequested(info, "tasks"),
        tickets: isFieldRequested(info, "tickets"),
        throws: isFieldRequested(info, "throws"),
      },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
