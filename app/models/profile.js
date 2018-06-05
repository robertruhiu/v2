var mongoose = require('mongoose');
var profileSchema = mongoose.Schema({

    username:{type:String,required:true},
    company:{type:String,required:true},
    position:{type:String,required:true}

});



module.exports = mongoose.model('Profile', profileSchema);