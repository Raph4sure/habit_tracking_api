import type { Response, Request, NextFunction } from "express"
import { ZodError, type ZodType } from "zod"

// Validate request body
export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = schema.parse(req.body)
      req.body = validateData

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}
// Validate request parameter
export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params)

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid Parameters",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}
// Validate request body
export const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query)

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid query Parameter",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}
