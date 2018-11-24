let mongoose = require('mongoose');

// Brand Schema
let vehicleSchema = mongoose.Schema({
    vehicle_no: {
        type: String,
    },
    vehicle_cmpnymakr: {
        type: String,
    },
    vehicle_mdlno: {
        type: String,
    },
    vehicle_orarrchd: {
        type: String,
    },
    vehicle_nofaxels: {
        type: String,
    },
    vehicle_rtopssing: {
        type: String,
    },
    vehicle_chisno: {
        type: String,
    },
    vehicle_engno: {
        type: String,
    },
    vehicle_expwin: {
        type: String,
    },
    vehicle_active: {
        type: String,
    },
    vehicle_lockdt: {
        type: String,
    },
    vehicle_mfgdt: {
        type: String,
    },
    vehicle_othrinfo: {
        type: String,
    },
    vehicle_onwrnm: {
        type: String,
    },
    vehicle_pylod: {
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
let vehicle = module.exports = mongoose.model('vehicle_mast', vehicleSchema);


