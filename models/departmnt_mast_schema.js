let mongoose = require('mongoose');

// Brand Schema
let departmntSchema = mongoose.Schema({
    departmnt_name: {
        type: String,
    },
    machine_group: {
        type: Array,
    },
    departmnt_jbordr: {
        type: String,
    },
    departmnt_dflt: {
        type: String,
    },
    departmnt_invreqrmnt: {
        type: String,
    },
    dprtmnt_group: {
        type: Array,
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
let departmnt = module.exports = mongoose.model('departmnt_mast', departmntSchema);