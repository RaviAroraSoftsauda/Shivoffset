let mongoose = require('mongoose');
// Brand Schema
let blanketSchema = mongoose.Schema({
    blanket_name: {
        type: String,
    },
    blanketyp_ups: {
        type: String,
    },
    blanket_size: {
        type: String,
    },
    blanket_in: {
        type: String,
    }
});
let blanket = module.exports = mongoose.model('blanket_mast', blanketSchema);