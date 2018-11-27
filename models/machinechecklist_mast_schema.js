let mongoose = require('mongoose');

// Brand Schema
let machinechecklistSchema = mongoose.Schema({
    machinechk_dscrpton: {
        type: String,
    },
    machinechk_code: {
        type: String,
    },
    machinechk_instrcton: {
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
let machinechecklist = module.exports = mongoose.model('machinechecklist_mast', machinechecklistSchema);