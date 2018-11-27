let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let stateSchema = mongoose.Schema({
    countryid: {
        type: Schema.Types.ObjectId, ref: 'country_mast',
        required: true
    },
    state_name: {
        type: String,
    },
    state_code: {
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
let State = module.exports = mongoose.model('state_mast', stateSchema);