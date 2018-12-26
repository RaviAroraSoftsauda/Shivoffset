let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let newjobentrySchema = mongoose.Schema({
    productid: {
        type: Schema.Types.ObjectId, ref: 'product_mast',
    },
    newjb_itemcd: {
        
        type:String,
    },
    newjb_dlvat: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
    },
    newjb_jbcrd: {
        type:String,
    },
    newjb_jbcrdno:
    {
        type:Number,
    },
    newjb_pono: {
        type:String,
    },
    newjobdate: {
        type:Array,
    },
    newjb_podt: {
        type:String,
    },
    newjb_prtynm: {
        type: Schema.Types.ObjectId, ref: 'party_mast',
    },
    newjb_lmiton: {
        type:String,
    },
    newjb_vernish: {
        type: Schema.Types.ObjectId, ref: 'vernish_mast',
    },
    newjb_gsm: {
        type:String,
    },
    newjb_matril: {
        type: Schema.Types.ObjectId, ref: 'accessories_mast',
    },
    newjb_cutsz: {
        type:String,
    },
    newjb_pichng: {
        type:String,
    },
    newjb_actulsz: {
        type:String,
    },
    newjb_vrnshuv: {
        type:String,
    },
    newjb_folfltszl: {
        type:String,
    },
    newjb_folfltszw: {
        type:String,
    },
    newjb_folfltszh: {
        type:String,
    },
    newjb_folft: {
        type: Schema.Types.ObjectId, ref: 'indsrttyp_mast',
    },
    newjb_ups: {
        type:String,
    },
    newjb_remks: {
        type:String,
    },
    newjb_stckhnd: {
        type:String,
    },
    newjb_dsignstyl: {
        type: Schema.Types.ObjectId, ref: 'design_mast',
    },
    newjb_locton: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
    },
    newjb_sndshdcrd: {
        type:String,
    },
    newjb_tp: {
        type:String,
    },
    newjb_chng: {
        type:String,
    },
    newjb_nwjb: {
        type:String,
    },
    newjb_rupes: {
        type:String,
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
let job_entry = module.exports = mongoose.model('job_entry', newjobentrySchema);
