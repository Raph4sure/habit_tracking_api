import { env, isDevEnv, isTestEnv } from "../env.ts"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import authRoutes from "./routes/authRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import hahabitRoutes from "./routes/habitRoutes.ts"
import morgan from "morgan"

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan("dev", {
    skip: () => isTestEnv(),
  })
)

// Health check endooint (direct on app)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timeStamp: new Date().toISOString(),
    service: "Habit Tracker API",
  })
})

// Mounting Routes

app.use("/api/auth", authRoutes)
app.use("/api/habits", hahabitRoutes)
app.use("/api/users", userRoutes)

export { app }
export default app
