import expressSession from "express-session";
import connectedSession from "connect-session-knex";
import { getConnection } from "../db";

const { SESSION_SECRET, DEV_MODE } = process.env;
const prodMode = DEV_MODE !== "true";
const maxAge = 60 * 60 * 1000; // 1 hour
const knex = getConnection();
const Store = connectedSession(expressSession);
const store = new Store({ knex: knex as any, tablename: "sessions" });

const session = expressSession({
  store,
  secret: SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  proxy: prodMode,
  cookie: { secure: prodMode, maxAge },
});

export { session };
