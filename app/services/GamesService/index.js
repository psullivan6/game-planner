import axios from 'axios';

export const initialData = [];

export const getGames = () =>
  axios.get('/api/games').then(response => {
    return response.data;
  });
