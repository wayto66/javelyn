import axios from "axios";
import crypto from "crypto";

export interface INotifyParams {
  body: any;
  endpoint: string;
}

export class Tera {
  static async notify({ body, endpoint }: INotifyParams) {
    const teraUrl = process.env.TERA_URL;
    const secret = process.env.HMAC_SECRET;
    const signature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    const response = await axios.post(`${teraUrl}/notify/${endpoint}`, body, {
      headers: {
        "x-mac-signature": signature,
      },
    });
    const data = await response.data;
    return data;
  }
}
