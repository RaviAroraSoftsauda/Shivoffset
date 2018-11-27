let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let qcequimntsSchema = mongoose.Schema({
    qcequimnts_eqname: {
        type: String,
    },
    qcequimnts_calbrton: {
        type: String,
    },
    qcequimnts_calbrtontwo: {
        type: String,
    },
    qcequimnts_days: {
        type: String,
    },
    qcequimnts_year: {
        type: String,
    },
    qcequimnts_deprt: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    qcequimnts_wghtbxcabrton: {
        type: String,
    },
    qcequimnts_chklst: {
        type: Schema.Types.ObjectId, ref: 'machinechecklist_mast',
    },
    qcequimnts_instrcton: {
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
let qcequimnts = module.exports = mongoose.model('qcequimnts_mast', qcequimntsSchema);
