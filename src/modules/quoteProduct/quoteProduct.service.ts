import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateQuoteProductInput, UpdateQuoteProductInput } from "src/graphql";

@Injectable()
export class QuoteProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createQuoteProductInput: CreateQuoteProductInput) {
    return createQuoteProductInput;
  }

  async findAll() {
    return `This action returns all quoteProduct`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} quoteProduct`;
  }

  async update(id: number, updateQuoteProductInput: UpdateQuoteProductInput) {
    return updateQuoteProductInput;
  }

  async remove(id: number) {
    return `This action removes a #${id} quoteProduct`;
  }
}
