import { Router } from "express"
import { validateBody } from "../middleware/validation.ts"
import { insertUserSchema } from "../db/schema.ts"
import { login, register } from "../controllers/authController.ts"
import { z } from "zod"

const router = Router()

// Login validation schema
const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

// Authentication routes
router.post("/register", validateBody(insertUserSchema), register)

router.post("/login", validateBody(loginSchema), login)

router.post("/logout", (req, res) => {
  res.json({ message: "User logged out" })
})

router.post("/refresh", (req, res) => {
  res.json({ message: "Token refreshed" })
})

export default router
