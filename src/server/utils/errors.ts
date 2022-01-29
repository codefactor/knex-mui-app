import { createHash } from "crypto";

export function getFingerprint(error: Error): String {
  return createHash("md5")
    .update(`${error.message}|${error.stack}`)
    .digest("hex");
}
