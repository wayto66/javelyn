import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCompanyInput, UpdateCompanyInput } from "src/graphql";

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCompanyInput: CreateCompanyInput) {
    return await this.prismaService.company.create({
      data: createCompanyInput,
    });
  }

  async findAll() {
    return await this.prismaService.company.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.company.findUnique({
      where: {
        id,
      },
      include: {
        attributes: true,
      },
    });
  }

  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    const { customFields, email, name, phone, plan } = updateCompanyInput;
    return await this.prismaService.company.update({
      where: {
        id,
      },
      data: {
        id,
        customFields,
        email,
        name,
        phone,
        plan,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.company.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
