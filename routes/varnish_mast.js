const express = require('express');
const router = express.Router(); 
let vernish = require('../models/varnish_mast_schema');
var query;

// Add Route
router.get('/varnish_mast', ensureAuthenticated, function(req, res){
    vernish.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vernish){
            if (err) {
                console.log(err);
            } else {
                res.render('varnish_mast.hbs', {
                    pageTitle:'Add vernish',
                    vernish: vernish,
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
            let vrnish = new vernish();
            vrnish.vernish_name = req.body.vernish_name;
            vrnish.vernis_code = req.body.vernis_code;
            vrnish.co_code =  req.session.compid;
            vrnish.div_code =  req.session.divid;
            vrnish.usrnm =  req.session.user;
            vrnish.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving vernish','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/varnish_mast/varnish_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        vernish.findById(req.params.id, function(err, vernish){
            console.log(vernish);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching vernish details' });
            } else {
                res.json({ 'success': true, 'vernish': vernish });
            }
            
        });
    });
        router.post('/edit_varnish_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let vrnish = {};
                vrnish.vernish_name = req.body.vernish_name;
                vrnish.vernis_code = req.body.vernis_code;
                vrnish.co_code =  req.session.compid;
                vrnish.div_code =  req.session.divid;
                vrnish.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                vernish.update(query ,vrnish ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving vernish', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/varnish_mast/varnish_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              vernish.findById(req.params.id, function(err, vernish){
                vernish.remove(query, function(err){
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