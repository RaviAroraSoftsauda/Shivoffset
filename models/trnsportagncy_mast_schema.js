let mongoose = require('mongoose');

// Brand Schema
let trnsportagncySchema = mongoose.Schema({
    trnsportagncy_name: {
        type: String,
    },
    trnsportagncy_code: {
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
let trnsportagncy = module.exports = mongoose.model('trnsportagncy_mast', trnsportagncySchema);