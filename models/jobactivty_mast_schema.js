let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let jobactivtySchema = mongoose.Schema({
    jobactivty_deprt: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    jobactivty_actvnm: {
        type: String,
    },
    jobactivty_group: {
        type: Array,
    },
    jobactivty_active: {
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
let jobactivty = module.exports = mongoose.model('jobactivty_mast', jobactivtySchema);
