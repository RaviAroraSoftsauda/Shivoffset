const express = require('express');
const router = express.Router(); 
let country = require('../models/country_mast_schema');
var query;

// Add Route
router.get('/country_mast', ensureAuthenticated, function(req, res){
    country.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, country){
            if (err) {
                console.log(err);
            } else {
                res.render('country_mast.hbs', {
                    pageTitle:'Add country',
                    country: country,
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
            let cntry = new country();
            cntry.country_name = req.body.country_name;
            cntry.country_code = req.body.country_code;
            cntry.co_code =  req.session.compid;
            cntry.div_code =  req.session.divid;
            cntry.usrnm =  req.session.user;
            cntry.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving country','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/country_mast/country_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        country.findById(req.params.id, function(err, country){
            console.log(country);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching country details' });
            } else {
                res.json({ 'success': true, 'country': country });
            }
            
        });
    });
        router.post('/edit_country_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let cntry = {};
                cntry.country_name = req.body.country_name;
                cntry.country_code = req.body.country_code;
                cntry.co_code =  req.session.compid;
                cntry.div_code =  req.session.divid;
                cntry.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                country.update(query ,cntry ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving country', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/country_mast/country_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              country.findById(req.params.id, function(err, country){
                country.remove(query, function(err){
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