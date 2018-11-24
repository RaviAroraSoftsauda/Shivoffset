const express = require('express');
const router = express.Router();
let blanket = require('../models/blankettyp_mast_schema');
var query;

// Add Route
router.get('/blankettyp_mast', ensureAuthenticated, function(req, res){
    blanket.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, blanket){
            if (err) {
                console.log(err);
            } else {
                res.render('blankettyp_mast.hbs', {
                    pageTitle:'Add Blanket',
                    blanket: blanket,
                });
            }
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
            let blket = new blanket();
            blket.blanket_name = req.body.blanket_name;
            blket.blanketyp_ups = req.body.blanketyp_ups;
            blket.blanket_size = req.body.blanket_size;
            blket.blanket_in = req.body.blanket_in;
            blket.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/blankettyp_mast/blankettyp_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        blanket.findById(req.params.id, function(err, blanket){
            console.log(blanket);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching blanket' });
            } else {
                res.json({ 'success': true, 'blanket': blanket });
            }
            
        });
    });
        router.post('/edit_blanket_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let blket = {};
                blket.blanket_name = req.body.blanket_name;
                blket.blanketyp_ups = req.body.blanketyp_ups;
                blket.blanket_size = req.body.blanket_size;
                blket.blanket_in = req.body.blanket_in;
                let query = {_id:req.params.id}
                blanket.update(query ,blket ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving city', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/blankettyp_mast/blankettyp_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              blanket.findById(req.params.id, function(err, blanket){
                blanket.remove(query, function(err){
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