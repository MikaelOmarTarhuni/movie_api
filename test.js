//Import express
const express = require('express'),
app = express();
 morgan = require('morgan');

  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(morgan('common'));
app.use(bodyParser.json());

let topMovies = [
	{		
		title: 'Harry Potter',
		description:'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films',
		genre: 'fantasy',
		director: 'Chris Joseph Columbus'
	},
	{
		title: 'The Matrix',
		description:'a 1999 science fiction film about a computer hacker, Neo, played by Keanu Reeves, who discovers that the world he is living in is part of a computer program called The Matrix. He joins a group of people who are trying to fight against those controlling the Matrix. The film uses many new special effects, for which it won four Oscars.',
		genre:'Science fiction',
		director: 'Lana and Lilly Wachowski'
	},
	{
		title: 'Mission Imposible',
		description:'is a series of American action spy films based on and a follow-on from the television series of the same name created by Bruce Geller. The series is mainly produced by and stars Tom Cruise, whose character is Ethan Hunt, an agent of the Impossible Missions Force',
		genre: 'Action',
		director: 'Brian De Palma'
	},
	{
		title: 'Heat',
		description:' jhftuddudtd',
		genre: 'crime',
		director: 'Michael Mann'
	},
	{
		title: 'Bad boys',
		description:'When the drug investigation turns deadly, the murderers kidnap the only witness - a beautiful police informant (Tea Leoni) and close friend of the Boys - and things get personal! Fast cars, a gorgeous woman and non-stop action make Bad Boys a guaranteed good time!',
		genre:'Action', 
		director: 'Michael Mann'
	},
	{
		title: 'Avengers',
		description:'The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining Tony Stark a.k.a. the Iron Man; Steve Rogers, a.k.a. Captain America; Bruce Banner, a.k.a. The Hulk; Thor; Natasha Romanoff, a.k.a. Black Widow; and Clint Barton, a.k.a. Hawkeye, to save the world from the powerful Loki and the alien invasion.',
		genre: 'superhero',
		director: 'Joss Whedon'
	},
	{
		title: 'Iron Man',
		description:'Iron Man is a 2008 superhero film, based on the Marvel Comics superhero of the same name. It is the first installment in the Marvel Cinematic Universe and the first installment of Phase One.',
		genre: 'Superhero',
		director: 'Jonathan Kolia Favreau'
	},
	{
		title: 'Man of steel',
		description:'A Kryptonian sent by his parents to Earth as an infant to escape the destruction of his homeworld, Krypton,',
		genre: 'superhero',
		director: 'Zachary Edward Snyder'
	},
	{
		title: 'Batman',
		description:'Batman is the superhero protector of Gotham City, a tortured, brooding vigilante dressed as a sort of human bat who fights against evil and strikes fear into the hearts of criminals everywhere. In his public identity he is Bruce Wayne, billionaire industrialist and notorious playboy.',
		genre: 'superhero',
		director: 'Christopher Edward Nolan'
	},
	
	{
		title: 'Forest Gump',
		description:'The movie Forrest Gump follows the life events of a man who shares the name as the title of the film. Gump faces many tribulations throughout his life, but he never lets any of them interfere with his happiness.',
		genre: 'Drama',
		director: 'Robert Lee Zemeckis'
	}

];
//sreve documentation.html from '/public'
app.use(express.static('public'));

app.get('/topmovies', (req, res) => {
  res.json(topMovies);
});
// Gets the data about a single movie, by title

app.get('/topmovies/:title', (req, res) => {
  res.json(topMovies.find((movie) =>
    { return movie.title === req.params.title }));
});

// Adds data for a new movie to our list of topmvie.
app.post('/topmovies', (req, res) => {
  let newmovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing title in reqset body';
    res.status(400).send(message);
  } else {
    newmovie.title = uuid.v4();
    movies.push(newmovie);
    res.status(201).send(newmovie);
  }
});

// Deletes a movie from our list by title
app.delete('/movies/:title', (req, res) => {
  let movie = topMovies.find((movie) => { return movie.title === req.params.title });

  if (movie) {
    topMovies = topMovies.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('topmovies ' + req.params.id + ' was deleted.');
  }
});

// Update the "" of a movie by movie 	description/Drama
app.put('/topmovies/:description/:Drama', (req, res) => {
  let movie = topMovies.find((movie) => { return movie.director === req.params.description });

  if (movie) {
    movie.classes[req.params.drama] = parseInt(req.params.Drama);
    res.status(201).send('movie ' + req.params.name + ' was desription of ' + req.params.description + ' in ' + req.params.class);
  } else {
    res.status(404).send('movie with the titel ' + req.params.title + ' was not found.');
  }
});

// Allow new users to register
app.post('/users', (req, res) => {
	res.send('Successful POST request returning data on new User');
});

//Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
		res.status(201).send('user has changed his name');	
});

//get the starting request
app.get('/', (req, res) => {
	res.send('Welcome to myFlex movies!');
});

//Error-handling middleware
app.use((err, req, res, next) => {
	        console.log(err.stack);
	        res.status(500).send('Somthing broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});