import { iSessionParent, tSession } from "../types/types";

const globalVariable = {
  session: {
    data: {} as iSessionParent,
    set(key: string, value: tSession | undefined) {
      this.data[key] = value;
    },
    get(id: string): tSession | undefined {
      return this.data[id];
    },
    reset(id: string) {
      delete this.data[id];
    },
  },
  ticker: {},
};

export const session = globalVariable.session;
