//Import express
const express = require("express"),
app = express(),
path = require("path"),
 morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
  const { check, validationResult } = require('express-validator'); 


const mongoose = require('mongoose');

const Models = require('./models');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

app.use(morgan("common"));
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
   useNewUrlParser: true, useUnifiedTopology: true });

   mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
const app = express();
const cors = require('cors');

//sreve documentation.html from ´/public´
app.use(express.static("public"))


app.use(bodyParser.urlencoded({ extended: true }));
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];


let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const cors = require('cors');
app.use(cors());


// GET requests 
app.get('/', (req, res) => {
  res.send('Welcome to my Movie Database');
});

// Get all Movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
	Movies.find()
		.then((movies) => {
			res.status(201).json(movies);
		})
		.catch((error) => {
		console.error(error);
		res.status(500).send('Error: ' + error);
	});
});
// Get movie by a title

app.get('/movies/:title',passport.authenticate('jwt', { session: false }), (req, res) => {
Movies.findOne({
	Title: req.params.title
  })
  .then((movie) => {
	res.json(movie);
  }).catch((err) => {
	console.error(err);
	res.status(500).send('Error: ' + err);
  })
});

// Get all Directors 
app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
Directors.find()
  .then((director) => {
	res.status(200).json(director);
  }).catch((err) => {
	console.error(err);
	res.status(500).sned('Error: ' + err);
  });
});

// Gets the data about the name of the director
app.get('/directors', passport.authenticate('jwt', { session: false }), (req, res) => {
Directors.find()
  .then((director) => {
	res.status(200).json(director);
  }).catch((err) => {
	console.error(err);
	res.status(500).sned('Error: ' + err);
  });
});


// Get genres 
app.get('/genres', passport.authenticate('jwt', { session: false }),(req, res) => {
Genres.find()
  .then((genre) => {
	res.status(200).json(genre);
  }).catch((err) => {
	console.error(err);
	res.status(500).sned('Error: ' + err);
  });
});

// Get genres by name 
app.get('/genres/:Name', passport.authenticate('jwt', { session: false }),(req, res) => {
Genres.findOne({
	Name: req.params.Name
  })
  .then((genre) => {
	res.json(genre);
  }).catch((err) => {
	console.error(err);
	res.status(500).send('Error: ' + err);
  })
});

// Allow new users to register
app.post('/users', passport.authenticate('jwt', { session: false }),(req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
	  const message = 'Missing name in request body';
	  res.status(400).send(message);
  } else {
	  newUser.id = uuid.v4();
	  users.push(newUser);
	  res.status(201).send(newUser);
  }
});

// Get Users
app.get('/users', passport.authenticate('jwt', { session: false }),(req, res) => {
Users.find()
  .then((users) => {
	res.status(201).json(users);
  }).catch((err) => {
	console.error(err);
	res.status(500).send('Error: ' + err);
  });
});

// Get user by name 
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),(req, res) => {
Users.findOne({
	Username: req.params.Username
  })
  .then((user) => {
	res.json(user);
  })
  
  .catch((err) => {
	console.error(err);
	res.status(500).send('Error: ' + err);
  });
});

// Add a user 
app.post('/users',(req, res) => {
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

// Update a user's username 
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),(req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
  {
	Username: req.body.Username,
	Password: req.body.Password,
	Email: req.body.Email,
	Birthday: req.body.Birthday
  }
},
{ new: true }, 
// This line makes sure that the updated document is returned
(err, updatedUser) => {
  if(err) {
	console.error(err);
	res.status(500).send('Error: ' + err);
  } else {
	res.json(updatedUser);
  }
});
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID',passport.authenticate('jwt', { session: false }), (req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, {
   $push: { FavoriteMovies: req.params.MovieID }
 },
 { new: true }, 
 // This line makes sure that the updated document is returned
(err, updatedUser) => {
  if (err) {
	console.error(err);
	res.status(500).send('Error: ' + err);
  } else {
	res.json(updatedUser);
  }
});
});

// Remove a movie form user's fav list 
app.delete('/users/:Username/favorites/:_id', passport.authenticate('jwt', { session: false }), (req,res) => {
users.findOneAndUpdate ({ Username: req.params.Username},
  { $pull: { FavoritMovies: req.params._id} },
  {new: true},
  (err, updatedUser) => {
	if (err) {
	  console.error(err);
	  res.status(500).send('Error: ' + err);
  } else {
	res.json(updatedUser);
  }
});
});

// Delete a user by username
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

// Error-handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

