import { APIRouter } from "../../routers/APIRouter";
import { findById, hasUsers } from "../../db/entity/users";
import { InitialPayload } from "../../../core/sharedTypes";
import { getPingCount } from "./ping";

const router = APIRouter();
const startTime = new Date().getTime();

router.add("get", "/api/init", {
  execute: async (req, res, knex): Promise<InitialPayload> => {
    return {
      startTime,
      averagePingTime: Math.round(
        (new Date().getTime() - startTime) / getPingCount()
      ),
      currentUser: await findById(knex, req.session.userId),
      hasUsers: await hasUsers(knex),
    };
  },
});

export default router;
