let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let destructionSchema = mongoose.Schema({
    ref_no: {
        type: String,
    },
    c_j_s_p: {
       type:String,
    },
    dc_date: {
       type:String,
    },
    stage: {
       type:String,
    },
    deprtment: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    destruction_note_entry: {
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
let destruction = module.exports = mongoose.model('destruction_note_entry', destructionSchema);
