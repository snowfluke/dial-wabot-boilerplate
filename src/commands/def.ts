import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { RenderMenu } from "../partials/menu";

module.exports = {
  name: "def",
  description: "Def check",
  root: false,
  next: ["ghi"],
  async execute(m: Message, args?: string[]) {
    try {
      let text = "It's DEF here sir happy coding\n\n";
      text += await RenderMenu(this.next);

      m.reply(text);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
