const express = require('express');
const router = express.Router(); 
let vehiclemaintnce = require('../models/vehiclemaintnce_mast_schema');
var query;

// Add Route
router.get('/vehiclemaintnce_mast', ensureAuthenticated, function(req, res){
    vehiclemaintnce.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vehiclemaintnce){
            if (err) {
                console.log(err);
            } else {
                res.render('vehiclemaintnce_mast.hbs', {
                    pageTitle:'Add vehiclemaintnce',
                    vehiclemaintnce: vehiclemaintnce,
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
            let vechle = new vehiclemaintnce();
            vechle.vehiclemaintnce_name = req.body.vehiclemaintnce_name;
            vechle.vehiclemaintnce_code = req.body.vehiclemaintnce_code;
            vechle.co_code =  req.session.compid;
            vechle.div_code =  req.session.divid;
            vechle.usrnm =  req.session.user;
            vechle.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving vehiclemaintnce','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/vehiclemaintnce_mast/vehiclemaintnce_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        vehiclemaintnce.findById(req.params.id, function(err, vehiclemaintnce){
            console.log(vehiclemaintnce);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching vehiclemaintnce details' });
            } else {
                res.json({ 'success': true, 'vehiclemaintnce': vehiclemaintnce });
            }
            
        });
    });
        router.post('/edit_vehiclemaintnce_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let vechle = {};
                vechle.vehiclemaintnce_name = req.body.vehiclemaintnce_name;
                vechle.vehiclemaintnce_code = req.body.vehiclemaintnce_code;
                vechle.co_code =  req.session.compid;
                vechle.div_code =  req.session.divid;
                vechle.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                vehiclemaintnce.update(query ,vechle ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving vehiclemaintnce', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/vehiclemaintnce_mast/vehiclemaintnce_mast');
                    }
                });
            }
        });
        router.get('/delete_vehiclemaintnce/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            vehiclemaintnce.findById(req.params.id, function(err, vehiclemaintnce){
                vehiclemaintnce.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/vehiclemaintnce_mast/vehiclemaintnce_mast');
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