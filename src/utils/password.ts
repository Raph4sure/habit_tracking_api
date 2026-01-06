import env from "../../env.ts"
import bcrypt from "bcrypt"
import { generateToken } from "./jwt.ts"

export const hashedPassword = async (password: string): Promise<string> => {
  const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12")
  return bcrypt.hash(password, saltRound)
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
