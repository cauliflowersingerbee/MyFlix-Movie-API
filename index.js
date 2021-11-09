const express = require('express');
      morgan = require('morgan');
      uuid = require('uuid');
      bodyParser = require('body-parser');
      lodash = require('lodash');
      const cors = require('cors');

const router = express.Router();




const mongoose = require('mongoose');
const Models = require('./models.js');
      
const Movies = Models.Movie;
const Users = Models.User;


mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { check, validationResult } = require('express-validator');

     
const app = express();

  app.use(morgan('common'));
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);

  
  app.use(cors());

  let auth = require('./auth')(app);
  const passport = require('passport');
  require('./passport');
  
  
  app.use(express.json());
  app.use(express.static("public"));


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err);
});
  

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.get('/movies/genres/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'Genre.Name': req.params.Genre })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });


app.get('/movies/directors/:Director', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'Director.Name': req.params.Director })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });


app.post('/users', [
  check('username', 'Username is required').isLength({min: 5}),
  check('username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required').not().isEmpty(),
], (req, res) => {
  
  
   let errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
   }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            username: req.body.Username,
            birthday: req.body.Birthday,
            password: hashedPassword,
            email: req.body.Email
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



app.put('/users/:username', passport.authenticate('jwt', { session: false }), [
  check('username', 'Username is required').isLength({min: 5}),
  check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  
  
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Users.findOneAndUpdate({ username: req.params.Username }, { $set:
    {
      username: req.body.Username,
      password: req.body.Password,
      email: req.body.Email,
      birthday: req.body.Birthday
    }
  },
  { new: true }, 
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      const message = req.params.Username + ' successfully updated!'
      res.status(201).send(message);
    }
  });
});


app.post('/users/:username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ username: req.params.Username }, {
     $push: { FavoriteMovie: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      const message = 'Movie successfully added to favorites!'
      res.status(201).send(message);
    }
  });
});


  
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { FavoriteMovie: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        const message = 'Movie successfully removed from favorites!'
        res.status(201).send(message);
      }
    });
  });


app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/', (req, res) => {
  res.send('Welcome to Kino Noir!');
});


const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});




