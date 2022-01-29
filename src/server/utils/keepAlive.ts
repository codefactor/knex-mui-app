import fetch from "node-fetch";
import { PingPayload } from "../../core/sharedTypes";
import { log } from "../log";

const { SERVER_URL, PING_INTERVAL } = process.env;

export function keepAlive() {
  if (SERVER_URL && PING_INTERVAL) {
    setInterval(async function keepAliveInterval() {
      try {
        const response = await fetch(`${SERVER_URL}/api/ping`);
        if (
          response.ok &&
          ((await response.json()) as PingPayload).ping === 1
        ) {
          log.info("Ping was successful");
        } else {
          log.info("Ping was not successful");
        }
      } catch (e) {
        log.error("Error pinging server", e);
      }
    }, parseInt(PING_INTERVAL));
  }
}
