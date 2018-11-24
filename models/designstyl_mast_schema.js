let mongoose = require('mongoose');

// Brand Schema
let designSchema = mongoose.Schema({
    design_style: {
        type: String,
    },
    design_code: {
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
let Design = module.exports = mongoose.model('design_mast', designSchema);