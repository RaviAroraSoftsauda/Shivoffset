let mongoose = require('mongoose');

// Brand Schema
let floadingSchema = mongoose.Schema({
    floading_desp: {
        type: String,
    },
    floading_code: {
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
let Floading = module.exports = mongoose.model('floading_mast', floadingSchema);