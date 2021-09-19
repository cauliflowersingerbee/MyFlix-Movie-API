/*requiring express*/
const express = require('express');
const app = express();

/*creating data about top 10 movies*/
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
  
  //creating Express GET request to access movie data
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });

  /*creating GET request at '/' endpoint to return
  default textual response*/ 
  app.get('/', (req, res) => {
    res.send('Welcome to Kino Noir!');
  });
  
  /*using express.static to serve documentation.html
  file from public folder*/
  app.use(express.static('public'));

  /*using Morgan to log all requests*/
const morgan = require('morgan');

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to Kino Noir!');
});

/*app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
*/

/*error-handling middleware function*/

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Yikes, something isn\'t quite right!');
  });