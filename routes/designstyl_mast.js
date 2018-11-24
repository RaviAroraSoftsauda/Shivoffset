const express = require('express');
const router = express.Router(); 
let design = require('../models/designstyl_mast_schema');
var query;

// Add Route
router.get('/designstyl_mast', ensureAuthenticated, function(req, res){
    design.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, design){
            if (err) {
                console.log(err);
            } else {
                res.render('designstyl_mast.hbs', {
                    pageTitle:'Add Design',
                    design: design,
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
            let dsign = new design();
            dsign.design_style = req.body.design_style;
            dsign.design_code = req.body.design_code;
            dsign.co_code =  req.session.compid;
            dsign.div_code =  req.session.divid;
            dsign.usrnm =  req.session.user;
            dsign.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving design','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/designstyl_mast/designstyl_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        design.findById(req.params.id, function(err, design){
            console.log(design);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching design details' });
            } else {
                res.json({ 'success': true, 'design': design });
            }
            
        });
    });
        router.post('/edit_design_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let dsign = {};
                dsign.design_style = req.body.design_style;
                dsign.design_code = req.body.design_code;
                dsign.co_code =  req.session.compid;
                dsign.div_code =  req.session.divid;
                dsign.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                design.update(query ,dsign ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving design', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/designstyl_mast/designstyl_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              design.findById(req.params.id, function(err, design){
                design.remove(query, function(err){
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