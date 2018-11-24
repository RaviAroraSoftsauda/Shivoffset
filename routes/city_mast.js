const express = require('express');
const router = express.Router();
let country = require('../models/country_mast_schema');
let state = require('../models/state_mast_schema');
let city = require('../models/city_mast_schema');
var query;

// Add Route
router.get('/stateid', function (req, res) {
    if( req.query.id ) {
        state.findById(req.query.id,function(err, state){
            console.log(state);
            res.json({ 'success': true, 'state': state });
        });
        
    }
});
// router.get('/getstateid', function (req, res) {
//     if( req.query.id ) {
//         state.findById(req.query.id, function(err, state){
//             console.log(state);
//             res.json({ 'success': true, 'state': state });
//         });
//     }
// });
router.get('/city_mast', ensureAuthenticated, function(req, res){
    country.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, country){
        state.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, state){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            if (err) {
                console.log(err);
            } else {
                res.render('city_mast.hbs', {
                    pageTitle:'Add City',
                    country: country,
                    state: state,
                    city: city,
                });
            }
        }).populate('countryid').populate('stateid');
    });
});
});
    router.post('/add',function(req, res){
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let cit = new city();
            cit.countryid = req.body.countryid;
            cit.stateid = req.body.stateid;
            cit.city_name = req.body.city_name;
            cit.city_code = req.body.city_code;
            cit.co_code =  req.session.compid;
            cit.div_code =  req.session.divid;
            cit.usrnm =  req.session.user;
            cit.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/city_mast/city_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        city.findById(req.params.id, function(err, city){
            console.log(city);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching city' });
            } else {
                res.json({ 'success': true, 'city': city });
            }
            
        });
    });
        router.post('/edit_city_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let cit = {};
                cit.countryid = req.body.countryid;
                cit.stateid = req.body.stateid;
                cit.city_name = req.body.city_name;
                cit.city_code = req.body.city_code;
                cit.co_code =  req.session.compid;
                cit.div_code =  req.session.divid;
                cit.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                city.update(query ,cit ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving city', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/city_mast/city_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              city.findById(req.params.id, function(err, city){
                city.remove(query, function(err){
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