let mongoose = require('mongoose');

// Brand Schema
let vehiclemaintnceSchema = mongoose.Schema({
    vehiclemaintnce_name: {
        type: String,
    },
    vehiclemaintnce_code: {
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
let vehiclemaintnce = module.exports = mongoose.model('vehiclemaintnce_mast', vehiclemaintnceSchema);