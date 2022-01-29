import { createHmac, randomBytes } from "crypto";

const algorithm = "sha512";

export function getPasswordHash(password: string): string {
  const salt = getSalt(16);
  return `${salt}.${getHash(password, salt)}`;
}

export function checkPassword(
  password: string,
  stored: string | undefined
): boolean {
  if (!stored || !password) return false;
  const [salt, hash] = stored.split(".");
  return hash === getHash(password, salt);
}

export function getHash(password: string, salt: string) {
  const hash = createHmac(algorithm, salt);
  hash.update(password);
  return hash.digest("hex");
}

export function getSalt(length: number) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
