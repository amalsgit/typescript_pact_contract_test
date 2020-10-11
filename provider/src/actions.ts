import { movies } from './data/movies';

export const getMovies = () => {
  return movies;
};

export const getMovieById = (id: string) => {
  return movies.filter(m => m.id == parseInt(id));
};

export const getMovieByName = (name: string) => {
  return movies.filter(m => m.name == name);
};
