import express from 'express';
import { Request, Response } from 'express';
import * as actions from './actions';
import { StatusCodes } from 'http-status-codes';

// App config
const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3001);

//Add a movie
app.post('/movie', async (req: Request, res: Response) => {
  await actions.addMovie(req.body);
  res.status(StatusCodes.CREATED).send(`Movie is created`);
});

// Get all movies
app.get('/movies', async (req: Request, res: Response) => {
  const allMovies = await actions.getMovies();
  res.send(allMovies);
});

// Get movie by id
app.get('/movie/:id', async (req: Request, res: Response) => {
  const movie = await actions.getMovieById(req.params.id);
  console.log(`movie is ${movie}`);
  if (!movie) {
    return res.status(StatusCodes.NOT_FOUND).send({ Error: `Movie with id ${req.params.id} not found` });
  }
  res.json(movie);
});

// Get all tv series
app.get('/series', async (req: Request, res: Response) => {
  const allSeries = await actions.getSeries();
  res.send(allSeries);
});

export default app;
