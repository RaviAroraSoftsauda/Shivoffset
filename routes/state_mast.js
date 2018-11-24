const express = require('express');
const router = express.Router(); 
let country = require('../models/country_mast_schema');
let state = require('../models/state_mast_schema');
var query;

// Add Route
router.get('/state_mast', ensureAuthenticated, function(req, res){
    state.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, state){
        country.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, country){
            if (err) {
                console.log(err);
            } else {
                res.render('state_mast.hbs', {
                    pageTitle:'Add state',
                    state: state,
                    country: country,
                });
            }
        })
    }).populate('countryid');;
});
    router.post('/add',function(req, res){
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let stste = new state();
            stste.countryid = req.body.countryid;
            stste.state_name = req.body.state_name;
            stste.state_code = req.body.state_code;
            stste.co_code =  req.session.compid;
            stste.div_code =  req.session.divid;
            stste.usrnm =  req.session.user;
            stste.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving state','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/state_mast/state_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        state.findById(req.params.id, function(err, state){
            console.log(state);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching state details' });
            } else {
                res.json({ 'success': true, 'state': state });
            }
            
        });
    });
        router.post('/edit_state_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let stste = {};
                stste.countryid = req.body.countryid;
                stste.state_name = req.body.state_name;
                stste.state_code = req.body.state_code;
                stste.co_code =  req.session.compid;
                stste.div_code =  req.session.divid;
                stste.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                state.update(query ,stste ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving state', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/state_mast/state_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              state.findById(req.params.id, function(err, state){
                state.remove(query, function(err){
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