const express = require('express');
const router = express.Router(); 
let accessriestyp = require('../models/accessriestyp_mast_schema');
var query;

// Add Route
router.get('/accessriestyp_mast', ensureAuthenticated, function(req, res){
    accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
            if (err) {
                console.log(err);
            } else {
                res.render('accessriestyp_mast.hbs', {
                    pageTitle:'Add accessriestyp',
                    accessriestyp: accessriestyp,
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
            let accstyp = new accessriestyp();
            accstyp.accessriestyp_name = req.body.accessriestyp_name;
            accstyp.accessriestyp_code = req.body.accessriestyp_code;
            accstyp.co_code =  req.session.compid;
            accstyp.div_code =  req.session.divid;
            accstyp.usrnm =  req.session.user;
            accstyp.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving accessriestyp','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/accessriestyp_mast/accessriestyp_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        accessriestyp.findById(req.params.id, function(err, accessriestyp){
            console.log(accessriestyp);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching accessriestyp details' });
            } else {
                res.json({ 'success': true, 'accessriestyp': accessriestyp });
            }
            
        });
    });
        router.post('/edit_accessriestyp_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let accstyp = {};
                accstyp.accessriestyp_name = req.body.accessriestyp_name;
                accstyp.accessriestyp_code = req.body.accessriestyp_code;
                accstyp.co_code =  req.session.compid;
                accstyp.div_code =  req.session.divid;
                accstyp.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                accessriestyp.update(query ,accstyp ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving accessriestyp', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/accessriestyp_mast/accessriestyp_mast');
                    }
                });
            }
        });
        router.get('/delete_accessriestyp/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            accessriestyp.findById(req.params.id, function(err, accessriestyp){
                accessriestyp.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/accessriestyp_mast/accessriestyp_mast');
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