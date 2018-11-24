let mongoose = require('mongoose');

// company Schema
let divisionSchema = mongoose.Schema({
    div_mast: {
        type: String,
    },
    div_code: {
        type: String,
    },
    com_code: {
        type: String,
    },
});

module.exports = mongoose.model('div_mast', divisionSchema);