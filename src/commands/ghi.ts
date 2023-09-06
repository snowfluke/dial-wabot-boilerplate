import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { RenderMenu } from "../partials/menu";

module.exports = {
  name: "ghi",
  description: "ghi nope",
  root: false,
  next: [],
  async execute(m: Message, args?: string[]) {
    try {
      let text = "It's GHI here sir with no submenu\n\n";
      text += await RenderMenu(this.next);

      m.reply(text);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
