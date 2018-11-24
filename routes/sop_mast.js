const express = require('express');
const router = express.Router(); 
let sop = require('../models/sop_mast_schema');
var query;

// Add Route
router.get('/sop_mast', ensureAuthenticated, function(req, res){
    sop.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, sop){
            if (err) {
                console.log(err);
            } else {
                res.render('sop_mast.hbs', {
                    pageTitle:'Add sop',
                    sop: sop,
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
            let sp = new sop();
            sp.sop_desp = req.body.sop_desp;
            sp.sop_code = req.body.sop_code;
            sp.co_code =  req.session.compid;
            sp.div_code =  req.session.divid;
            sp.usrnm =  req.session.user;
            sp.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving sop','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/sop_mast/sop_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        sop.findById(req.params.id, function(err, sop){
            console.log(sop);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching sop details' });
            } else {
                res.json({ 'success': true, 'sop': sop });
            }
            
        });
    });
        router.post('/edit_sop_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let sp = {};
                sp.sop_desp = req.body.sop_desp;
                sp.sop_code = req.body.sop_code;
                sp.co_code =  req.session.compid;
                sp.div_code =  req.session.divid;
                sp.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                sop.update(query ,sp ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving sop', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/sop_mast/sop_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              sop.findById(req.params.id, function(err, sop){
                sop.remove(query, function(err){
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