import { Message } from "whatsapp-web.js";
import { iCommand } from "../types/types";
import { session } from "../utils/global";

module.exports = {
  name: "98",
  description: "Back menu",
  root: true,
  next: [],
  async execute(m: Message, args?: string[]) {
    try {
      const currentState = session.get(m.from);
      if (!currentState || !currentState.previous.length) return;
      const history = currentState.previous[0];

      const command: iCommand = (await import(`./${history}`)).default;
      currentState.previous.shift();

      session.set(m.from, {
        ...currentState,
        current: command.name,
        next: command.next,
      });

      command.execute(m, args);
    } catch (error) {
      console.log(error);
    }
  },
} as iCommand;
