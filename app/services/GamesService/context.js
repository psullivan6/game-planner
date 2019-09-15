import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { initialData, getGames } from './index';

const GamesContext = createContext();

export const useGames = () => {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error('useGames must be used within a GamesContext');
  }

  return context;
};

export const GamesProvider = props => {
  const [games, setGames] = useState(initialData);
  const [filteredGames, setFilteredGames] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    getGames().then(gamesData => {
      if (!mounted) {
        return;
      }

      setGames(gamesData);
      setHasLoaded(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const onFilterChange = (filterFunc) => {
    setFilteredGames(games.filter(filterFunc));
  };

  const value = {
    games,
    hasLoaded,
    filteredGames,
    onFilterChange,
  };

  return <GamesContext.Provider value={value} {...props} />;
};