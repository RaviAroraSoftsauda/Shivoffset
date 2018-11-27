let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let stateSchema = mongoose.Schema({
    countryid: {
        type: Schema.Types.ObjectId, ref: 'country_mast',
    },
    stateid: {
        type: Schema.Types.ObjectId, ref: 'state_mast',
    },
    city_name: {
        type: String,
    },
    city_code: {
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
let City = module.exports = mongoose.model('city_mast', stateSchema);