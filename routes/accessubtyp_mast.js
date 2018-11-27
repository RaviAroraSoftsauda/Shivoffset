const express = require('express');
const router = express.Router(); 
let accessubtyp = require('../models/accessubtyp_mast_schema');
var query;

// Add Route
router.get('/accessubtyp_mast', ensureAuthenticated, function(req, res){
    accessubtyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessubtyp){
            if (err) {
                console.log(err);
            } else {
                res.render('accessubtyp_mast.hbs', {
                    pageTitle:'Add accessubtyp',
                    accessubtyp: accessubtyp,
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
            let accstyp = new accessubtyp();
            accstyp.accessubtyp_name = req.body.accessubtyp_name;
            accstyp.accessubtyp_code = req.body.accessubtyp_code;
            accstyp.co_code =  req.session.compid;
            accstyp.div_code =  req.session.divid;
            accstyp.usrnm =  req.session.user;
            accstyp.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving accessubtyp','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/accessubtyp_mast/accessubtyp_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        accessubtyp.findById(req.params.id, function(err, accessubtyp){
            console.log(accessubtyp);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching accessubtyp details' });
            } else {
                res.json({ 'success': true, 'accessubtyp': accessubtyp });
            }
            
        });
    });
        router.post('/edit_accessubtyp_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let accstyp = {};
                accstyp.accessubtyp_name = req.body.accessubtyp_name;
                accstyp.accessubtyp_code = req.body.accessubtyp_code;
                accstyp.co_code =  req.session.compid;
                accstyp.div_code =  req.session.divid;
                accstyp.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                accessubtyp.update(query ,accstyp ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving accessubtyp', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/accessubtyp_mast/accessubtyp_mast');
                    }
                });
            }
        });
        router.get('/delete_accessubtyp/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            accessubtyp.findById(req.params.id, function(err, accessubtyp){
                accessubtyp.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/accessubtyp_mast/accessubtyp_mast');
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