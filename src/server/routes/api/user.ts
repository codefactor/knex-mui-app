import { APIRouter } from "../../routers/APIRouter";
import { getPasswordHash } from "../../utils/passwords";
import {
  doesUsernameExist,
  findById,
  hasUsers,
  insertUser,
} from "../../db/entity/users";

const router = APIRouter();

router.add("post", "/api/user", {
  hasPermission: async (req, knex) => {
    // Either there are no users at all, or the user is logged in
    return (
      !(await hasUsers(knex)) || !!(await findById(knex, req.session.userId))
    );
  },
  execute: async (req, res, knex): Promise<void> => {
    const { username, email, password } = req.body;
    if (await doesUsernameExist(knex, username)) {
      res.status(400).json({
        message: "username not unique",
      });
    } else {
      await insertUser(knex, {
        username,
        email,
        password: getPasswordHash(password),
      });
      res.status(201).end();
    }
  },
});

export default router;
