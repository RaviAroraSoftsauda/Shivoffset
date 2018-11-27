let mongoose = require('mongoose');

// Brand Schema
let indsrttypSchema = mongoose.Schema({
    indsrttyp_dscrpton: {
        type: String,
    },
    indsrttyp_qty: {
        type: String,
    },
    indsrttyp_code: {
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
let Insert = module.exports = mongoose.model('indsrttyp_mast', indsrttypSchema);