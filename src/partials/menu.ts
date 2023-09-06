import { iCommand } from "../types/types";

export const RenderMenu = async (next: string[], quit: boolean = true) => {
  let str: string = "";
  let no = 1;
  for (let file of next) {
    const command: iCommand = (await import(`../commands/${file}`)).default;
    str += `*${no}*. ${command.name}\n`;
    no++;
  }
  if (quit) {
    str += `*98*. Back\n*99*. Exit\n`;
  }

  return str;
};
