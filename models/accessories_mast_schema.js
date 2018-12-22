let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let accessoriesSchema = mongoose.Schema({
    accestyp_name: {
        type: Schema.Types.ObjectId, ref: 'accessriestyp_mast',
    },
    accessubtyp_name: {
        type: Schema.Types.ObjectId, ref: 'accessubtyp_mast',
    },
    accessories_desc: {
        type: String,
    },
    manufactur_name: {
        type: Schema.Types.ObjectId, ref: 'manufactur_mast',
    },
    machine_name: {
        type: Schema.Types.ObjectId, ref: 'machine_mast',
    },
    accessoriesmin_stk: {
        type: Number,
    },
    accessories_gsm: {
        type: Number,
    },
    accessories_maxstk: {
        type: Number,
    },
    accessories_sku:
    {
        type: String,
    },
    accessoriesqty_pen: {
        type: String,
    },
    flag:{
        type: String,
    },
    ////stock item
    stockpantone_rcpno: {
        type: Number,
    },
    stockpantone_board: {
        type: Schema.Types.ObjectId, ref: 'accessories_mast',
    },
    stockpantone_pantonno: {
        type: Schema.Types.ObjectId, ref: 'pantone_mast',
    },
    stockpantone_barcode: {
        type: String,
    },
    stock_item: {
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
let accessories = module.exports = mongoose.model('accessories_mast', accessoriesSchema);
