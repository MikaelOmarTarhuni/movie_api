//Import express
const express = require("express"),
app = express(),
morgan = require("morgan"),
path = require("path"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
  const { check, validationResult } = require('express-validator'); 


const mongoose = require('mongoose');
const Models = require('./models.js');
// const cors = require('cors');
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'https://myflixdb-mikael.herokuapp.com/', 'http://localhost:1234', 'http://localhost:4200', 'https://mikaelomartarhuni.github.io'];
app.use(cors({
	origin: (origin, callback) => {
	  if(!origin) return callback(null, true);
	  if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
		let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
		return callback(new Error(message ), false);
	  }
	  return callback(null, true);
	}
  }));

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

app.use(morgan("common"));

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true });

// Comment this before puhsing to HEROKU
// mongoose.connect('mongodb+srv://MikaelOmarTarhuni:MA278de@myowncluster.j1y2h.mongodb.net/myFlixDB?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true });

// import example
// mongoimport --uri mongodb+srv://MikaelOmarTarhuni:MA278de@myowncluster.j1y2h.mongodb.net/myFlixDB --collection directors --type JSON --file C:\Users\User\Documents\careerfoundry\tasks\collections\director.json

// Uncomment this before pushing to HEROKU
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('common'));
app.use(express.static('public'));
app.use(cors());

// Importing auth.js file
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
//sreve documentation.html from ´/public´
app.use(express.static("public"))


// GET requests 
app.get('/', (req, res) => {
  res.send('Welcome to my Movie Database');
});


  // Get all Movies
app.get("/movies",passport.authenticate('jwt',{
	session:false
}), (req, res) => {
	Movies.find()
	.then(function (movies) {
		res.status(201).json(movies);
	})
	.catch(function (error) {
		console.error(error);
		res.status(500).send("Error: " + error);
	});
});

// Get movie by a title

app.get('/movies/:title/',passport.authenticate('jwt',{
  session:false
}), (req, res) => {
  console.log(req.params,'movie request')
  Movies.findOne({ 
      Title: req.params.title
    })
    .then((movie) => {
      res.json(movie);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Get all Directors 
app.get('/directors',passport.authenticate('jwt',{
	session:false
  }), 
  (req, res) => {
	Directors.find()
	  .then((director) => {
		res.status(200).json(director);
	  })
		.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
  
  // Gets the data about the name of the director
  app.get('/directors/:Name',passport.authenticate('jwt',{
	session:false
  }), (req, res) => {
	Directors.findOne({
		'Name': req.params.Name
	  })
	  .then((director) => {
		res.json(director);
	  }).catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
  

// Get genres 
app.get('/genre',passport.authenticate('jwt',{
	session:false
  }), (req, res) => {
	Genres.find()
	  .then((genre) => {
		res.status(200).json(genre);
	  }).catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
  
  // Get genres by name 
  app.get('/genre/:Name',passport.authenticate('jwt',{
	session:false
  }), (req, res) => {
	Genres.findOne({
		Name: req.params.Name
	  })
	  .then((genre) => {
		res.json(genre);
	  }).catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
  



 // Get Users
 app.get('/users',passport.authenticate('jwt',{
	session:false
  }), (req, res) => {
	Users.find()
	  .then((user) => {
		res.status(201).json(user);
	  }).catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });
  
  // Get user by name 
  app.get('/users/:Username',passport.authenticate('jwt',{
	session:false
  }), (req, res) => {
	Users.findOne({
		Username: req.params.Username
	  })
		.populate('FavoriteMovies')
	  .then((user) => {
		res.status(201).json(user);
	  }).catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	  });
  });

// Allow new users to register
app.post('/users',
	[
		check('Username','Username is required').isLength({min: 5}),
		check('Username','Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
		check('Password', 'Password is required').not().isEmpty(),
		check('Email','Email does not appear to be valid').isEmail()
	],(req, res) => {
		let errors = validationResult(req);
		
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array() });
		}

  // Username, Password, Email

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({Username: req.body.Username})
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists')
    }
    else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.birthday
    })
      .then((user) => {
        res.status(201).json(user);
      })
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
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
[
	check('Username', 'Username is required').isLength({ min: 5 }),
	check(
		'Username',
		'Username contains non alphanumeric characters - not allowed.'
	).isAlphanumeric(),
	check('Password', 'Password is required').not().isEmpty(),
	check('Email', 'Email does not appear to be valid').isEmail(),
],
(req, res) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	let hashedPassword = Users.hashPassword(req.body.Password);
Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
  {
	Username: req.body.Username,
	Password: hashedPassword,
	Email: req.body.Email,
	Birthday: req.body.Birthday
  }
},
{ new: true }, 
(err, updatedUser) => {
  if(err) {
	console.error(err);
	res.status(500).send('Error: ' + err);
  } else {
	res.json(updatedUser);
  }
});
});

// Add a movie to a user's list 
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
	Users.findOneAndUpdate(
	  {Username: req.params.Username},
	  {$push: {FavoriteMovies: req.params.MovieID}},
	  {new: true},
	  (err, updatedUser) => {
		if (err) {
		  console.error(err);
		  res.status(500).send('Error: ' + err);
		}
		else {
		  res.json(updatedUser);
		}
	  }
	)
  });
  
  // Remove a movie to a user's list 
  app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
	Users.findOneAndUpdate(
	  {Username: req.params.Username},
	  {$pull: {FavoriteMovies: req.params.MovieID }},
	  {new: true},
	  (err, updatedUser) => {
		if (err) {
		  console.error(err);
		  res.status(500).send(' was not found' + err);
		}else {
		  res.json(updatedUser);
		}
	  }
	)
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