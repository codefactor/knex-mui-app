import { NextFunction, Request, Response } from "express";
import { Knex } from "knex";

export type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface Route {
  hasPermission?: (req: Request, knex: Knex) => Promise<boolean>;
  execute: (
    req: Request,
    res: Response,
    knex: Knex,
    next: NextFunction
  ) => Promise<any>;
}

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}
