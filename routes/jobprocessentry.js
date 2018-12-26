const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let departmnt = require('../models/departmnt_mast_schema');
let jobactivty = require('../models/jobactivty_mast_schema');
let jobact = require('../models/jobactivty_mast_schema');
let depart = require('../models/departmnt_mast_schema');
let party = require('../models/party_mast_schema');
let jobprocess = require('../models/jobprocessentry_mast_schema');
let jobprocess2 = require('../models/jobprocessentry2_mast_schema');
let newjobentry = require('../models/newjobentry_mast_schema');
let product = require('../models/product_mast_schema');
var query;
// Add Route
router.post('/activityname', function (req, res) {
    var deprt = req.body.deprt;
        jobactivty.find({jobactivty_deprt:deprt,co_code:req.session.compid,div_code:req.session.divid}, function(err, jobactivty ){
            console.log(jobactivty);
            res.json({ 'success': true, 'jobactivty': jobactivty});
        });
});
router.post('/productname', function(req, res) {
    var newjobno = req.body.newjobno;
    newjobentry.find({newjb_jbcrd:newjobno,co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {  
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'newjobentry': newjobentry});
        }
    }).populate('productid')
}); 
router.get('/activigroup', function (req, res) {
    if( req.query.id ) {
        jobactivty.findById(req.query.id, function(err, jobactivtyname ){
            res.json({ 'success': true, 'jobactivtyname': jobactivtyname});
        });
    }
});
router.get('/jobprocessentry', ensureAuthenticated, function(req, res){
    jobactivty.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, jobactivty){
        jobprocess.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, jobprocess){
    departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
        party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            if (err) {
                console.log(err);
            } else {
                res.render('jobprocessentry.hbs', {
                    pageTitle:'New Job Entry',
                    departmnt: departmnt,
                    party: party,
                    jobactivty: jobactivty,
                    jobprocess: jobprocess,
                });
            }
        })
    })
    }).sort('-jobprcss_entryno');
}).populate('jobactivty_deprt');
});
router.post('/add',function(req, res){
    if(req.body.jobprcss_deprt=="") req.body.jobprcss_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if(errors)
    {
        console.log(errors);
    }
    else
    {
        let job = new jobprocess();
        job.jobprcss_entryno = req.body.jobprcss_entryno;
        job.jobprcss_date = req.body.jobprcss_date;
        job.jobprcss_deprt = req.body.jobprcss_deprt;
        job.newjb_jbcrd =req.body.newjb_jbcrd;
        job.jobprcss_itemcode =req.body.jobprcss_itemcode;
        job.jobprcss_productname =req.body.jobprcss_productname;
        job.jobprcss_activity = req.body.jobprcss_activity;
        job.co_code =  req.session.compid;
        job.div_code =  req.session.divid;
        job.usrnm =  req.session.user;

        let entry2 = new jobprocess2();
        entry2.entry1id =job._id;
        entry2.jobprcss_entryno = req.body.jobprcss_entryno;
        entry2.jobprocess_group = req.body.jobprocess_group;
        entry2.co_code =  req.session.compid;
        entry2.div_code =  req.session.divid;
        entry2.usrnm =  req.session.user;
        entry2.masterid=req.session.masterid;
        entry2.save();
        job.entry2id = entry2._id;

        job.save(function (err){
            if(err)
            {
                res.json({'success':false,'message':'error in saving job','errors':err});
                return;
            }
            else
            {
                res.redirect('/jobprocessentry/jobprocessentry_list');
            }
        });
    }
});
router.get('/jobprocessentry_list', ensureAuthenticated, function(req, res){
    jobprocess.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, jobprocess){
    if (err) {
        console.log(err);
    } else {
        res.render('jobprocessentry_list.hbs', {
            pageTitle:'Job Process Entry List',
            jobprocess: jobprocess,
        });
    }
}).populate('jobprcss_activity').populate('jobprcss_deprt');
});
// 
router.get('/jobprocessentry_update/:id', ensureAuthenticated, function(req, res){
    jobactivty.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, jobactivty){
        jobprocess.findById(req.params.id, function(err, jobprocess){
    departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
        party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            if (err) {
                console.log(err);
            } else {
                res.render('jobprocessentry_update.hbs', {
                    pageTitle:'Update Job Process',
                    departmnt: departmnt,
                    party: party,
                    jobactivty: jobactivty,
                    jobprocess: jobprocess,
                    jobact: jobact,
                });
            }
        })
    })
}).populate('entry2id');
}).populate('jobactivty_deprt');
});
router.post('/update/:id', function(req, res) {
    if(req.body.jobprcss_deprt=="") req.body.jobprcss_deprt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
    } else {
        let job = {};
        //entry1
        job.jobprcss_entryno = req.body.jobprcss_entryno;
        job.jobprcss_date = req.body.jobprcss_date;
        job.jobprcss_deprt = req.body.jobprcss_deprt;
        job.jobprcss_activity = req.body.jobprcss_activity;
        job.newjb_jbcrd =req.body.newjb_jbcrd;
        job.jobprcss_itemcode =req.body.jobprcss_itemcode;
        job.jobprcss_productname =req.body.jobprcss_productname;
        job.co_code =  req.session.compid;
        job.div_code =  req.session.divid;
        job.usrnm =  req.session.user;
        //entry2
        let entry2 = {};
        entry2.jobprcss_entryno = req.body.jobprcss_entryno;
        entry2.jobprocess_group = req.body.jobprocess_group;
        entry2.co_code =  req.session.compid;
        entry2.div_code =  req.session.divid;
        entry2.usrnm =  req.session.user;
        entry2.masterid=req.session.masterid;
        let que = {jobprcss_entryno:req.body.jobprcss_entryno,co_code:req.session.compid,div_code:req.session.divid,usrnm:req.session.user};
              jobprocess2.update(que ,entry2 ,function (err) {
                  if (err) {
                      res.json({ 'success': false, 'message': 'Error in Saving contract', 'errors': err });
                      return;
                  } 
              });
        let query = {_id:req.params.id}
        jobprocess.update(query ,job ,function (err) {
            if (err) {
                res.json({ 'success': false, 'message': 'Error in Saving jobprocess', 'errors': err });
                return;
            } else {;
                res.redirect('/jobprocessentry/jobprocessentry_list');
            }
        });
    }
});
router.get('/delete_jobprocessentry/', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let q = {jobprcss_entryno:req.query.entryno,co_code:req.session.compid,div_code:req.session.divid,usrnm:req.session.user};
               
            jobprocess2.remove(q,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });
            let query = {_id:req.query.id}
            jobprocess.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/jobprocessentry/jobprocessentry_list');
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