import { APIRouter } from "../../routers/APIRouter";
import { login } from "../../db/entity/users";
import { LoginPayload } from "../../../core/sharedTypes";

const router = APIRouter();

router.add("post", "/api/login", {
  execute: async (req, res, knex): Promise<LoginPayload> => {
    const { username, password } = req.body;
    const user = await login(knex, username, password);
    if (user) {
      const hour = 3600000;
      req.session.userId = user.id;
      req.session.cookie.expires = new Date(Date.now() + hour);
      req.session.cookie.maxAge = hour;
    }
    return {
      success: !!user,
      user,
    };
  },
});

export default router;
