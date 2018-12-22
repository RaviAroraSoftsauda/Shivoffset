let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let jobentrySchema = mongoose.Schema({
    jobprcss_entryno: {
        type: Number,
    },
    entry1id:
    {
        type: Schema.Types.ObjectId, ref: 'jobprocess_entry1',
    },
    jobprcss_date: {
        type: String,
    },
    jobprocess_group: {
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
let jobentry = module.exports = mongoose.model('jobprocess_entry2', jobentrySchema);
