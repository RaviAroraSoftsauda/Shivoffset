const express = require('express');
const router = express.Router(); 
let maintance = require('../models/maintance_mast_schema');
var query;

// Add Route
router.get('/maintance_mast', ensureAuthenticated, function(req, res){
    maintance.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, maintance){
            if (err) {
                console.log(err);
            } else {
                res.render('maintance_mast.hbs', {
                    pageTitle:'Add maintance',
                    maintance: maintance,
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
            let mntnce = new maintance();
            mntnce.maintance_name = req.body.maintance_name;
            mntnce.maintance_address = req.body.maintance_address;
            mntnce.maintance_typ = req.body.maintance_typ;
            mntnce.co_code =  req.session.compid;
            mntnce.div_code =  req.session.divid;
            mntnce.usrnm =  req.session.user;
            mntnce.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving maintance','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/maintance_mast/maintance_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        maintance.findById(req.params.id, function(err, maintance){
            console.log(maintance);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching maintance details' });
            } else {
                res.json({ 'success': true, 'maintance': maintance });
            }
            
        });
    });
        router.post('/edit_maintance_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let mntnce = {};
                mntnce.maintance_name = req.body.maintance_name;
                mntnce.maintance_address = req.body.maintance_address;
                mntnce.maintance_typ = req.body.maintance_typ;
                mntnce.co_code =  req.session.compid;
                mntnce.div_code =  req.session.divid;
                mntnce.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                maintance.update(query ,mntnce ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving maintance', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/maintance_mast/maintance_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              maintance.findById(req.params.id, function(err, maintance){
                maintance.remove(query, function(err){
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