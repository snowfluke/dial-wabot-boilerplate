import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { session } from "../utils/global";

module.exports = {
  name: "99",
  description: "Exit menu",
  root: true,
  next: [],
  async execute(m: Message, args?: string[]) {
    try {
      const currentState = session.get(m.from);
      if (!currentState || !currentState.previous) return;

      const command: iCommand = (await import(`./${"entry"}`)).default;

      session.set(m.from, {
        id: m.from,
        previous: [],
        current: command.name,
        next: command.next,
      });

      command.execute(m, args);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
