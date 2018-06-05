var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var profileSchema = mongoose.Schema({
    local            : {

        username     : String,
        company      : String
    },
});



module.exports = mongoose.model('Profile', profileSchema);