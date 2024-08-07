import axios from "axios";

export interface INotifyParams {
  body: any;
  endpoint: string;
}

export class Tera {
  static async notify({ body, endpoint }: INotifyParams) {
    const teraUrl = process.env.TERA_URL;
    const response = await axios.post(`${teraUrl}/notify/${endpoint}`, body);
    const data = await response.data;
    return data;
  }
}
