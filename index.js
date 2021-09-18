const express = require('express');
const app = express();

let topMovies = [
      {
        title: 'Moonlight',
        director: 'Barry Jenkins'
      },
      {
        title: 'Hidden Figures',
        director: 'Theodore Melfi'
      },
      {
        title: 'Do the right thing',
        director: 'Spike Lee'
      },
      {
        title: 'Poetic Justice',
        director: 'John Singleton'
      },
      {
        title: 'Waiting to Exhale',
        director: 'Forest Whitaker'
      },
      {
        title: 'Daughters of the Dust',
        director: 'Julie Dash'
      },
      {
        title: 'Pariah',
        director: 'Dee Rees'
      },
      {
        title: 'Black Panther',
        director: 'Ryan Coogler'
      },
      {
        title: 'Beasts of the southern wild',
        director: 'Benh Zeitlin'
      },
      {
        title: 'Sorry to bother you',
        director: 'Boots Riley'
      }

  ];
  
  // GET requests
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

  app.get('/', (req, res) => {
    res.send('Welcome to Kino Noir!');
  });
  
  
