import { Injectable } from "@nestjs/common";
import { CreateThrowInput, UpdateThrowInput } from "src/graphql";

@Injectable()
export class ThrowService {
  create(createThrowInput: CreateThrowInput) {
    return "This action adds a new throw";
  }

  findAll() {
    return `This action returns all throw`;
  }

  findOne(id: number) {
    return `This action returns a #${id} throw`;
  }

  update(id: number, updateThrowInput: UpdateThrowInput) {
    return `This action updates a #${id} throw`;
  }

  remove(id: number) {
    return `This action removes a #${id} throw`;
  }
}
