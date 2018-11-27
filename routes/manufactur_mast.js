const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let manufactur = require('../models/manufactur_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
var query;

// Add Route
router.get('/manufactur_mast', ensureAuthenticated, function(req, res){
    manufactur.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, manufactur){
        accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
            if (err) {
                console.log(err);
            } else {
                res.render('manufactur_mast.hbs', {
                    pageTitle:'Add manufactur',
                    manufactur: manufactur,
                    accessriestyp: accessriestyp,
                });
            }
        })
    }).populate('manufactur_typ');
});
    router.post('/add',function(req, res){
        if(req.body.manufactur_typ=="----Select Type----") req.body.manufactur_typ=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let manufctur = new manufactur();
            manufctur.manufactur_name = req.body.manufactur_name;
            manufctur.manufactur_code = req.body.manufactur_code;
            manufctur.manufactur_typ = req.body.manufactur_typ;
            manufctur.co_code =  req.session.compid;
            manufctur.div_code =  req.session.divid;
            manufctur.usrnm =  req.session.user;
            manufctur.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving manufactur','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/manufactur_mast/manufactur_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        manufactur.findById(req.params.id, function(err, manufactur){
            console.log(manufactur);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching manufactur details' });
            } else {
                res.json({ 'success': true, 'manufactur': manufactur });
            }
            
        });
    });
        router.post('/edit_manufacturer_mast/:id', function(req, res) {
            if(req.body.manufactur_typ=="----Select Type----") req.body.manufactur_typ=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let manufctur = {};
                manufctur.manufactur_name = req.body.manufactur_name;
                manufctur.manufactur_code = req.body.manufactur_code;
                manufctur.manufactur_typ = req.body.manufactur_typ;
                manufctur.co_code =  req.session.compid;
                manufctur.div_code =  req.session.divid;
                manufctur.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                manufactur.update(query ,manufctur ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving manufctur', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/manufactur_mast/manufactur_mast');
                    }
                });
            }
        });
        router.get('/delete_manufacturer/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            manufactur.findById(req.params.id, function(err, manufactur){
                manufactur.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/manufactur_mast/manufactur_mast');
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