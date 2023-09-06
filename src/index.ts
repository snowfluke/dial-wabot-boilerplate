import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { Commander } from "./commander/commander";

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersion: "2.2323.4",
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html",
  },
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("CLIENT IS RUNNING");
});

client.on("message", (msg) => {
  Commander(msg);
});

client.initialize();

process.once("unhandledRejection", function (reason, p) {
  console.log(reason, p);
});

process.once("uncaughtException", function (err) {
  console.log(err);
});
