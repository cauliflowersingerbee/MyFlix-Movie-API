//requirements and imports
const express = require('express');
      morgan = require('morgan');
      uuid = require('uuid');
      bodyParser = require('body-parser');
     
const app = express();

//movie data
let topMovies = [
      {
        id: 1,
        title: 'Moonlight',
        director: 'Barry Jenkins',
        year: 2017,
        genre: ['LGBT', 'Drama', 'Indie', 'Coming-of-age']
      },
      {
        id: 2,
        title: 'Hidden Figures',
        director: 'Theodore Melfi',
        year: 2017, 
        genre: ['Drama', 'Historical Fiction']
      },
      {
        id: 3,
        title: 'Do the right thing',
        director: 'Spike Lee',
        year: 1989,
        genre: 'Comedy Drama'
      },
      {
        id: 4,
        title: 'Poetic Justice',
        director: 'John Singleton',
        year: 1993,
        genre: ['Romance', 'Drama']
      },
      {
        id: 5,
        title: 'Waiting to Exhale',
        director: 'Forest Whitaker',
        year: 1995,
        genre: ['Romance', 'Drama']
      },
      {
        id: 6,
        title: 'Daughters of the Dust',
        director: 'Julie Dash',
        year: 1991,
        genre: ['Indie', 'Drama', 'Historical']
      },
      {
        id: 7,
        title: 'Pariah',
        director: 'Dee Rees',
        year: 2011,
        genre: ['LGBT', 'Drama', 'Indie', 'Coming-of-age']
      },
      {
        id: 8,
        title: 'Black Panther',
        director: 'Ryan Coogler',
        year: 2018,  
        genre: ['Action', 'Superhero', 'Science Fiction']
      },
      {
        id: 9,
        title: 'Beasts of the southern wild',
        director: 'Benh Zeitlin',
        year: 2012,
        genre: ['Drama', 'Fantasy', 'Indie']
      },
      {
        id: 10,
        title: 'Sorry to bother you',
        director: 'Boots Riley',
        year: 2018,  
        genre: ['Comedy', 'Fantasy', 'Science Fiction']
      }

  ];
  
  //serving of html files and data


  app.get('/', (req, res) => {
    res.send('Welcome to Kino Noir!');
  });


  //middleware
  app.use(morgan('common'));
  app.use(express.static('public'));
  app.use(bodyParser.json());

/*Express code routing all the endpoints:*/


//1. Returns a list of all movies 

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//2. Returns data about a single movie 
app.get('/movies/:title', (req, res) => {
  res.json(topMovies.find((movie) =>
    { return movie.title === req.params.title}));
});

//3. Returns data about genre
app.get('/movies/genres/:genre', (req, res) => {
  res.json(topMovies.find((movie) =>
    { return movie.genre === req.params.genre }));
});

//4. Returns data about director
app.get('/movies/:director', (req, res) => {
  res.json(topMovies.find((movie) =>
    { return movie.director === req.params.director }));
});

//5. Allows new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Please add name';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//6. Updates user info (username)
app.put('/users/', (req, res) => {
  let newUsername = req.body;

  if (!newUsername.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    users.push(newUsername);
    res.status(201).send(newUsername);
  }
});

//7. Allows users to add movie to favorites

app.put('/movies', (req, res) => {
  let favorite= req.body;

  if (!favorite.name) {
    const message = 'Please add to favorites';
    res.status(400).send(message);
  } else {
    movies.push(favorite);
    const message = 'Movie was removed from favorites';
    res.status(201).send(favorite);
  }
});

//8. Allows users to remove movie from favorites
app.delete('/movies', (req, res) => {
  movies.pop(favorite);
    res.status(201).send(favorite);
});

//9. Allows users to deregister from Kino Noir
app.delete('/users', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deregistered from Kino Noir.');
  }
});

 //error-handling middleware

 app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Yikes, something isn\'t quite right here!');
});


//server/requests listener
app.listen(8080, () => {
console.log('Kino Noir is listening on port 8080.');
});