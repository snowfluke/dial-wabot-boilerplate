import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { RenderMenu } from "../partials/menu";

module.exports = {
  name: "abc",
  description: "Pulsa check",
  root: false,
  next: ["voucher"],
  async execute(m: Message, args?: string[]) {
    try {
      let text = "Your current balance is IDR 2000,-\n\n";
      text += await RenderMenu(this.next);

      m.reply(text);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
