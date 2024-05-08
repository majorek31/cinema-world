import { Router } from 'express'
import { db } from '../../utils/database.server'
import { protectedEndpoint } from '../../middleware/protected.middleware'

const router: Router = Router()

router.get('/', protectedEndpoint(), (req, res) => {
  return res.json(req.auth.user)
})

export const UserRoute = router
