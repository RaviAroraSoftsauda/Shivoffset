let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let accessriestypSchema = mongoose.Schema({
    accessriestyp_name: {
        type: String,
    },
    accessriestyp_code: {
        type: String,
    },
    accessriestyp_supname: {
        type: Schema.Types.ObjectId, ref: 'supplier_mast',
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