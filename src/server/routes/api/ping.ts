import { Router } from "express";
import { PingPayload } from "../../../core/sharedTypes";

const router = Router();
let pingCount = 0;

router.get("/api/ping", (req, res) => {
  res.status(200).json({ ping: 1 } as PingPayload);
  pingCount++;
});

export function getPingCount() {
  return pingCount;
}

export default router;
