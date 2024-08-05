import { SClient, onReady } from "wwjs-stable-client";
import { Commander } from "./commander/commander";

onReady(() => {
  console.log("CLIENT IS RUNNING");
});

SClient.on("message", (msg) => {
  Commander(msg);
});

SClient.initialize();

process.once("unhandledRejection", function (reason, p) {
  console.log(reason, p);
});

process.once("uncaughtException", function (err) {
  console.log(err);
});
