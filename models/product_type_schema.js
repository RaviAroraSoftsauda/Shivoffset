let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let prodtSchema = mongoose.Schema({
    prdt_typ_name: {
        type: String,
    },
    prdt_deprtmnt: [{
        // type: String,
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    }],
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