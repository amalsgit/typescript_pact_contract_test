import axios from 'axios';
const HOST: string = 'http://localhost:3001';

export const getMovies = async () => axios.get(`${HOST}/movies`);
