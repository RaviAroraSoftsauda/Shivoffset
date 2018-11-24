let mongoose = require('mongoose');

// Brand Schema
let sopSchema = mongoose.Schema({
    sop_desp: {
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
let sop = module.exports = mongoose.model('sop_mast', sopSchema);