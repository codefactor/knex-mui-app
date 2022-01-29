import { RequestHandler, Router } from "express";

export function ComboRouter(routes: RequestHandler[]) {
  const router = Router();
  routes.forEach((route) => router.use(route));
  return router;
}
