let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let inkpreparationSchema = mongoose.Schema({
    ref_no: {
        type: Number,
    },
    ink_date: {
        type: String,
    },
    ink_employeename: {
        type: Schema.Types.ObjectId, ref: 'employee_mast',
    },
    ink_preparation:
    {
        type:Array,
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
let ink_preparation = module.exports = mongoose.model('ink_preparation', inkpreparationSchema);
