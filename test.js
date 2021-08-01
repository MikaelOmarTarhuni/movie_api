//Import express
const express = require("express"),
app = express(),
 morgan = require("morgan"),

  uuid = require("uuid");

app.use(morgan("common"));
app.use(express.json());
//sreve documentation.html from ´/public´
app.use(express.static("public"))

let topMovies = [
	{
		id:'101',
		title: 'The Matrix',
		description:'a 1999 science fiction film about a computer hacker, Neo, played by Keanu Reeves, who discovers that the world he is living in is part of a computer program called The Matrix. He joins a group of people who are trying to fight against those controlling the Matrix. The film uses many new special effects, for which it won four Oscars.',
		genre:'Science fiction',
		director: 'Lana and Lilly Wachowski'
	},
	{
		id:'102',
		title: 'Mission Imposible',
		description:'is a series of American action spy films based on and a follow-on from the television series of the same name created by Bruce Geller. The series is mainly produced by and stars Tom Cruise, whose character is Ethan Hunt, an agent of the Impossible Missions Force',
		genre: 'Action',
		director: 'Brian De Palma'
	},
	{
		id:'103',
		title: 'Heat',
		description:' jhftuddudtd',
		genre: 'crime',
		director: 'Michael Mann'
	},
	{
		id:'104',
		title: 'Bad boys',
		description:'When the drug investigation turns deadly, the murderers kidnap the only witness - a beautiful police informant (Tea Leoni) and close friend of the Boys - and things get personal! Fast cars, a gorgeous woman and non-stop action make Bad Boys a guaranteed good time!',
		genre:'Action', 
		director: 'Michael Mann'
	},
	{
		id:'105',
		title: 'Avengers',
		description:'The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining Tony Stark a.k.a. the Iron Man; Steve Rogers, a.k.a. Captain America; Bruce Banner, a.k.a. The Hulk; Thor; Natasha Romanoff, a.k.a. Black Widow; and Clint Barton, a.k.a. Hawkeye, to save the world from the powerful Loki and the alien invasion.',
		genre: 'superhero',
		director: 'Joss Whedon'
	},
	{
		id:'106',
		title: 'Iron Man',
		description:'Iron Man is a 2008 superhero film, based on the Marvel Comics superhero of the same name. It is the first installment in the Marvel Cinematic Universe and the first installment of Phase One.',
		genre: 'Superhero',
		director: 'Jonathan Kolia Favreau'
	},
	{
		id:'107',
		title: 'Man of steel',
		description:'A Kryptonian sent by his parents to Earth as an infant to escape the destruction of his homeworld, Krypton,',
		genre: 'superhero',
		director: 'Zachary Edward Snyder'
	},
	{
		id:'108',
		title: 'Batman',
		description:'Batman is the superhero protector of Gotham City, a tortured, brooding vigilante dressed as a sort of human bat who fights against evil and strikes fear into the hearts of criminals everywhere. In his public identity he is Bruce Wayne, billionaire industrialist and notorious playboy.',
		genre: 'superhero',
		director: 'Christopher Edward Nolan'
	},
	
	{
		id:'109',
		title: 'Forest Gump',
		description:'The movie Forrest Gump follows the life events of a man who shares the name as the title of the film. Gump faces many tribulations throughout his life, but he never lets any of them interfere with his happiness.',
		genre: 'Drama',
		director: 'Robert Lee Zemeckis'
	},
	{
	id:'110',
	title: 'Harry Potter',
	description:'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films',
	genre: 'fantasy',
	director: 'Chris Joseph Columbus'
	},

];

let genre = 
[
	{
		id:'301',
		name: 'Science fiction',
		description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction that typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.',

	},
	{
		id:'303',
		name: 'crime',
		description: ' the intentional commission of an act usually deemed socially harmful or dangerous and specifically defined, prohibited, and punishable under criminal law.',
	},
	{
		id:'304',
		name: 'Action',
		description:'Action description is exactly what it sounds like. ',
	},
	{
		id:'305',
		name: 'superhero',
		description: ' is a stock character that possesses abilities beyond those of ordinary people, who typically uses his or her powers to help the world become a better place, or is dedicated to protecting the public',
	},
	{
		id:'309',
		name: 'Drama',
		description: 'The definition of a drama is a story or situation which usually presents some sort of conflict. An example of drama is Romeo and Juliet. An example of drama is a break-up caused by the boyfriend cheating with the girlfriends best friend',	
	},
	{
		id:'310',
		name: 'fantasy',
		description: ' is a genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore',
	},

];
let director = 
[
	{
		id:'201',
		name: 'Lana and Lilly Wachowski',
		bio: 'formerly known as Andy Wachowski are American film and television directors, writers and producers',
		birthyear:'1965',
		deathyear: '2010'
	},

	{
		id:'202',
		name: 'Brian De Palma',
		bio:' is an American film director and screenwriter. With a career spanning over 50 years, he is best known for his work in the suspense, crime and psychological thriller genres',
		birthyear:'1940',
		deathyear: '2021'
	},
	{
		id:'203',
		name: 'Zachary Edward Snyder',
		bio: ' is an American film director, producer, and screenwriter.',
		birthyear:'1966',
		deathyear: '2016'
	},
	{
		id:'205',
		name: 'Michael Mann',
		bio: ' is an American director, screenwriter, and producer of film and television who is best known for his distinctive style of crime drama',
		birthyear:'1943',
		deathyear: '2020'
	},
	{
		id:'206',
		name: 'Jonathan Kolia Favreau',
		bio: ' is an American film director, producer, and screenwriter.',
		birthyear:'1966',
		deathyear: '2016'
	},	
	{
		id:'208',
		name: 'Christopher Edward Nolan',
		bio:') is a British-American film director, producer, and screenwriter.',
		birthyear:'1970',
		deathyear: '2012'
	},
	{
		id:'209',
		name: 'Robert Lee Zemeckis',
		bio:' is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects',
		birthyear:'1951',
		deathyear: '2012'
	},
	{
		id:'210',
		name: 'Chris Joseph Columbus',
		bio: ' is an American film director, producer, and screenwriter. Born in Spangler, Pennsylvania',
		birthyear:'1958',
		deathyear: '2012'
	},

];
let user = 
[
	{
	id:'',
	username: '',
	password:'',
	email: '',
	birthday: ''
	},
];

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