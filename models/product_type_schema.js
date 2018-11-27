let mongoose = require('mongoose');

// Brand Schema
let prodtSchema = mongoose.Schema({
    prdt_typ_name: {
        type: String,
    },
    prdt_code: {
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
let Product = module.exports = mongoose.model('prdttyp_mast', prodtSchema);