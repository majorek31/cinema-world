import { Request, Response, NextFunction } from 'express'
import type { ProtectedEndpointOptions, TokenData } from '@/types'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { db } from '../utils/database.server'
export const protectedEndpoint = (options?: ProtectedEndpointOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization as string
    if (!authHeader) return res.sendStatus(403)
    const token = authHeader.split(' ')[1]
    if (!token) return res.sendStatus(403)
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET) as TokenData
      const user = await db.user.findUnique({
        where: {
          id: tokenData.user_id
        }
      })
      if (!user) return res.sendStatus(500)
      req.auth = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
          registration_date: user.createdAt
        }
      }
      next()
    } catch (err) {
      if (err instanceof JsonWebTokenError)
        return res.status(400).json({ error: 'Invalid token provided' });
      return res.sendStatus(500);
    }
  }
}
