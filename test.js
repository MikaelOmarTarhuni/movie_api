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




let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const cors = require('cors');
app.use(cors());


// GET requests 
app.get('/', (req, res) => {
  res.send('Welcome to my Movie Database');
});

//var movie1 = {
//	Title: "Silence of the Lambs",
//	Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
//	Genre: {
//	  Name: "Thriller",
//	  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
//	},
//	Director: {
//	  Name: "Jonathan Demme",
//	  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
//	  Birth: "1944",
//	  Death: "2017"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
//	Featured: true
  //}
  
  //db.movies.insertOne(movie1)
  
 // var movie = {
	//Title: "The Matrix",
//	Description: "a 1999 science fiction film about a computer hacker, Neo, played by Keanu Reeves, who discovers that the world he is living in is part of a computer program called The Matrix. He joins a group of people who are trying to fight against those controlling the Matrix. The film uses many new special effects, for which it won four Oscars.",
//	Genre: {
//	  Name: "Science fiction",
//	  Description: "Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life."
//	},
//	Director: {
//	  Name: "Lana and Lilly Wachowski",
//	  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
//	  Birth: "1965",
//	  Death: "2010"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
//	Featured: true
  //}
  
 // var movie2 = {
	//Title: "Silence of the Lambs",
	//Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
	//Genre: {
	 // Name: "Thriller",
//	  Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
//	},
//	Director: {
//	  Name: "Jonathan Demme",
//	  Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
//	  Birth: "1944",
//	  Death: "2017"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
//	Featured: true
  //}
  
 // db.movies.insertOne(movie)
  
  //var movie3 = {
//	Title: "mission impossible",
//	Description: "is a series of American action spy films based on and a follow-on from the television series of the same name created by Bruce Geller. The series is mainly produced by and stars Tom Cruise, whose character is Ethan Hunt, an agent of the Impossible Missions Force.",
//	Genre: {
//	  Name: "Action",
//	  Description: "Action description is exactly what it sounds like."
//	},
//	Director: {
//	  Name: "Brian De Palma",
//	  Bio: "He is an American film director and screenwriter. With a career spanning over 50 years, he is best known for his work in the suspense, crime and psychological thriller genres.",
//	  Birth: "1940",
//	  Death: "2021"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BMTc3NjI2MjU0Nl5BMl5BanBnXkFtZTgwNDk3ODYxMTE@._V1_.jpg",
	//Featured: true
  //}
//  db.movies.insertOne(movie3)
  
  //var movie4 = {
//	Title: "Bad boys",
//	Description: "When the drug investigation turns deadly, the murderers kidnap the only witness - a beautiful police informant (Tea Leoni) and close friend of the Boys - and things get personal! Fast cars, a gorgeous woman and non-stop action make Bad Boys a guaranteed good time!",
//	Genre: {
//	  Name: "Action",
//	  Description: "Action description is exactly what it sounds like."
//	},
//	Director: {
	//  Name: "Michael Mann",
	  //Bio: "is an American director, screenwriter, and producer of film and television who is best known for his distinctive style of crime drama.",
	 // Birth: "1943",
	  //Death: "2020"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BMGE1ZTQ0ZTEtZTEwZS00NWE0LTlmMDUtMTE1ZWJiZTYzZTQ2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
//	Featured: true
  //}
 // db.movies.insertOne(movie4)
  
  //var movie5 = {
//	Title: "Avengers",
//	Description: "The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining Tony Stark a.k.a. the Iron Man; Steve Rogers, a.k.a. Captain America; Bruce Banner, a.k.a. The Hulk; Thor; Natasha Romanoff, a.k.a. Black Widow; and Clint Barton, a.k.a. Hawkeye, to save the world from the powerful Loki and the alien invasion.",
//	Genre: {
//	  Name: "superhero",
//	  Description: "is a stock character that possesses abilities beyond those of ordinary people, who typically uses his or her powers to help the world become a better place, or is dedicated to protecting the public."
//	},
//	Director: {
//	  Name: "Joss Whedon",
//	  Bio: "is an American film and television director, producer, screenwriter, composer, and comic book writer. He is the founder of Mutant Enemy Productions, co-founder of Bellwether Pictures, and is best known as the creator of several television series. These include the supernatural drama Buffy the Vampire Slayer (1997–2003) and its spinoff Angel (1999–2004), the short-lived space Western Firefly (2002), the science fiction drama Dollhouse (2009–2010), the Marvel Cinematic Universe series Agents of S.H.I.E.L.D. (2013–2020), and the science fiction drama The Nevers (2021).",
//	  Birth: "1964",
//	  Death: "2022"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
	//Featured: true
 // }
 // db.movies.insertOne(movie5)
  
  //var movie6 = {
