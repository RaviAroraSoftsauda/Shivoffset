const express = require('express');
const router = express.Router(); 
let construction = require('../models/construction_mast_schema');
var query;

// Add Route
router.get('/construction_mast', ensureAuthenticated, function(req, res){
    construction.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, construction){
            if (err) {
                console.log(err);
            } else {
                res.render('construction_mast.hbs', {
                    pageTitle:'Add construction',
                    construction: construction,
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
            let constrion = new construction();
            constrion.construction_name = req.body.construction_name;
            constrion.construction_code = req.body.construction_code;
            constrion.co_code =  req.session.compid;
            constrion.div_code =  req.session.divid;
            constrion.usrnm =  req.session.user;
            constrion.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving construction','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/construction_mast/construction_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        construction.findById(req.params.id, function(err, construction){
            console.log(construction);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching construction details' });
            } else {
                res.json({ 'success': true, 'construction': construction });
            }
            
        });
    });
        router.post('/edit_construction_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let constrion = {};
                constrion.construction_name = req.body.construction_name;
                constrion.construction_code = req.body.construction_code;
                constrion.co_code =  req.session.compid;
                constrion.div_code =  req.session.divid;
                constrion.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                construction.update(query ,constrion ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving construction', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/construction_mast/construction_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              construction.findById(req.params.id, function(err, construction){
                construction.remove(query, function(err){
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