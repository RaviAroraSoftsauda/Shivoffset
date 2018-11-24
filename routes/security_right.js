const express = require('express');
const router = express.Router(); 
let security = require('../models/security_right_schema');
var query;

// Add Route
router.get('/security_right', ensureAuthenticated, function(req, res){
    security.find({}, function (err, security){
            if (err) {
                console.log(err);
            } else {
                res.render('security_right.hbs', {
                    pageTitle:'Add Security',
                    security: security,
                });
            }
        })
    });
    router.post('/add',function(req, res){
        // console.log(req.body);
        // req.checkBody('group_name','Group Name is required').notEmpty();
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let sec = new security();
            sec.sno = req.body.sno;
            sec.right_name = req.body.right_name;
            sec.right_desc = req.body.right_desc;
            sec.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    // res.json({ 'success': true, 'message': 'Order added succesfully' });
                    res.redirect('/security_right/security_right');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        security.findById(req.params.id, function(err, security){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching security details' });
            } else {
                res.json({ 'success': true, 'security': security });
            }
            
        });
    });
        router.post('/edit_security/:id', function(req, res) {
            // console.log(req,body);
        //    req.checkBody('group_name','Group Name is required').notEmpty();
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let sec = {};
                sec.sno = req.body.sno;
                sec.right_name = req.body.right_name;
                sec.right_desc = req.body.right_desc;
                let query = {_id:req.params.id}
                security.update(query ,sec ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving security', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/security_right/security_right');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              security.findById(req.params.id, function(err, security){
                security.remove(query, function(err){
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