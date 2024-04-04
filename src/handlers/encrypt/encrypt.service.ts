import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";

@Injectable()
export class EncryptService {
  sha256(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }
}
