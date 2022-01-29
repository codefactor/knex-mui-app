import { USERS } from "./constants";
import { log } from "../log";
import { Knex } from "knex";

export async function initUsers(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(USERS))) {
    log.info(`creating table: ${USERS}`);
    await knex.schema.createTable(USERS, (table) => {
      table.increments("id");
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("email").notNullable();
      table.unique(["username"]);
    });
  }
}
