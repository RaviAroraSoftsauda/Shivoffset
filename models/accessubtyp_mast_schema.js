let mongoose = require('mongoose');

// Brand Schema
let accessubtypSchema = mongoose.Schema({
    accessubtyp_name: {
        type: String,
    },
    accessubtyp_code: {
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
let accessubtyp = module.exports = mongoose.model('accessubtyp_mast', accessubtypSchema);