import { Injectable } from "@nestjs/common";
import {
  CreateTicketProductInput,
  UpdateTicketProductInput,
} from "src/graphql";

@Injectable()
export class TicketProductService {
  async create(createTicketProductInput: CreateTicketProductInput) {
    return "This action adds a new ticketProduct";
  }

  async findAll() {
    return `This action returns all ticketProduct`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} ticketProduct`;
  }

  async update(id: number, updateTicketProductInput: UpdateTicketProductInput) {
    return `This action updates a #${id} ticketProduct`;
  }

  async remove(id: number) {
    return `This action removes a #${id} ticketProduct`;
  }
}
