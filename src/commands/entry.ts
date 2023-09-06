import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { RenderMenu } from "../partials/menu";
import { session } from "../utils/global";

module.exports = {
  name: "entry",
  description: "Entry menu",
  root: true,
  next: ["abc", "def"],
  async execute(m: Message, args?: string[]) {
    try {
      session.set(m.from, {
        id: m.from,
        previous: [],
        current: this.name,
        next: this.next,
      });
      let text = `Welcome, select a menu sir\n\n`;
      text += await RenderMenu(this.next, false);

      m.reply(text);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
