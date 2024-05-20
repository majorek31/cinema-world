import { Router } from 'express'

import { AuthRoute } from './auth.route'
import { UserRoute } from './user.route'
import { MovieRoute } from './movie.route'
import { MessageRoute } from './message.route'
const router: Router = Router()

router.use('/auth', AuthRoute)
router.use('/user', UserRoute)
router.use('/movie', MovieRoute)
router.use('/message', MessageRoute)
export const ApiRoute = router
