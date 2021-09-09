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
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
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
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//    useNewUrlParser: true, useUnifiedTopology: true });
  
// mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('process.env.CONNECTION_URI', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.get('/movies',passport.authenticate('jwt',{
  session:false
}),
 (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get movie by a title

app.get('/movies/:title/',passport.authenticate('jwt',{
  session:false
}), (req, res) => {
  console.log(req.params,'movie request')
  Movies.findOne({ 
      title: req.params.title
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
		'Director.Name': req.params.Name
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
	  .then((Users) => {
		res.status(201).json(Users);
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
	  .then((Users) => {
		res.json(Users);
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
  .then((Users) => {
    if (Users) {
      return res.status(400).send(req.body.Username + ' already exists')
    }
    else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.birthday
    })
      .then((Users) => {
        res.status(201).json(Users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      })
    }
  })
});

// Add a user 
app.post('/users',(req, res) => {
Users.findOne({ Username: req.body.Username })
  .then((Users) => {
	if (Users) {
	  return res.status(400).send(req.body.Username + 'already exists');
	}
	 else
	{
	  Users.create({
		  Username: req.body.Username,
		  Password: req.body.Password,
		  Email: req.body.Email,
		  Birthday: req.body.Birthday
		})
		.then((Users) =>{res.status(201).json(Users) })
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

// Add a movie to a user's list 
app.put('/user/:username/addFavorite/:addFavorite', passport.authenticate('jwt', { session: false }), (req, res) => {
	Users.findOneAndUpdate(
	  {Username: req.params.username},
	  {$push: {favoriteMovies: req.params.addFavorite}},
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
  app.put('/user/:Username/removeFavorite/:removeFavorite', passport.authenticate('jwt', { session: false }), (req, res) => {
	Users.findOneAndUpdate(
	  {Username: req.params.Username},
	  {$pull: {favoriteMovies: req.params.removeFavorite}},
	  {new: true},
	  (err, updatedUser) => {
		if (err) {
		  console.error(err);
		  res.status(500).send(req.params.removeFavorite + ' was not found');
		}else {
		  res.json(updatedUser);
		}
	  }
	)
  });
  

// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
Users.findOneAndRemove({ Username: req.params.Username })
  .then((Users) => {
	if (!Users) {
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