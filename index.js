//requirements and imports
const express = require('express');
const morgan = require('morgan');

const app = express();


//mockdata
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
  
  //serving of html files and data
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });


  app.get('/', (req, res) => {
    res.send('Welcome to Kino Noir!');
  });
  
  app.use(express.static('public'));




  //middleware
  app.use(morgan('common'));

  //error-handling middleware

  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Yikes, something isn\'t quite right!');
    });


  //server/requests listener
  app.listen(8080, () => {
    console.log('Kino Noir is listening on port 8080.');
  });