const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let product = require('../models/product_type_schema');
let departmnt = require('../models/departmnt_mast_schema');
var query;

// Add Route
router.get('/product_type_mast', ensureAuthenticated, function(req, res){
    product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
        departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            if (err) {
                console.log(err);
            } else {
                res.render('product_type_mast.hbs', {
                    pageTitle:'Add product',
                    product: product,
                    departmnt: departmnt,
                });
            }
        })
    });
});
    router.post('/add',function(req, res){
        if(req.body.prdt_deprtmnt=="") req.body.prdt_deprtmnt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let prdt = new product();
            prdt.prdt_typ_name = req.body.prdt_typ_name;
            prdt.prdt_deprtmnt = req.body.prdt_deprtmnt;
            prdt.prdt_code = req.body.prdt_code;
            prdt.co_code =  req.session.compid;
            prdt.div_code =  req.session.divid;
            prdt.usrnm =  req.session.user;
            prdt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/product_type_mast/product_type_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        product.findById(req.params.id, function(err, product){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            console.log(product);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching product details' });
            } else {
                res.json({ 'success': true, 'product': product,'departmnt': departmnt });
            }
            
        });
    });
    });
        router.post('/edit_prdt_mast/:id', function(req, res) {
            // if(req.body.prdt_deprtmnt=="") req.body.prdt_deprtmnt=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                prdt.prdt_typ_name = req.body.prdt_typ_name;
                prdt.prdt_deprtmnt = req.body.prdt_deprtmnt;
                prdt.prdt_code = req.body.prdt_code;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving product', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/product_type_mast/product_type_mast');
                    }
                });
            }
        });
        router.get('/delete_prodt/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            product.findById(req.params.id, function(err, product){
                product.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/product_type_mast/product_type_mast');
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