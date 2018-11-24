const express = require('express');
const router = express.Router(); 
let party = require('../models/party_type_mast_schema');
var query;

// Add Route
router.get('/party_type_mast', ensureAuthenticated, function(req, res){
    party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            if (err) {
                console.log(err);
            } else {
                res.render('party_type_mast.hbs', {
                    pageTitle:'Add party',
                    party: party,
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
            let prty = new party();
            prty.party_type_name = req.body.party_type_name;
            prty.co_code =  req.session.compid;
            prty.div_code =  req.session.divid;
            prty.usrnm =  req.session.user;
            prty.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving party','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/party_type_mast/party_type_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        party.findById(req.params.id, function(err, party){
            console.log(party);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching party details' });
            } else {
                res.json({ 'success': true, 'party': party });
            }
            
        });
    });
        router.post('/edit_party_type_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prty = {};
                prty.party_type_name = req.body.party_type_name;
                prty.co_code =  req.session.compid;
                prty.div_code =  req.session.divid;
                prty.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                party.update(query ,prty ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving party', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/party_type_mast/party_type_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              party.findById(req.params.id, function(err, party){
                party.remove(query, function(err){
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