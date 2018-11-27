let mongoose = require('mongoose');

// Brand Schema
let accessriestypSchema = mongoose.Schema({
    accessriestyp_name: {
        type: String,
    },
    accessriestyp_code: {
        type: String,
    },
    co_code:{
        type:String,
    },
    div_code:{
        type:String,
    },
    usrnm:{
        type:String,
    }
});
let accessriestyp = module.exports = mongoose.model('accessriestyp_mast', accessriestypSchema);