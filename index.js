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


//1. Returns a list of all movies  

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

//3. Returns data about genre
app.get('/movies/genres/:Genre', (req, res) => {
  Movies.find({ 'Genre.Name': req.params.Genre })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });



//4. Returns data about director
app.get('/movies/directors/:Director', (req, res) => {
  Movies.find({ 'Director.Name': req.params.Director })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });


//5. Allows new users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

/*

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