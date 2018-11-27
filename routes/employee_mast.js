const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
let employee = require('../models/employee_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let sop = require('../models/sop_mast_schema');
var query;

// Add Route
router.get('/employee_mast', ensureAuthenticated, function(req, res){
    employee.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, employee){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
                sop.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, sop){
            if (err) {
                console.log(err);
            } else {
                res.render('employee_mast.hbs', {
                    pageTitle:'Add employee',
                    employee: employee,
                    departmnt: departmnt,
                    sop: sop,
                });
            }
        });
    });
    }).populate('employee_deprt').populate('employee_sop');
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/employee')
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
router.post('/add', upload.single('training_crtifcte'), (req, res, next) => {
    if(req.body.employee_deprt=="") req.body.employee_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.employee_sop=="") req.body.employee_sop=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if (errors) {
        if(req.file) {
            let filename = './public/uploads/employee/'+req.file.filename;
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
        res.render('employee_mast.hbs', {
            title: 'Add Offer',
            errors: errors
        });
    } else {
        if (req.fileValidationError) {
            res.render('employee_mast.hbs', {
                title: 'Add Offer',
                errors: req.fileValidationError
            });     
        } else {
            let eply = new employee();
            eply.employee_name = req.body.employee_name;
            eply.employee_deprt = req.body.employee_deprt;
            eply.employee_desigaton = req.body.employee_desigaton;
            eply.employee_active = req.body.employee_active;
            eply.employee_sop = req.body.employee_sop;
            eply.co_code =  req.session.compid;
            eply.div_code =  req.session.divid;
            eply.usrnm =  req.session.user;
            if(req.file) {
                eply.filepath = req.file.path;
                eply.filename = req.file.filename;
            }
            eply.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Offer Added');
                    res.redirect('/employee_mast/employee_mast');
                }
            });
        }
    }
});
    router.get('/:id', ensureAuthenticated, function(req, res){
        employee.findById(req.params.id, function(err, employee){
            console.log(employee);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching employee details' });
            } else {
                res.json({ 'success': true, 'employee': employee });
            }
            
        });
    });
    router.post('/edit_employee_mast/:id', upload.single('training_crtifcte'), function(req, res){
        if(req.body.employee_deprt=="") req.body.employee_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.employee_sop=="") req.body.employee_sop=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if (errors) {
            if(req.file) {
                let filename = './public/uploads/employee/'+req.file.filename;
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
                let eply = {};
                eply.employee_name = req.body.employee_name;
                eply.employee_deprt = req.body.employee_deprt;
                eply.employee_desigaton = req.body.employee_desigaton;
                eply.employee_active = req.body.employee_active;
                eply.employee_sop = req.body.employee_sop;
                eply.co_code =  req.session.compid;
                eply.div_code =  req.session.divid;
                eply.usrnm =  req.session.user;
                if(req.file) {
                    eply.filepath = req.file.path;
                    eply.filename = req.file.filename;
                    let previousFilename = './public/uploads/employee/'+req.body.previousfilename;
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
                employee.update(query ,eply ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving employee', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/employee_mast/employee_mast');
                    }
                });
            }
        }
    });
    router.get('/delete_employee/:id', function(req, res){
        if(!req.user.id)
        {
            res.status(500).send();
        }
        let query = {_id:req.param.id}
        employee.findById(req.params.id, function(err, employee){
            employee.remove(query,function(err){
                if(err)
                {
                    console.log(err);
                }
                res.redirect('/employee_mast/employee_mast');
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