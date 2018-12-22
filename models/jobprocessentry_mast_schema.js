let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let jobactivtySchema = mongoose.Schema({
    jobprcss_entryno: {
        type: Number,
        // type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    newjb_jbcrd: {
        type: String,
    },
    jobprcss_itemcode: {
        type: String,
    },
    jobprcss_productname: {
        type: String,
    },
    entry2id:
    {
        type: Schema.Types.ObjectId, ref: 'jobprocess_entry2',
    },
    jobprcss_date: {
        type: String,
    },
    jobprcss_deprt: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    jobprcss_activity: {
        type: Schema.Types.ObjectId, ref: 'jobactivty_mast',
    },
    // jobprocess_group: {
    //     type: Array,
    // },
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
let jobactivty = module.exports = mongoose.model('jobprocess_entry1', jobactivtySchema);
