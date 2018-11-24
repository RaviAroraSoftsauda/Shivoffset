let mongoose = require('mongoose');

// Brand Schema
let constructionSchema = mongoose.Schema({
    construction_name: {
        type: String,
    },
    construction_code: {
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
let Construction = module.exports = mongoose.model('construction_mast', constructionSchema);