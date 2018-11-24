let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let employeeSchema = mongoose.Schema({
    employee_name: {
        type: String,
    },
    employee_deprt: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    employee_desigaton: {
        type: String,
    },
    employee_active: {
        type: String,
    },
    employee_sop: {
        type: Schema.Types.ObjectId, ref: 'sop_mast',
    },
    filepath: {
        type: String,
        trim: true
    },
    filename: {
        type: String
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
let  employee = module.exports = mongoose.model('employee_mast', employeeSchema);
