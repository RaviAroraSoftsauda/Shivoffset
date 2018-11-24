let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let partySchema = mongoose.Schema({
    party_code: {
        type: String,
    },
    party_name: {
        type: String,
    },
    party_addrss1: {
        type: String,
    },
    party_addrss2: {
        type: String,
    },
    part_city: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
        required: true
    },
    party_mobno: {
        type: String,
    },
    party_contprsn: {
        type: String,
    },
    party_prttyp: {
        type: Schema.Types.ObjectId, ref: 'party_type_mast',
        required: true
    },
    partysndcrd: {
        type: String,
    },
    partylckcrd: {
        type: String,
    },
    partyapproval: {
        type: String,
    },
    tolrance_group: {
        type: Array,
    },
    tole_group: {
        type: Array,
    },
    party_fixsheet: {
        type: String,
    },
    filepath: {
        type: String,
        trim: true
    },
    filename: {
        type: String
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
let Party = module.exports = mongoose.model('party_mast', partySchema);