import { Router } from 'express'

import { AuthRoute } from './auth.route'
import { UserRoute } from './user.route'
import { MovieRoute } from './movie.route'
import { MessageRoute } from './message.route'
import { TicketRoute } from './ticket.route'

const router: Router = Router()

router.use('/auth', AuthRoute)
router.use('/user', UserRoute)
router.use('/movie', MovieRoute)
router.use('/message', MessageRoute)
router.use('/ticket', TicketRoute)

export const ApiRoute = router
