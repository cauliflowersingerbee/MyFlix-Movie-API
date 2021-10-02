//requirements and imports
const express = require('express');
      morgan = require('morgan');
      uuid = require('uuid');
      bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Models = require('./models.js');
      
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixMovieDB', {useNewUrlParser: true, useUnifiedTopology: true});
  
     
const app = express();


  //middleware
  app.use(morgan('common'));
  app.use(express.static('public'));
  app.use(bodyParser.json());


  /*
//movie data
let movies = [
      {
        id: 1,
        title: 'Moonlight',
        director: 'Barry Jenkins',
        year: 2017,
        genre: 'Coming-of-age'
      },
      {
        id: 2,
        title: 'Hidden Figures',
        director: 'Theodore Melfi',
        year: 2017, 
        genre: 'Historical Drama'
      },
      {
        id: 3,
        title: 'Do the Right Thing',
        director: 'Spike Lee',
        year: 1989,
        genre: 'Comedy Drama'
      },
      {
        id: 4,
        title: 'Poetic Justice',
        director: 'John Singleton',
        year: 1993,
        genre: 'Romance'
      },
      {
        id: 5,
        title: 'Waiting to Exhale',
        director: 'Forest Whitaker',
        year: 1995,
        genre: 'Romance'
      },
      {
        id: 6,
        title: 'Daughters of the Dust',
        director: 'Julie Dash',
        year: 1991,
        genre: 'Historical Drama'
      },
      {
        id: 7,
        title: 'Pariah',
        director: 'Dee Rees',
        year: 2011,
        genre: 'Coming-of-age'
      },
      {
        id: 8,
        title: 'Black Panther',
        director: 'Ryan Coogler',
        year: 2018,  
        genre: 'Superhero'
      },
      {
        id: 9,
        title: 'Beasts of the Southern wild',
        director: 'Benh Zeitlin',
        year: 2012,
        genre: 'Fantasy'
      },
      {
        id: 10,
        title: 'Sorry to Bother You',
        director: 'Boots Riley',
        year: 2018,  
        genre: 'Comedy'
      }

  ];
  

  let directors = [
    {
      director: 'Barry Jenkins',
      born: 1979,
      filmography: ['Medicine for Melancholy', 'If Beale Street Could Talk', 'Dear White People', 'The Underground Railroad']
    },
    {
      director: 'Theodore Melfi',
      born: 1970,
      filmography: ['Winding Roads', 'St. Vincent', 'The Starling'] 
    },  
    {
      director: 'Spike Lee',
      born: 1957,
      filmography: ['She\'s Gotta Have It', 'Inside Man', 'Da 5 Bloods'] 
    },
    {
      director: 'John Singleton',
      born: 1968,
      died: 2019,
      filmography: ['Boyz n the Hood', 'Higher Learning', '2 Fast 2 Furious']
    },
    {
      director: 'Forest Whitaker',
      born: 1961,
      filmography: ['The Last King of Scotland', 'The Great Debaters', 'Arrival'] 
    },
    {
      director: 'Julie Dash',
      born: 1952,
      filmography: ['Queen Sugar', 'Standing at the Scratch Line', 'The Rosa Parks Story']
    },
    {
      director: 'Dee Rees',
      born: 1977,
      filmography: ['Mudbound', 'The Last Thing He Wanted', 'Colonial Gods'] 
    },
    {
      director: 'Ryan Coogler',
      born: 1986,
      filmography: ['Fruitvale Station', 'Creed', 'Black Panther: Wakanda Forever']
    },
    {
      director: 'Benh Zeitlin',
      born: 1982,
      filmography: ['Glory at Sea', 'Wendy'] 
    },
    {
      director: 'Boots Riley',
      born: 1971,
      filmography: 'I\'m a Virgo'
    },
  ];


  let users = [
    {
        username: 'Roots Bailey',
        password: 'PinkCupcakes38',
        email: 'rootsbailey@examplemail.com',
        birthday: '01-09-1995',
        favoriteMovies: ['3', '5', '9'],
        id: 1,
    },
    {
        username: 'Forest Riverdale',
        password: 'onePotatotwopoTAto75',
        email: 'riverforest@examplemail.com',
        birthday: '06-06-2002',
        favoriteMovies: ['1', '8'],
        id: 2,
    },
];

  /*Express code routing all the endpoints:*/


/*1. Returns a list of all movies  */

app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//2. Returns data about a single movie 
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
/*
//3. Returns data about genre
app.get('/movies/genres/:genre', (req, res) => {
  Movies.find({ Genre: req.params.Genre })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });



//4. Returns data about director
app.get('/movies/directors/:director', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.director === req.params.director }));
});

//5. Allows new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

    if (!newUser.username) {
        const message = 'Please enter your username!';
        res.status(400).send(message);
    } else {
        const message = 'New user succesfully registered!';
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

//6. Updates user info (username)
app.put('/users/:username', (req, res) => {
  res.json(users.find((user) =>
  { return user.username === req.params.username}));
  console.log('Please update username!');
});
  
  


//7. Allows users to add movie to favorites

app.put('/movies', (req, res) => {
  let favorite= req.body;

  if (!favorite.name) {
    const message = 'Please add to favorites';
    res.status(400).send(message);
  } else {
    const message = 'Movie was added to favorites'
    movies.push(favorite);
    res.status(201).send(message);
  }
});

//8. Allows users to remove movie from favorites

  
app.delete('/movies/:title', (req, res) => {
  let favoriteMovie = movies.find((movie) => { return movie.title === req.params.title });
  if (!favoriteMovie.title) {
    const message = 'Please add title';
    res.status(400).send(message);
  } else {
  const message = 'Movie was removed from favorites'
    res.status(201).send(message);
  }
});


//9. Allows users to deregister from Kino Noir
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  if (!user.username) {
    const message = 'Please add username';
    res.status(400).send(message);
  } else {
  const message = 'User was removed from Kino Noir'
    res.status(201).send(message);
  }
});

*/

 //error-handling middleware

 app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Yikes, something isn\'t quite right here!');
});


//server/requests listener
app.listen(8080, () => {
console.log('Kino Noir is listening on port 8080.');
});