//	Title: "Iron Man",
//	Description: "Iron Man is a 2008 superhero film, based on the Marvel Comics superhero of the same name. It is the first installment in the Marvel Cinematic Universe and the first installment of Phase One.",
//	Genre: {
//	  Name: "Superhero",
//	  Description: "is a stock character that possesses abilities beyond those of ordinary people, who typically uses his or her powers to help the world become a better place, or is dedicated to protecting the public."
//	},
//	Director: {
//	  Name: "Jonathan Kolia Favreau",
//	  Bio: "is an American film director, producer, and screenwriter.",
//	  Birth: "1966",
//	  Death: "2016"
	//},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg",
//	Featured: true
 // }
//  db.movies.insertOne(movie6)
  
//  var movie7 = {
//	Title: "Man of steel",
//	Description: "A Kryptonian sent by his parents to Earth as an infant to escape the destruction of his homeworld, Krypton,",
//	Genre: {
//	  Name: "superhero",
//	  Description: "is a stock character that possesses abilities beyond those of ordinary people, who typically uses his or her powers to help the world become a better place, or is dedicated to protecting the public."
//	},
//	Director: {
//	  Name: "Zachary Edward Snyder",
//	  Bio: "is an American film director, producer, and screenwriter.",
//	  Birth: "1966",
//	  Death: "2016"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_FMjpg_UX1000_.jpg",
//	Featured: true
//  }
//  db.movies.insertOne(movie7)
  
//  var movie8 = {
//	Title: "Forest Gump",
//	Description: "The movie Forrest Gump follows the life events of a man who shares the name as the title of the film. Gump faces many tribulations throughout his life, but he never lets any of them interfere with his happiness.",
//	Genre: {
//	  Name: "Drama",
//	  Description: "The definition of a drama is a story or situation which usually presents some sort of conflict. An example of drama is Romeo and Juliet. An example of drama is a break-up caused by the boyfriend cheating with the girlfriends best friend"
//	},
//	Director: {
//	  Name: "Robert Lee Zemeckis",
//	  Bio: "is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects.",
//	  Birth: "1951",
//	  Death: "2012"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
	//Featured: true
 // }
//  db.movies.insertOne(movie8)
  
//  var movie9 = {
//	Title: "Harry Potter",
//	Description: "Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films",
//	Genre: {
//	  Name: "fantasy",
//	  Description: "is a genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore."
//	},
//	Director: {
//	  Name: "Chris Joseph Columbus",
//	  Bio: "is an American film director, producer, and screenwriter. Born in Spangler, Pennsylvania.",
//	  Birth: "1958",
//	  Death: "2012"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg",
//	Featured: true
//  }
//  db.movies.insertOne(movie9)
  
  //var movie10 = {
//	Title: "Heat",
//	Description: "jhftuddudtd",
//	Genre: {
//	  Name: "crime",
//	  Description: "the intentional commission of an act usually deemed socially harmful or dangerous and specifically defined, prohibited, and punishable under criminal law."
//	},
//	Director: {
//	  Name: "Michael Mann",
//	  Bio: "is an American director, screenwriter, and producer of film and television who is best known for his distinctive style of crime drama",
//	  Birth: "1943",
//	  Death: "2020"
//	},
//	ImagePath: "https://m.media-amazon.com/images/M/MV5BNGMwNzUwNjYtZWM5NS00YzMyLWI4NjAtNjM0ZDBiMzE1YWExXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
//	Featured: true
//  }


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

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});