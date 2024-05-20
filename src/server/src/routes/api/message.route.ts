import { protectedEndpoint } from '../../middleware/protected.middleware';
import { Router } from 'express'
import { db } from '../../utils/database.server';
const router: Router = Router()

router.get('/', protectedEndpoint({requiresAdmin: true}), async (req, res) => {
    try {
        const data = await db.message.findMany();
        return res.json({
           data 
        });
    } catch (error) {
        return res.status(403).json({
            error: true
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const email = req.body.email as string;
        const content = req.body.content as string;
        if (email.length == 0 || content.length == 0) 
            return res.sendStatus(400);
        await db.message.create({
            data: {
                email: email as string,
                message: content as string,
            }
        });
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(400);
    }
});
router.put('/:id', protectedEndpoint({requiresAdmin: true}), async (req, res) => {
    try {
        const id = req.params.id;
        await db.message.update({
            where: {
                id: parseInt(id)
            },
            data: {
                hasBeenRead: true
            }
        });      
    } catch (error) {
        return res.sendStatus(400);
    }
});
export const MessageRoute = router
