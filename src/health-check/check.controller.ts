import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class CheckController {
  @Get("/")
  getHello(): string {
    return "Hello World!";
  }
}
