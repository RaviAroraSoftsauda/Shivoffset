let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let machineSchema = mongoose.Schema({
    machine_name: {
        type: String,
    },
    machine_code: {
        type: String,
    },
    machine_code: {
        type: String,
    },
    machine_manufctur: {
        type: Schema.Types.ObjectId, ref: 'manufactur_mast',
    },
    machine_insdt: {
        type: String,
    },
    machine_cost: {
        type: String,
    },
    machine_maintint: {
        type: String,
    },
    machine_inscrt: {
        type: String,
    },
    filepath: {
        type: String,
        trim: true
    },
    filename: {
        type: String
    },
    machine_deprt: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    machine_loction: {
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
let machine = module.exports = mongoose.model('machine_mast', machineSchema);