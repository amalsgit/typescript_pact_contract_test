import axios from 'axios';
const HOST = 'http://localhost:3001';

export const getMovies = async () => axios.get(`${HOST}/movies`);

export const getSeries = async () => axios.get(`${HOST}/series`);
