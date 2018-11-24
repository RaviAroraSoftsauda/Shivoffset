const express = require('express');
const router = express.Router(); 
let rackloc = require('../models/rackloc_mast_schema');
var query;

// Add Route
router.get('/rackloc_mast', ensureAuthenticated, function(req, res){
    rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
            if (err) {
                console.log(err);
            } else {
                res.render('rackloc_mast.hbs', {
                    pageTitle:'Add rackloc',
                    rackloc: rackloc,
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
            let rck = new rackloc();
            rck.rackloc_name= req.body.rackloc_name;
            rck.rackloc_rckno= req.body.rackloc_rckno;
            rck.rackloc_rowno= req.body.rackloc_rowno;
            rck.rackloc_qtycpcaty= req.body.rackloc_qtycpcaty;
            rck.rackloc_remark= req.body.rackloc_remark;
            rck.rackloc_supress= req.body.rackloc_supress;
            rck.rackloc_stock= req.body.rackloc_stock;
            rck.rackloc_distroy= req.body.rackloc_distroy;
            rck.co_code =  req.session.compid;
            rck.div_code =  req.session.divid;
            rck.usrnm =  req.session.user;
            rck.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving rackloc','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/rackloc_mast/rackloc_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        rackloc.findById(req.params.id, function(err, rackloc){
            console.log(rackloc);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching rackloc details' });
            } else {
                res.json({ 'success': true, 'rackloc': rackloc });
            }
            
        });
    });
        router.post('/edit_rackloc_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let rck = {};
                rck.rackloc_name= req.body.rackloc_name;
                rck.rackloc_rckno= req.body.rackloc_rckno;
                rck.rackloc_rowno= req.body.rackloc_rowno;
                rck.rackloc_qtycpcaty= req.body.rackloc_qtycpcaty;
                rck.rackloc_remark= req.body.rackloc_remark;
                rck.rackloc_supress= req.body.rackloc_supress;
                rck.rackloc_stock= req.body.rackloc_stock;
                rck.rackloc_distroy= req.body.rackloc_distroy;
                rck.co_code =  req.session.compid;
                rck.div_code =  req.session.divid;
                rck.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                rackloc.update(query ,rck ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving rackloc', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/rackloc_mast/rackloc_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              rackloc.findById(req.params.id, function(err, rackloc){
                rackloc.remove(query, function(err){
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