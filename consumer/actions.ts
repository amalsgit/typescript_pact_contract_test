import axios from 'axios';
const host: string = 'http://localhost:3001';

export const getMovies = async () => axios.get(`${host}/movies`);
