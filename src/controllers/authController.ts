import type { Request, Response } from "express"
import { users } from "../db/schema.ts"
import db from "../db/connection.ts"
import { generateToken } from "../utils/jwt.ts"
import { comparePassword, hashedPassword as hashingPassword } from "../utils/password.ts"
import { eq } from "drizzle-orm"
import z from "zod"
// import { generateToken } from "../utils/jwt.ts";



export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, firstName, lastName } = req.body

    // Hashing password
    const hashedPassword = await hashingPassword(password)

    // Create new user in the database
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      })

    // Generating Token for auto-login
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    })

    res.status(201).json({
      message: "User Created Successfully",
      user: newUser,
      token,
    })
  } catch (error) {
    console.error("Registration error", error)
    res.status(500).json({ error: "Failed to create user" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Step 1: Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Step 2: Verify password
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Step 3: Generate JWT token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    // Step 4: Return user data and token
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Failed to login" })
  }
}
