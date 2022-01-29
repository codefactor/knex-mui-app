import { USERS } from "../constants";
import { NewUser, User, UserDetail } from "../../../core/sharedTypes";
import { log } from "../../log";
import { initUsers } from "../schema";
import { Knex } from "knex";
import { checkPassword } from "../../utils/passwords";

const users = (knex: Knex) => knex<UserDetail>(USERS);

export async function hasTable(knex: Knex): Promise<boolean> {
  const result = knex.schema.hasTable(USERS);
  if (!result) {
    log.warn(`Table ${USERS} doesn't exist`);
  }
  return result;
}

export async function hasUsers(knex: Knex): Promise<boolean> {
  if (await hasTable(knex)) {
    const record = ((await users(knex).count("*").groupBy("id")) as any)[0];
    const result = record.count > 0;
    if (!result) {
      log.warn("There are no users in the database");
    }
    return result;
  }
  return false;
}

export async function login(
  knex: Knex,
  username: string,
  password: string
): Promise<User | undefined> {
  if ((await hasTable(knex)) && username && password) {
    const user = (await users(knex).where({ username }).select("*"))[0];
    if (user && checkPassword(password, user.password)) {
      return removeDetail(user);
    }
  }
}

function removeDetail(user: UserDetail): User {
  if (user) {
    const result = { ...user };
    delete (result as any).password;
    return result;
  }
  return user;
}

export async function findById(
  knex: Knex,
  id: number | undefined
): Promise<User | undefined> {
  if (id == null || !(await hasTable(knex))) {
    return undefined;
  }
  const user = (await users(knex).where({ id }).select("*"))[0];
  return removeDetail(user);
}

export async function doesUsernameExist(
  knex: Knex,
  username: string
): Promise<boolean> {
  log.debug(`checking if id exists: ${username}`);
  if (await hasTable(knex)) {
    const result = await users(knex)
      .where({ username })
      .count("*", { as: "ct" })
      .groupBy("id");
    return result.length > 0 && result[0].ct > 0;
  }
  return false;
}

export async function insertUser(knex: Knex, user: NewUser): Promise<void> {
  if (!(await hasTable(knex))) {
    await initUsers(knex);
  }
  log.info("inserting user: ", user);
  await users(knex).insert(user);
}
