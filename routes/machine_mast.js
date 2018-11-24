const express = require('express');
const router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
let machine = require('../models/machine_mast_schema');
let manufuctur = require('../models/manufactur_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
var query;

// Add Route
router.get('/machine_mast', ensureAuthenticated, function(req, res){
    machine.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machine){
        manufuctur.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, manufuctur){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            if (err) {
                console.log(err);
            } else {
                res.render('machine_mast.hbs', {
                    pageTitle:'Add machine',
                    machine: machine,
                    manufuctur: manufuctur,
                    departmnt: departmnt,
                });
            }
        });
    });
    }).populate('machine_manufctur').populate('machine_deprt');
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/machine')
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
router.post('/add', upload.single('machine_pdf'), (req, res, next) => {
    let errors = req.validationErrors();
    if (errors) {
        if(req.file) {
            let filename = './public/uploads/machine/'+req.file.filename;
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
        res.render('machine_mast.hbs', {
            title: 'Add Offer',
            errors: errors
        });
    } else {
        if (req.fileValidationError) {
            res.render('machine_mast.hbs', {
                title: 'Add Offer',
                errors: req.fileValidationError
            });     
        } else {
            let mchine = new machine();
            mchine.machine_name = req.body.machine_name;
            mchine.machine_code = req.body.machine_code;
            mchine.machine_manufctur = req.body.machine_manufctur;
            mchine.machine_insdt = req.body.machine_insdt;
            mchine.machine_cost = req.body.machine_cost;
            mchine.machine_maintint = req.body.machine_maintint;
            mchine.machine_inscrt = req.body.machine_inscrt;
            // mchine.machine_pdf = req.body.machine_pdf;
            mchine.machine_deprt = req.body.machine_deprt;
            mchine.machine_loction = req.body.machine_loction;
            mchine.co_code =  req.session.compid;
            mchine.div_code =  req.session.divid;
            mchine.usrnm =  req.session.user;
            if(req.file) {
                mchine.filepath = req.file.path;
                mchine.filename = req.file.filename;
            }
            mchine.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Offer Added');
                    res.redirect('/machine_mast/machine_mast');
                }
            });
        }
    }
});
    router.get('/:id', ensureAuthenticated, function(req, res){
        machine.findById(req.params.id, function(err, machine){
            console.log(machine);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching machine details' });
            } else {
                res.json({ 'success': true, 'machine': machine });
            }
            
        });
    });
    router.post('/edit_machine_mast/:id', upload.single('machine_pdf'), function(req, res){
        let errors = req.validationErrors();
        if (errors) {
            if(req.file) {
                let filename = './public/uploads/machine/'+req.file.filename;
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
                let mchine = {};
                mchine.machine_name = req.body.machine_name;
                mchine.machine_code = req.body.machine_code;
                mchine.machine_manufctur = req.body.machine_manufctur;
                mchine.machine_insdt = req.body.machine_insdt;
                mchine.machine_cost = req.body.machine_cost;
                mchine.machine_maintint = req.body.machine_maintint;
                mchine.machine_inscrt = req.body.machine_inscrt;
                mchine.machine_pdf = req.body.machine_pdf;
                mchine.machine_deprt = req.body.machine_deprt;
                mchine.machine_loction = req.body.machine_loction;
                mchine.co_code =  req.session.compid;
                mchine.div_code =  req.session.divid;
                mchine.usrnm =  req.session.user;
                if(req.file) {
                    mchine.filepath = req.file.path;
                    mchine.filename = req.file.filename;
                    let previousFilename = './public/uploads/machine/'+req.body.previousfilename;
                    fs.stat(previousFilename, function (err, stats) {
                        console.log(stats);
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
                machine.update(query ,mchine ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving machine', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/machine_mast/machine_mast');
                    }
                });
            }
        }
    });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              machine.findById(req.params.id, function(err, machine){
                machine.remove(query, function(err){
                    if(err){
                      console.log(err);
                    }
                    res.send('Success');
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