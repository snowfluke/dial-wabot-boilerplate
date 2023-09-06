import * as fs from "node:fs";
import { iCommand } from "../types/types";
import { Message } from "whatsapp-web.js";
import { suffix, entry } from "../config/config.json";
import { session } from "../utils/global";

let directoryPath: string;

if (process.env.NODE_ENV === "dev") {
  directoryPath = "./src/commands";
} else {
  directoryPath = "./dist/commands";
}

const commandFiles = fs
  .readdirSync(directoryPath)
  .map((fileName) => fileName.split(".")[0]);

const commandMap = new Map();
for (let file of commandFiles) {
  commandMap.set(file, file);
}

const Commander = async (message: Message) => {
  try {
    if (message.type != "chat") return;
    if (message.isStatus) return;
    const args: string[] | undefined = message.body.trim().split(/ +/);

    // Shortcode *123*1*1#
    if (
      message.body.startsWith(entry) &&
      message.body.endsWith(suffix) &&
      message.body.length > entry.length + suffix.length
    ) {
      let shortcode = message.body.trim().substring(entry.length + 1);
      shortcode = shortcode.substring(0, shortcode.length - 1);

      let path = shortcode
        .split("*")
        .filter((el) => !isNaN(parseInt(el)))
        .map((el) => parseInt(el));
      if (!path) return;
      let previous = [];

      let initialCmd: iCommand = (
        await import(`../commands/${commandMap.get("entry")}`)
      ).default;

      for (const cmdIndex of path) {
        if (!initialCmd.next[cmdIndex - 1]) continue;
        const loopedCmd: iCommand = (
          await import(
            `../commands/${commandMap.get(initialCmd.next[cmdIndex - 1])}`
          )
        ).default;
        previous.unshift(loopedCmd.name);
        initialCmd = loopedCmd;
      }

      previous.shift();
      session.set(message.from, {
        id: message.from,
        previous: previous,
        current: initialCmd.name,
        next: initialCmd.next,
      });
      initialCmd.execute(message, args);
      return;
    }

    const chat: any = await message.getChat();
    if (chat.isGroup) return;

    const cmd: string = args.shift()?.toLowerCase() || "";
    const commandName: string = cmd == entry + suffix ? "entry" : cmd;

    chat.sendSeen();
    const currentSession = session.get(message.from);

    if (!currentSession || commandMap.has(commandName)) {
      const command: iCommand = (
        await import(`../commands/${commandMap.get(commandName)}`)
      ).default;
      if (!command.root) return;

      if (!currentSession) {
        session.set(message.from, {
          id: message.from,
          previous: [],
          current: command.name,
          next: command.next,
        });
      }
      command.execute(message, args);
      return;
    }

    const command: iCommand = (
      await import(`../commands/${commandMap.get(currentSession.current)}`)
    ).default;

    const index = parseInt(commandName);
    if (isNaN(index)) return;

    const commandIndex = index - 1;
    const next = command.next[commandIndex];
    if (!next) return;

    const commandNext: iCommand = (
      await import(`../commands/${commandMap.get(next)}`)
    ).default;

    currentSession.previous.unshift(command.name);
    session.set(message.from, {
      ...currentSession,
      current: commandNext.name,
      next: commandNext.next,
    });

    commandNext.execute(message, args);
  } catch (error) {
    console.error(error);
  }
};

export { Commander, commandFiles };
