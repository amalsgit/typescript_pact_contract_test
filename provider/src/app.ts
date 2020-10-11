import express from 'express';
import { Request, Response } from 'express';
import * as movies from './actions';

// App config
const app = express();
app.set('port', process.env.PORT || 3001);

// Get all movies
app.get('/movies', (req: Request, res: Response) => {
  const allMovies = movies.getMovies();
  res.send(allMovies);
});

// Get movie by id
app.get('/movie/:id', (req: Request, res: Response) => {
  const movie = movies.getMovieById(req.params.id);
  res.send(movie);
});

export default app;
