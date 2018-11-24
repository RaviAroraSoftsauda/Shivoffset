const express = require('express');
const router = express.Router(); 
let floading = require('../models/floading_mast_schema');
var query;

// Add Route
router.get('/floading_mast', ensureAuthenticated, function(req, res){
    floading.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, floading){
            if (err) {
                console.log(err);
            } else {
                res.render('floading_mast.hbs', {
                    pageTitle:'Add floading',
                    floading: floading,
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
            let flodng = new floading();
            flodng.floading_desp = req.body.floading_desp;
            flodng.floading_code = req.body.floading_code;
            flodng.co_code =  req.session.compid;
            flodng.div_code =  req.session.divid;
            flodng.usrnm =  req.session.user;
            flodng.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving floading','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/floading_mast/floading_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        floading.findById(req.params.id, function(err, floading){
            console.log(floading);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching floading details' });
            } else {
                res.json({ 'success': true, 'floading': floading });
            }
            
        });
    });
        router.post('/edit_floading_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let flodng = {};
                flodng.floading_desp = req.body.floading_desp;
                flodng.floading_code = req.body.floading_code;
                flodng.co_code =  req.session.compid;
                flodng.div_code =  req.session.divid;
                flodng.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                floading.update(query ,flodng ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving floading', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/floading_mast/floading_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              floading.findById(req.params.id, function(err, floading){
                floading.remove(query, function(err){
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