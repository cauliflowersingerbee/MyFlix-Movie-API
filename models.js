const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: { type: String, required: true }, 
    Description: { type: String, required: true }, 
    Genre: {
        Name: String, 
        Description: String
    }, 
    Director: {
        Name: String, 
        Bio: String, 
        Birth: String, 
        Death: String
    },
        ImagePath: String,
        Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Birthday: Date,
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    FavoriteMovie:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;