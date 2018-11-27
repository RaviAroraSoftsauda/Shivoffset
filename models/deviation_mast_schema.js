let mongoose = require('mongoose');

// Brand Schema
let deviationSchema = mongoose.Schema({
    deviation_name: {
        type: String,
    },
    deviation_code: {
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
let deviation = module.exports = mongoose.model('deviation_mast', deviationSchema);