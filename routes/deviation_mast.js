const express = require('express');
const router = express.Router(); 
let deviation = require('../models/deviation_mast_schema');
var query;

// Add Route
router.get('/deviation_mast', ensureAuthenticated, function(req, res){
    deviation.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, deviation){
            if (err) {
                console.log(err);
            } else {
                res.render('deviation_mast.hbs', {
                    pageTitle:'Add deviation',
                    deviation: deviation,
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
            let dvtion = new deviation();
            dvtion.deviation_name = req.body.deviation_name;
            dvtion.deviation_code = req.body.deviation_code;
            dvtion.co_code =  req.session.compid;
            dvtion.div_code =  req.session.divid;
            dvtion.usrnm =  req.session.user;
            dvtion.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving deviation','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/deviation_mast/deviation_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        deviation.findById(req.params.id, function(err, deviation){
            console.log(deviation);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching deviation details' });
            } else {
                res.json({ 'success': true, 'deviation': deviation });
            }
            
        });
    });
        router.post('/edit_deviation_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let dvtion = {};
                dvtion.deviation_name = req.body.deviation_name;
                dvtion.deviation_code = req.body.deviation_code;
                dvtion.co_code =  req.session.compid;
                dvtion.div_code =  req.session.divid;
                dvtion.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                deviation.update(query ,dvtion ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving deviation', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/deviation_mast/deviation_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              deviation.findById(req.params.id, function(err, deviation){
                deviation.remove(query, function(err){
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