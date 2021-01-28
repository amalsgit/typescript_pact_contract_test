import { getConnection } from 'typeorm';
import { Movie } from './entity/movies.entity';
import { TvSeries } from './entity/tvSeries.entity';

export type movie = { name: string; year: number };

export const getMovies = async () => {
  return await getConnection().getRepository(Movie).find();
};

export const getMovieById = async (id: string) => {
  return await getConnection().getRepository(Movie).findOne(id);
};

export const getSeries = async () => {
  return await getConnection().getRepository(TvSeries).find();
};

export const addMovie = async (movie: movie) => {
  await getConnection().getRepository(Movie).save(movie);
};
