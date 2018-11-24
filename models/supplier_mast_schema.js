let mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Brand Schema
let supplierSchema = mongoose.Schema({
    supplier_name: {
        type: String,
    },
    supplier_addrss1: {
        type: String,
    },
    supplier_addrss2: {
        type: String,
    },
    supplier_city: {
        type: Schema.Types.ObjectId, ref: 'city_mast',
    },
    supplier_mobno: {
        type: String,
    },
    supplier_gstin: {
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
let supplier = module.exports = mongoose.model('supplier_mast', supplierSchema);