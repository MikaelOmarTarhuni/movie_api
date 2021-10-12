const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Movie Schema 
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String,
    },
    Director: {
        Name: String,
        Bio: String,
        Born: Date 
    },
    ImagePath: String,
    Featured: Boolean,
});

// User Schema 
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
  });

    // Actual hashing of submitted passwords
    userSchema.statics.hashPassword = (password) => {
      return bcrypt.hashSync(password, 10);
    };
  
    //Compares submitted hashed passwords with the hashed passwords stored in database.
    userSchema.methods.validatePassword = function(password) {
      return bcrypt.compareSync(password, this.Password);
    };

// Genre Schema 
  let genreSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true}
  });

// Director Schema 
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  Birth: { type: String, required: true },
  Death: { type: String },
  Films: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

  
  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  let Genre = mongoose.model('Genre', genreSchema);
  let Director = mongoose.model('Director', directorSchema);
  
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;