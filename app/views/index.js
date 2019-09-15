import React from 'react';
import { render } from 'react-dom';

// Components
import App from '../components/App';

// Context
import { GamesProvider } from '../services/GamesService/context';

render(
  <GamesProvider>
    <App />
  </GamesProvider>,
  document.getElementById('main')
);
