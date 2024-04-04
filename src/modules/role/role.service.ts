import { Injectable } from "@nestjs/common";
import { CreateRoleInput, UpdateRoleInput } from "src/graphql";

@Injectable()
export class RoleService {
  create(createRoleInput: CreateRoleInput) {
    return "This action adds a new role";
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
