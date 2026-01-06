import { Router } from "express"
import {
  createHabit,
  getUserHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.ts"
import { authenticateToken } from "../middleware/auth.ts"
import { validateBody, validateParams } from "../middleware/validation.ts"
import { z } from "zod"

const router = Router()

// Protecting all routes
router.use(authenticateToken)

// Validation schemas
const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(100, "Name too long"),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "monthly"], {
    message: "Frequency must be daily, weekly, or monthly",
  }),
  targetCount: z.number().int().positive().optional().default(1),
  tagIds: z.array(z.string().uuid()).optional(),
})

const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "monthly"]).optional(),
  targetCount: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

const uuidSchema = z.object({
  id: z.string().uuid("Invalid habit ID format"),
})

// Habit-specific routes

// CRUD Routes
router.get('/', getUserHabits)
router.get('/:id', validateParams(uuidSchema), getHabitById)
router.post('/', validateBody(createHabitSchema), createHabit)
router.put(
  '/:id',
  validateParams(uuidSchema),
  validateBody(updateHabitSchema),
  updateHabit
)
router.delete('/:id', validateParams(uuidSchema), deleteHabit)


router.get("/", (req, res) => {
  res.json({ message: "Get all habits" })
})

router.post("/", (req, res) => {
  res.status(201).json({ message: "Habit created" })
})

// Habit completion routes
router.post("/:id/complete", (req, res) => {
  res.json({ message: `Mark habit ${req.params.id} complete` })
})

router.get("/:id/stats", (req, res) => {
  res.json({ message: `Get stats for habit ${req.params.id}` })
})

export default router
