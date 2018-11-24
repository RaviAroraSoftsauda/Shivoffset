let mongoose = require('mongoose');

// Brand Schema
let driverSchema = mongoose.Schema({
    driver_name: {
        type: String,
    },
    driver_salary: {
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
let  driver = module.exports = mongoose.model('driver_mast', driverSchema);