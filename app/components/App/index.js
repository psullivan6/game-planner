import React, { useEffect, useState } from 'react';

// Services
import { getGames } from '../../services/GamesService';

// Components
import Calendar from '../Calendar';
import Map from '../Map';

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(games => {
      setGames(games);
    });
  }, []);

  if (games.length === 0) {
    return <h1>LOADING...</h1>;
  }

  const handleChange = date => {
    console.log('DATE CHANGE - date', date);
  };

  return (
    <section>
      <h1>GAMES</h1>
      <Calendar onChange={handleChange} />
      <Map locations={games.map(game => game.fields.location)} />
      {games.map(game => (
        <article key={game.sys.id}>
          <h1>Matchup: {game.fields.matchupName}</h1>
          <h2>Date: {game.fields.date}</h2>
          <span>Home Team: {game.fields.homeTeam.fields.name}</span>
          <span>Away Team: {game.fields.awayTeam.fields.name}</span>
          <hr />
        </article>
      ))}
    </section>
  );
};

export default App;
