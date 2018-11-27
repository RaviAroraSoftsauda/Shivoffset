let mongoose = require('mongoose');
// Brand Schema
let stateSchema = mongoose.Schema({
    vernish_name: {
        type: String,
    },
    vernis_code: {
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
let Vernish = module.exports = mongoose.model('vernish_mast', stateSchema);