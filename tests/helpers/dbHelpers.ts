import db from "../../src/db/connection.ts"
import { entries, habits, habitTags, tags, users } from "../../src/db/schema.ts"
import { generateToken } from "../../src/utils/jwt.ts"
import { hashedPassword } from "../../src/utils/password.ts"

type CreateTestUserType = Partial<{
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}>


type CreateTestHabitType = Partial<{
  name: string
  description: string
  frequency: string
  targetCount: number
}>

export async function createTestUser(userData: CreateTestUserType = {}) {
  const defaultData = {
    email: `test-${Date.now()}-${Math.trunc(
      Math.random() * 20000
    )}@example.com`,
    username: `testuser-${Date.now()}-${Math.trunc(Math.random() * 20000)}`,
    password: "TestPassword123",
    firstName: "Test",
    lastName: "User",
  }
  const hashingPassword = await hashedPassword(defaultData.password)

  const [user] = await db
    .insert(users)
    .values({
      ...defaultData,
      password: hashingPassword,
    })
    .returning()

  const token = await generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  })
  return { user, token, rawPassword: defaultData.password }
}


export async function createTestHabit(
  userId: string,
  habitData: CreateTestHabitType = {}
) {
  const defaultData = {
    name: `Test Habit ${Date.now()}`,
    description: "A test habit",
    frequency: "daily",
    targetCount: 1,
    ...habitData,
  }
    
    const [habit] = await db.insert(habits).values({
        userId, ...defaultData
    }).returning()
    return habit
    
}

export async function cleanUpDatabase() {
    // Must clean up in the right order due to foreign key constraints

    await db.delete(entries)
    await db.delete(habits)
    await db.delete(users)
    await db.delete(habitTags)
    await db.delete(tags)
    
}