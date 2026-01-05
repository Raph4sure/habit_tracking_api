import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema.ts"
import { isProdEnv, env } from "../../env.ts"
import { remember } from "@epic-web/remember"

const createPool = () => {
  return new Pool({
    connectionString: env.DATABASE_URL,
  })
}

let client

if (isProdEnv()) {
  client = createPool()
} else {
  client = remember("dbPool", () => createPool())
}

export const db = drizzle({ client, schema })
export default db
