const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let jobactivty = require('../models/jobactivty_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
var query;

// Add Route
router.get('/jobactivty_mast', ensureAuthenticated, function(req, res){
    jobactivty.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, jobactivty){
        departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            if (err) {
                console.log(err);
            } else {
                res.render('jobactivty_mast.hbs', {
                    pageTitle:'Add jobactivty',
                    jobactivty: jobactivty,
                    departmnt: departmnt,
                });
            }
        })
    }).populate('jobactivty_deprt');
});
    router.post('/add',function(req, res){
        if(req.body.jobactivty_deprt=="") req.body.jobactivty_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let jobact = new jobactivty();
            jobact.jobactivty_deprt = req.body.jobactivty_deprt;
            jobact.jobactivty_actvnm = req.body.jobactivty_actvnm;
            jobact.jobactivty_group = req.body.jobactivty_group;
            jobact.jobactivty_active = req.body.jobactivty_active;
            jobact.co_code =  req.session.compid;
            jobact.div_code =  req.session.divid;
            jobact.usrnm =  req.session.user;
            jobact.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving jobactivty','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/jobactivty_mast/jobactivty_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        jobactivty.findById(req.params.id, function(err, jobactivty){
            console.log(jobactivty);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching jobactivty details' });
            } else {
                res.json({ 'success': true, 'jobactivty': jobactivty });
            }
            
        });
    });
        router.post('/edit_jobactivty_mast/:id', function(req, res) {
            if(req.body.jobactivty_deprt=="") req.body.jobactivty_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let jobact = {};
                jobact.jobactivty_deprt = req.body.jobactivty_deprt;
                jobact.jobactivty_actvnm = req.body.jobactivty_actvnm;
                jobact.jobactivty_group = req.body.jobactivty_group;
                jobact.jobactivty_active = req.body.jobactivty_active;
                jobact.co_code =  req.session.compid;
                jobact.div_code =  req.session.divid;
                jobact.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                jobactivty.update(query ,jobact ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving jobactivty', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/jobactivty_mast/jobactivty_mast');
                    }
                });
            }
        });
        router.get('/delete_jobactivty/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            jobactivty.findById(req.params.id, function(err, jobactivty){
                jobactivty.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/jobactivty_mast/jobactivty_mast');
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