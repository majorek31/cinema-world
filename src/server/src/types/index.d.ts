import { Express } from 'express'
interface User {
  id: number
  username: string
  email: string
  registration_date: Date
  role: string
}
interface Movie {
  id: number
  title: string
  rating: number
  mugshotUrl: string
}
interface TokenData {
  user_id: number
}
interface LoginResponse {
  token: string
}
interface MovieResponse {
  count: number
  movies: Movie[]
}
interface LoginRequest extends Express.Request {
  body: {
    email: string
    password: string
  }
}
interface ProtectedEndpointOptions {
  requiresAdmin?: boolean
}
declare module 'express-serve-static-core' {
  interface Request {
    auth: {
      user: User
    }
  }
}
