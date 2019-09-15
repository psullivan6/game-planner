import React, { useEffect, useState } from 'react';

// Services
import { useGames } from '../../services/GamesService/context';

// Components
import Calendar from '../Calendar';
import Map from '../Map';

const App = () => {
  const { filteredGames: games, hasLoaded } = useGames();

  if (!hasLoaded) {
    return <h1>LOADING...</h1>;
  }

  return (
    <section>
      <h1>GAMES</h1>

      <Calendar />

      <Map locations={games.map(game => game.fields.location)} />

      {games.map(game => (
        <article key={game.sys.id}>
          <h1>Matchup: {game.fields.matchupName}</h1>
          <h2>Date: {game.fields.date}</h2>
          <p>Home Team: {game.fields.homeTeam.fields.name}</p>
          <p>Away Team: {game.fields.awayTeam.fields.name}</p>
          <hr />
        </article>
      ))}
    </section>
  );
};

export default App;
