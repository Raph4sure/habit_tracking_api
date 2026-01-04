import { Router } from "express"
import { z } from "zod"
import { validateBody, validateParams } from "../middleware/validation.ts"

const router = Router()

const createUserSchema = z.object({
  name:z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})


const UserIdSchema = z.object({
  id:z.string().uuid('Invalid user ID format'),
 
})


router.get("/", (req, res) => {
  res.json({ message: "Get all users" })
})

router.get("/:id", validateParams(UserIdSchema),  (req, res) => {
  res.json({ message: `Get user ${req.params.id}` })
})

router.post("/", validateBody(createUserSchema), (req, res) => {
  res.json({ message: "User created" })
})

router.put("/:id", (req, res) => {
  res.json({ message: `Update user ${req.params.id}` })
})

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` })
})

export default router
