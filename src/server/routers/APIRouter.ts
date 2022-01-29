import { RequestHandler, Router } from "express";
import { getConnection } from "../db";
import { Method, Route } from "../serverTypes";
import { v4 as uuid } from "uuid";
import { log } from "../log";
import { getFingerprint } from "../utils/errors";
import { ServerError } from "../../core/sharedTypes";

const knex = getConnection();

export function APIRouter() {
  const router = Router();
  return Object.assign(
    ((req, res, next) => router(req, res, next)) as RequestHandler,
    {
      add: (method: Method, path: string, route: Route) => {
        router[method](path, async function handleRoute(req, res, next) {
          if (route.hasPermission && !route.hasPermission(req, knex)) {
            res.status(400).json({ message: "No permission" });
            return;
          }
          try {
            const result = await route.execute(req, res, knex, next);
            if (result !== undefined) {
              return res.status(200).json(result);
            }
          } catch (error: any) {
            const timestamp = new Date().toString();
            const errorId = uuid();
            const fingerprint = getFingerprint(error);
            log.error(
              `errorId=${errorId}, fingerprint=${fingerprint}, timestamp=${timestamp}, errorMessage=${error.message}`
            );
            res
              .status(500)
              .json({ errorId, fingerprint, timestamp } as ServerError);
          }
        });
      },
    }
  );
}
