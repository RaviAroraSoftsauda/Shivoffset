let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let accessoriesrecepitSchema = mongoose.Schema({
    ref_no: {
        type: Number,
    },
    main_bk: {
        type: String,
    },
    c_j_s_p: {
        type: String,
    },
    acc_date: {
        type: String,
    },
    acc_suppliername: {
        type: Schema.Types.ObjectId, ref: 'supplier_mast',
    },
    acc_department: {
        type: Schema.Types.ObjectId, ref: 'departmnt_mast',
    },
    acc_invoice: {
        type: String,
    },
    acc_supdt: {
        type: String,
    },
    acc_note_item: {
        type: Array,
    },
    acc_totalqty: {
        type: Number,
    },
    ////plate issuance note
    from_ltcon: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
    },
    to_ltcon: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
    },
    p_i_n: {
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
let accessories_recepit = module.exports = mongoose.model('accessories_recepit_note', accessoriesrecepitSchema);
