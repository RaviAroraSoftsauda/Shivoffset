const express = require('express');
const router = express.Router(); 
let machinechecklist = require('../models/machinechecklist_mast_schema');
var query;

// Add Route
router.get('/machinechecklist_mast', ensureAuthenticated, function(req, res){
    machinechecklist.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machinechecklist){
            if (err) {
                console.log(err);
            } else {
                res.render('machinechecklist_mast.hbs', {
                    pageTitle:'Add machinechecklist',
                    machinechecklist: machinechecklist,
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
            let machinechk = new machinechecklist();
            machinechk.machinechk_dscrpton= req.body.machinechk_dscrpton;
            machinechk.machinechk_code= req.body.machinechk_code;
            machinechk.machinechk_instrcton= req.body.machinechk_instrcton;
            machinechk.co_code =  req.session.compid;
            machinechk.div_code =  req.session.divid;
            machinechk.usrnm =  req.session.user;
            machinechk.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving machinechecklist','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/machinechecklist_mast/machinechecklist_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        machinechecklist.findById(req.params.id, function(err, machinechecklist){
            console.log(machinechecklist);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching machinechecklist details' });
            } else {
                res.json({ 'success': true, 'machinechecklist': machinechecklist });
            }
            
        });
    });
        router.post('/edit_machinechk_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let machinechk = {};
                machinechk.machinechk_dscrpton= req.body.machinechk_dscrpton;
                machinechk.machinechk_code= req.body.machinechk_code;
                machinechk.machinechk_instrcton= req.body.machinechk_instrcton;
                machinechk.co_code =  req.session.compid;
                machinechk.div_code =  req.session.divid;
                machinechk.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                machinechecklist.update(query ,machinechk ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving machinechecklist', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/machinechecklist_mast/machinechecklist_mast');
                    }
                });
            }
        });
        router.get('/delete_machinechk/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            machinechecklist.findById(req.params.id, function(err, machinechecklist){
                machinechecklist.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/machinechecklist_mast/machinechecklist_mast');
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