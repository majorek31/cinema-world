import { Router } from 'express'
import { db } from '../../utils/database.server'
import bcrypt from 'bcrypt'
import { LoginResponse, TokenData } from '@/types'
import jwt from 'jsonwebtoken'
const router: Router = Router()

router.get('/login', async (req, res) => {
  const { email, password } = req.query
  if (!email || !password)
    return res.status(400).json({ message: 'Both email and password must be provided' })
  try {
    const user = await db.user.findUnique({
      where: {
        email: email.toString()
      }
    })
    if (!user) return res.status(404).json({ message: 'user not found' })
    const isValidPassword = await bcrypt.compare(password.toString(), user.passwordHash)
    if (!isValidPassword) return res.status(404).json({ message: 'user not found' })
    const token = jwt.sign(
      {
        user_id: user.id
      } as TokenData,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )
    return res.status(200).json({
      token: token
    } as LoginResponse)
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
})
router.get('/verify/:token', async (req, res) => {
  try {
    if (!req.params.token) return res.status(400).json({ message: 'token not provided' })
    await jwt.verify(req.params.token, process.env.JWT_SECRET)
    return res.status(200).json({ message: 'token valid' })
  } catch (err) {
    res.status(500).send('invalid token')
  }
})
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: 'Both email and password must be provided' })
  try {
    const user = await db.user.findUnique({
      where: {
        email: email
      }
    })
    if (user) return res.status(409).json({ message: 'Email is taken' })
    const passwordHash = await bcrypt.hash(password, 10)
    const username = email.split('@')[0]
    await db.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        username: username
      }
    })
    return res.status(201).redirect('/login')
  } catch (error) {
    console.error(error)
    return res.sendStatus(500)
  }
})
export const AuthRoute = router
