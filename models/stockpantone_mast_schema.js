let mongoose = require('mongoose');

// Brand Schema
let pantoneSchema = mongoose.Schema({
    pantone_descrpton: {
        type: String,
    },
    pantone_color: {
        type: String,
    },
    pantone_colorr: {
        type: String,
    },
    pantone_colorg: {
        type: String,
    },
    pantone_colorb: {
        type: String,
    },
    pantone_htmlcode: {
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
let  pantone = module.exports = mongoose.model('pantone_mast', pantoneSchema);
