const express = require('express');
const router = express.Router(); 
let trnsportagncy = require('../models/trnsportagncy_mast_schema');
var query;

// Add Route
router.get('/trnsportagncy_mast', ensureAuthenticated, function(req, res){
    trnsportagncy.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, trnsportagncy){
            if (err) {
                console.log(err);
            } else {
                res.render('trnsportagncy_mast.hbs', {
                    pageTitle:'Add trnsportagncy',
                    trnsportagncy: trnsportagncy,
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
            let trnnsprt = new trnsportagncy();
            trnnsprt.trnsportagncy_name = req.body.trnsportagncy_name;
            trnnsprt.trnsportagncy_code = req.body.trnsportagncy_code;
            trnnsprt.co_code =  req.session.compid;
            trnnsprt.div_code =  req.session.divid;
            trnnsprt.usrnm =  req.session.user;
            trnnsprt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving trnsportagncy','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/trnsportagncy_mast/trnsportagncy_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        trnsportagncy.findById(req.params.id, function(err, trnsportagncy){
            console.log(trnsportagncy);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching trnsportagncy details' });
            } else {
                res.json({ 'success': true, 'trnsportagncy': trnsportagncy });
            }
            
        });
    });
        router.post('/edit_trnsportagncy_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let trnnsprt = {};
                trnnsprt.trnsportagncy_name = req.body.trnsportagncy_name;
                trnnsprt.trnsportagncy_code = req.body.trnsportagncy_code;
                trnnsprt.co_code =  req.session.compid;
                trnnsprt.div_code =  req.session.divid;
                trnnsprt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                trnsportagncy.update(query ,trnnsprt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving trnsportagncy', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/trnsportagncy_mast/trnsportagncy_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              trnsportagncy.findById(req.params.id, function(err, trnsportagncy){
                trnsportagncy.remove(query, function(err){
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