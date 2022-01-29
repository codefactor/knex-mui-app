import "../config";
import { knex } from "knex";

export function getConnection() {
  const { DATABASE_URL: uri = "", DEV_MODE } = process.env;
  const [user, password, host, port, database] = (
    /postgres:\/\/([^:]*):([^@]*)@([^:]*):(\d+)\/(.*)/.exec(uri) || []
  ).slice(1);
  return knex({
    client: "pg",
    connection: {
      ssl:
        DEV_MODE === "true"
          ? undefined
          : {
              rejectUnauthorized: false,
            },
      host,
      user,
      port: parseInt(port),
      database,
      password,
    },
  });
}
