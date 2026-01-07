import type { Request, Response, NextFunction } from "express"
import env from "../../env.ts"

export interface CustomError extends Error {
  status?: number
  code?: string
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)

  // Default error
  let status = err.status || 500
  let message = err.message || "Internal Server Error"

  // Handling specific error types
  if (err.name === "ValidationError") {
    status = 400
    message = "Validation Error"
  }

  if (err.name === "UnauthorizedError") {
    status = 401
    message = "Unauthorized"
  }

  res.status(status).json({
    error: message,
    ...(env.APP_STAGE === "dev" && {
      stack: err.stack,
      details: err.message,
    }),
  })
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as CustomError
  error.status = 404
  next(error)
}



// Professional error handling technique
// class AppError extends Error {
//   constructor(
//     public message: string,
//     public status: number = 500,
//     public code?: string
//   ) {
//     super(message)
//     this.name = this.constructor.name
//     Error.captureStackTrace(this, this.constructor)
//   }
// }

// class ValidationError extends AppError {
//   constructor(message: string) {
//     super(message, 400, "VALIDATION_ERROR")
//   }
// }

// class NotFoundError extends AppError {
//   constructor(resource: string) {
//     super(`${resource} not found`, 404, "NOT_FOUND")
//   }
// }

// // Usage
// throw new NotFoundError("Habit")
// throw new ValidationError("Invalid email format")