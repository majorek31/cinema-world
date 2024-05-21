import { Router } from 'express'
import { db } from '../../utils/database.server'
import { protectedEndpoint } from '../../middleware/protected.middleware'

const router: Router = Router()

router.get('/', protectedEndpoint(), async (req, res) => {
    try {
        const user = req.auth.user;
        const tickets = await db.ticket.findMany({
            where: {
                userId: user.id
            }, 
            include: {
                movie: true
            }
        });
        return res.json(tickets);
    } catch (error) {
        return res.sendStatus(400);
    }
});
router.post('/', protectedEndpoint(), async (req, res) => {
    try {
        const user = req.auth.user;
        const ticketDto = {
            movieId: req.body.movieId,
            date: req.body.date
        };
        await db.ticket.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                movie: {
                    connect: {
                        id: ticketDto.movieId
                    }
                },
                when: ticketDto.date
            }
        });
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
});

router.delete('/:id', protectedEndpoint(), async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        await db.ticket.delete({
            where: {
                id: id
            }
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
});
export const TicketRoute = router
