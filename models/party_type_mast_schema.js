let mongoose = require('mongoose');

// Brand Schema
let partypSchema = mongoose.Schema({
    party_type_name: {
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
let party = module.exports = mongoose.model('party_type_mast', partypSchema);