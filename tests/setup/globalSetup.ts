import { sql } from "drizzle-orm"
import db from "../../src/db/connection.ts"
import { entries, habits, habitTags, tags, users } from "../../src/db/schema.ts"
import { execSync } from "child_process"

export default async function setup() {
  console.log("⚙️ Setting up test database...")

  try {
    // Dropping all tables if they exist to ensure clean state

    await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${tags} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`)

    // Using drizzle-kit CLI to push scehma to database
    console.log("🚀 Pushing schema using drizzle-kit ...")
    execSync(
      `npx drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema.ts" --dialect="postgresql"`,{
            stdio: 'inherit',
            cwd:process.cwd(),
            }
    )
    console.log("✅️ Test database setup complete")
  } catch (error) {
    console.error("❌️ Failed to setup test database ...")
    throw error
  }

  return async () => {
    console.log("🧹 Tearing down test database ...")

    try {
      // This is the final cleanup - am dropping all test data
      await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`)
      await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`)
      await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)

      console.log("✅ Test database teardown complete")
      process.exit(0)
    } catch (error) {
      console.error("❌ Failed to teardown test database:", error)
    }
  }
}
