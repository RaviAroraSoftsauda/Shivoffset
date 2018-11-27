const express = require('express');
const router = express.Router(); 
let pantone = require('../models/pantone_mast_schema');
var query;

// Add Route
router.get('/pantone_mast', ensureAuthenticated, function(req, res){
    pantone.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, pantone){
            if (err) {
                console.log(err);
            } else {
                res.render('pantone_mast.hbs', {
                    pageTitle:'Add pantone',
                    pantone: pantone,
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
            let pntn = new pantone();
            pntn.pantone_descrpton= req.body.pantone_descrpton;
            pntn.pantone_color= req.body.pantone_color;
            pntn.pantone_colorr= req.body.pantone_colorr;
            pntn.pantone_colorg= req.body.pantone_colorg;
            pntn.pantone_colorb= req.body.pantone_colorb;
            pntn.pantone_htmlcode= req.body.pantone_htmlcode;
            pntn.co_code =  req.session.compid;
            pntn.div_code =  req.session.divid;
            pntn.usrnm =  req.session.user;
            pntn.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving pantone','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/pantone_mast/pantone_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        pantone.findById(req.params.id, function(err, pantone){
            console.log(pantone);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching pantone details' });
            } else {
                res.json({ 'success': true, 'pantone': pantone });
            }
            
        });
    });
        router.post('/edit_pantone_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let pntn = {};
                pntn.pantone_descrpton= req.body.pantone_descrpton;
                pntn.pantone_color= req.body.pantone_color;
                pntn.pantone_colorr= req.body.pantone_colorr;
                pntn.pantone_colorg= req.body.pantone_colorg;
                pntn.pantone_colorb= req.body.pantone_colorb;
                pntn.pantone_htmlcode= req.body.pantone_htmlcode;
                pntn.co_code =  req.session.compid;
                pntn.div_code =  req.session.divid;
                pntn.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                pantone.update(query ,pntn ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving pantone', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/pantone_mast/pantone_mast');
                    }
                });
            }
        });
        router.get('/delete_pantone/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            pantone.findById(req.params.id, function(err, pantone){
                pantone.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/pantone_mast/pantone_mast');
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