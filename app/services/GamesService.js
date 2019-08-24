import axios from 'axios';

export const getGames = () =>
  axios.get('/api/games').then(response => {
    return response.data;
  });
