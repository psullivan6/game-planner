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

  console.log('games', games);

  return (
    <section>
      <h1>GAMES</h1>
      <Calendar onChange={handleChange} />
      <Map />
      {games.map(game => (
        <article key={game.sys.id}>
          <h1>Matchup: {game.fields.matchupName}</h1>
          <p>Date: {game.fields.date}</p>
          <h1>Home Team: {game.fields.homeTeam.fields.name}</h1>
          <h1>Away Team: {game.fields.awayTeam.fields.name}</h1>
          <hr />
        </article>
      ))}
    </section>
  );
};

export default App;
