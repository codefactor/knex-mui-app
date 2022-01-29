import { Request, Response, RequestHandler } from "express";

export function FilterRouter(
  filter: (req: Request, res: Response) => boolean,
  requestHandler: RequestHandler
): RequestHandler {
  return (req, res, next) => {
    if (filter(req, res)) {
      requestHandler(req, res, next);
    } else {
      next();
    }
  };
}
