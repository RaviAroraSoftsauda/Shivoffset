const express = require('express');
const router = express.Router(); 
let inserttyp = require('../models/inserttyp_mast_schema');
var query;

// Add Route
router.get('/inserttyp_mast', ensureAuthenticated, function(req, res){
    inserttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, instyp){
            if (err) {
                console.log(err);
            } else {
                res.render('inserttyp_mast.hbs', {
                    pageTitle:'Add inserttyp',
                    instyp: instyp,
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
            let insrttyp = new inserttyp();
            insrttyp.indsrttyp_dscrpton = req.body.indsrttyp_dscrpton;
            insrttyp.indsrttyp_qty = req.body.indsrttyp_qty;
            insrttyp.indsrttyp_code = req.body.indsrttyp_code;
            insrttyp.co_code =  req.session.compid;
            insrttyp.div_code =  req.session.divid;
            insrttyp.usrnm =  req.session.user;
            insrttyp.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving inserttyp','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/inserttyp_mast/inserttyp_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        inserttyp.findById(req.params.id, function(err, inserttyp){
            console.log(inserttyp);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching inserttyp details' });
            } else {
                res.json({ 'success': true, 'inserttyp': inserttyp });
            }
            
        });
    });
        router.post('/edit_insrttyp_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let insrttyp = {};
                insrttyp.indsrttyp_dscrpton = req.body.indsrttyp_dscrpton;
                insrttyp.indsrttyp_qty = req.body.indsrttyp_qty;
                insrttyp.indsrttyp_code = req.body.indsrttyp_code;
                insrttyp.co_code =  req.session.compid;
                insrttyp.div_code =  req.session.divid;
                insrttyp.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                inserttyp.update(query ,insrttyp ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving inserttyp', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/inserttyp_mast/inserttyp_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              inserttyp.findById(req.params.id, function(err, inserttyp){
                inserttyp.remove(query, function(err){
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