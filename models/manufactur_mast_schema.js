let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let manufacturSchema = mongoose.Schema({
    manufactur_name: {
        type: String,
    },
    manufactur_code: {
        type: String,
    },
    manufactur_typ:
    {
        type: Schema.Types.ObjectId, ref: 'accessriestyp_mast',
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
let Manufactur = module.exports = mongoose.model('manufactur_mast', manufacturSchema);