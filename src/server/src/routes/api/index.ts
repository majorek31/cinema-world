import { Router } from 'express'

import { AuthRoute } from './auth.route'
import { UserRoute } from './user.route'

const router: Router = Router()

router.use('/auth', AuthRoute)
router.use('/user', UserRoute)

export const ApiRoute = router
