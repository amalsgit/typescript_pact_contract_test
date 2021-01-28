import express from 'express';
import { Request, Response } from 'express';
import * as actions from './actions';

// App config
const app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3001);

//Add a movie
app.post('/movie', async (req: Request, res: Response) => {
  await actions.addMovie(req.body);
  res.status(204).send('Movie created');
});

// Get all movies
app.get('/movies', async (req: Request, res: Response) => {
  const allMovies = await actions.getMovies();
  res.send(allMovies);
});

// Get movie by id
app.get('/movie/:id', async (req: Request, res: Response) => {
  const movie = await actions.getMovieById(req.params.id);
  res.json(movie);
  //TODO Add error response when id is invalid
});

// Get all tv series
app.get('/series', async (req: Request, res: Response) => {
  const allSeries = await actions.getSeries();
  res.send(allSeries);
});

export default app;
