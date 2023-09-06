import { Message } from "whatsapp-web.js";

interface iSessionParent {
  [key: string]: tSession | undefined;
}

type tSession = {
  id: string;
  previous: string[];
  current: string | false;
  next: string[] | false;
};

interface iCommand {
  name: string;
  description: string;
  root: boolean;
  next: string[];
  execute: (m: Message, args?: string[]) => Promise<void>;
}

export { iSessionParent, iCommand, tSession };
