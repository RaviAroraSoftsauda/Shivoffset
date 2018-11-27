let mongoose = require('mongoose');

// Brand Schema
let maintanceSchema = mongoose.Schema({
    maintance_name: {
        type: String,
    },
    maintance_address: {
        type: String,
    },
    maintance_typ: {
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
let maintance = module.exports = mongoose.model('maintance_mast', maintanceSchema);