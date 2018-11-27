const express = require('express');
const router = express.Router(); 
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
let party = require('../models/party_mast_schema');
let party_type = require('../models/party_type_mast_schema');
let city = require('../models/city_mast_schema');
let product = require('../models/product_type_schema');
var query;
router.get('/prdttypname', function (req, res) {
    product.find({}, function(err, product){
        res.json({ 'success': true, 'product': product});
    });
});
// Add Route
router.get('/party_mast', ensureAuthenticated, function(req, res){
    party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
        city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            party_type.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party_type){
            product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
            if (err) {
                console.log(err);
            } else {
                res.render('party_mast.hbs', {
                    pageTitle:'Add party',
                    party: party,
                    city: city,
                    product: product,
                    party_type: party_type,
                });
            }
        })
    });
});
}).populate('part_city').populate('party_prttyp');
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/party')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.pdf') {
            req.fileValidationError = "Forbidden extension";
            return callback(null, false, req.fileValidationError);
        }
        callback(null, true)
    },
    limits:{
        fileSize: 420 * 150 * 200
    }
});
router.post('/add', upload.single('party_scandoc'), (req, res, next) => {
    if(req.body.part_city=="Select City") req.body.part_city=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.party_prttyp=="") req.body.party_prttyp=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if (errors) {
        if(req.file) {
            let filename = './public/uploads/party/'+req.file.filename;
            console.log(filename);
            fs.stat(filename, function (err, stats) {
                console.log(stats);//here we got all information of file in stats variable
            
                if (err) {
                    return console.error(err);
                }
                fs.unlink(filename,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });  
            });
        }
        res.render('party_mast.hbs', {
            title: 'Add party',
            errors: errors
        });
    } else {
        if (req.fileValidationError) {
            res.render('party_mast.hbs', {
                title: 'Add prty',
                errors: req.fileValidationError
            });     
        } else {
            let prty = new party();
            prty.party_code = req.body.party_code;
            prty.party_name = req.body.party_name;
            prty.party_addrss1 = req.body.party_addrss1;
            prty.party_addrss2 = req.body.party_addrss2;
            prty.part_city = req.body.part_city;
            prty.party_mobno = req.body.party_mobno;
            prty.party_contprsn = req.body.party_contprsn;
            prty.partysndcrd = req.body.partysndcrd;
            prty.partylckcrd = req.body.partylckcrd;
            prty.partyapproval = req.body.partyapproval;
            prty.party_prttyp = req.body.party_prttyp;
            prty.tolrance_group = req.body.tolrance_group;
            prty.tole_group = req.body.tole_group;
            prty.party_fixsheet = req.body.party_fixsheet;
            prty.co_code =  req.session.compid;
            prty.div_code =  req.session.divid;
            prty.usrnm =  req.session.user;
            if(req.file) {
                prty.filepath = req.file.path;
                prty.filename = req.file.filename;
            }
            prty.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Offer Added');
                    res.redirect('/party_mast/party_mast');
                }
            });
        }
    }
});
    router.get('/:id', ensureAuthenticated, function(req, res){
        party.findById(req.params.id, function(err, party){
            product.find({}, function(err, product){
            console.log(party);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching party details' });
            } else {
                res.json({ 'success': true, 'party': party,'product': product  });
            }
            
        });
    });
});
    router.post('/edit_party_mast/:id', upload.single('party_scandoc'), function(req, res){
        if(req.body.part_city=="Select City") req.body.part_city=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.party_prttyp=="") req.body.party_prttyp=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if (errors) {
            if(req.file) {
                let filename = './public/uploads/party/'+req.file.filename;
                fs.stat(filename, function (err, stats) {
                    console.log(stats);
                    if (err) {
                        return console.error(err);
                    }
                    fs.unlink(filename,function(err){
                        if(err) return console.log(err);
                        console.log('file deleted successfully');
                    });  
                });
            }
            res.json({ 'success': false, 'message': 'Validation error', errors: errors });
        } else {
            if (req.fileValidationError) {
                res.json({ 'success': false, 'message': 'File Validation error', errors: req.fileValidationError });    
            } else {
                let prty = {};
                prty.party_code = req.body.party_code;
                prty.party_name = req.body.party_name;
                prty.party_addrss1 = req.body.party_addrss1;
                prty.party_addrss2 = req.body.party_addrss2;
                prty.part_city = req.body.part_city;
                prty.party_mobno = req.body.party_mobno;
                prty.party_contprsn = req.body.party_contprsn;
                prty.partysndcrd = req.body.partysndcrd;
                prty.partylckcrd = req.body.partylckcrd;
                prty.partyapproval = req.body.partyapproval;
                prty.party_prttyp = req.body.party_prttyp;
                prty.tolrance_group = req.body.tolrance_group;
                prty.tole_group = req.body.tole_group;
                prty.party_fixsheet = req.body.party_fixsheet;
                prty.co_code =  req.session.compid;
                prty.div_code =  req.session.divid;
                prty.usrnm =  req.session.user;
                if(req.file) {
                    prty.filepath = req.file.path;
                    prty.filename = req.file.filename;
                    let previousFilename = './public/uploads/party/'+req.body.previousfilename;
                    fs.stat(previousFilename, function (err, stats) {
                        if (err) {
                            return console.error(err);
                        }
                        fs.unlink(previousFilename,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                        });  
                    });
                }
                let query = {_id:req.params.id}
                party.update(query ,prty ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving party', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/party_mast/party_mast');
                    }
                });
            }
        }
    });
    router.get('/delete_party/:id', function(req, res){
        if(!req.user.id)
        {
            res.status(500).send();
        }
        let query = {_id:req.param.id}
        party.findById(req.params.id, function(err, party){
            party.remove(query,function(err){
                if(err)
                {
                    console.log(err);
                }
                res.redirect('/party_mast/party_mast');
            });
        });
    });
        
// Access Control 
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/userright/login');
    }
}

module.exports = router;