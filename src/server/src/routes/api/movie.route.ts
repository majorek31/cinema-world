import { Router } from 'express';
import { db } from '../../utils/database.server'
import { protectedEndpoint } from '../../middleware/protected.middleware';
import type { Movie, MovieResponse } from '@/types';
const router: Router = Router();

router.get('/', async (req, res) => {
    const movies = await db.movie.findMany();
    const genre = req.query.genre;
    let filteredMovies = movies;
    if (genre)
        filteredMovies = movies.filter((v) => v.genre === genre);
    return res.json({
        count: filteredMovies.length,
        movies: filteredMovies
    } as MovieResponse);
});

router.get('/:id', async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);
        const movie = await db.movie.findUnique({
            where: {
                id: movieId
            }
        });
        return res.json(movie);
    } catch (error) {
        return res.sendStatus(404);
    }
});
router.post('/', protectedEndpoint({requiresAdmin: true}), async (req, res) => {
    try {
        const movie = req.body.movie;
        const item = await db.movie.create({
            data: {
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                rating: movie.rating,
                releaseDate: parseInt(movie.releaseDate),
                mugshotUrl: movie.mugshotUrl
            }
        });
        return res.json(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
router.put("/", protectedEndpoint({requiresAdmin: true}), async (req, res) => {
    try {
        const movie = req.body.movie;
        await db.movie.update({
            where: {
                id: movie.id
            },
            data: {
                title: movie.title,
                description: movie.description,
                rating: movie.rating,
                mugshotUrl: movie.mugshotUrl,
                releaseDate: parseInt(movie.releaseDate),
                genre: movie.genre
            }
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(400);
    }
});

export const MovieRoute = router;
