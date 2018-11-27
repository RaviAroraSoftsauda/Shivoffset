let mongoose = require('mongoose');

// Brand Schema
let racklocSchema = mongoose.Schema({
    rackloc_name: {
        type: String,
    },
    rackloc_rckno: {
        type: String,
    },
    rackloc_rowno: {
        type: String,
    },
    rackloc_qtycpcaty: {
        type: String,
    },
    rackloc_remark: {
        type: String,
    },
    rackloc_supress: {
        type: String,
    },
    rackloc_stock: {
        type: String,
    },
    rackloc_distroy: {
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
let rackloc = module.exports = mongoose.model('rackloc_mast',racklocSchema);

