import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { RenderMenu } from "../partials/menu";

module.exports = {
  name: "voucher",
  description: "I want some voucher coupon",
  root: false,
  next: [],
  async execute(m: Message, args?: string[]) {
    try {
      let text = "Happy voucher!\n\n";
      text += await RenderMenu(this.next);

      m.reply(text);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
