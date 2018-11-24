let mongoose = require('mongoose');

// Brand Schema
let countrySchema = mongoose.Schema({
    country_name: {
        type: String,
    },
    country_code: {
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
let Country = module.exports = mongoose.model('country_mast', countrySchema);