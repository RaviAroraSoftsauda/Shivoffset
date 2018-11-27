const express = require('express');
const router = express.Router(); 
let complaint = require('../models/complaint_mast_schema');
var query;

// Add Route
router.get('/complaint_mast', ensureAuthenticated, function(req, res){
    complaint.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, complaint){
            if (err) {
                console.log(err);
            } else {
                res.render('complaint_mast.hbs', {
                    pageTitle:'Add complaint',
                    complaint: complaint,
                });
            }
        })
    });
    router.post('/add',function(req, res){
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let cmplnt = new complaint();
            cmplnt.complaint_name = req.body.complaint_name;
            cmplnt.complaint_code = req.body.complaint_code;
            cmplnt.co_code =  req.session.compid;
            cmplnt.div_code =  req.session.divid;
            cmplnt.usrnm =  req.session.user;
            cmplnt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving complaint','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/complaint_mast/complaint_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        complaint.findById(req.params.id, function(err, complaint){
            console.log(complaint);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching complaint details' });
            } else {
                res.json({ 'success': true, 'complaint': complaint });
            }
            
        });
    });
        router.post('/edit_complaint_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let cmplnt = {};
                cmplnt.complaint_name = req.body.complaint_name;
                cmplnt.complaint_code = req.body.complaint_code;
                cmplnt.co_code =  req.session.compid;
                cmplnt.div_code =  req.session.divid;
                cmplnt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                complaint.update(query ,cmplnt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving complaint', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/complaint_mast/complaint_mast');
                    }
                });
            }
        });
        router.get('/delete_complaint/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            complaint.findById(req.params.id, function(err, complaint){
                complaint.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/complaint_mast/complaint_mast');
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