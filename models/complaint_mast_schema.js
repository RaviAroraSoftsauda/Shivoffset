let mongoose = require('mongoose');

// Brand Schema
let complaintSchema = mongoose.Schema({
    complaint_name: {
        type: String,
    },
    complaint_code: {
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
let complaint = module.exports = mongoose.model('complaint_mast', complaintSchema);