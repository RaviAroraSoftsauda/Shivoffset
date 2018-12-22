const express = require('express');
const router = express.Router(); 
let supplier = require('../models/supplier_mast_schema');
let city = require('../models/city_mast_schema');
var query;
// Add Route
router.get('/supplier_mast', ensureAuthenticated, function(req, res){
    supplier.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, supplier){
        city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            if (err) {
                console.log(err);
            } else {
                res.render('supplier_mast.hbs', {
                    pageTitle:'Add supplier',
                    supplier: supplier,
                    city: city,
                });
            }
        })
    }).populate('supplier_city');
});
    router.post('/add',function(req, res){
        if(req.body.supplier_city=="") req.body.supplier_city=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let sup = new supplier();
            sup.supplier_name = req.body.supplier_name;
            sup.supplier_addrss1 = req.body.supplier_addrss1;
            sup.supplier_addrss2 = req.body.supplier_addrss2;
            sup.supplier_city = req.body.supplier_city;
            sup.supplier_mobno = req.body.supplier_mobno;
            sup.supplier_gstin = req.body.supplier_gstin;
            sup.co_code =  req.session.compid;
            sup.div_code =  req.session.divid;
            sup.usrnm =  req.session.user;
            sup.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving supplier','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/supplier_mast/supplier_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        supplier.findById(req.params.id, function(err, supplier){
            console.log(supplier);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching supplier details' });
            } else {
                res.json({ 'success': true, 'supplier': supplier });
            }
            
        });
    });
        router.post('/edit_supplier_mast/:id', function(req, res) {
            if(req.body.supplier_city=="") req.body.supplier_city=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let sup = {};
                sup.supplier_name = req.body.supplier_name;
                sup.supplier_addrss1 = req.body.supplier_addrss1;
                sup.supplier_addrss2 = req.body.supplier_addrss2;
                sup.supplier_city = req.body.supplier_city;
                sup.supplier_mobno = req.body.supplier_mobno;
                sup.supplier_gstin = req.body.supplier_gstin;
                sup.co_code =  req.session.compid;
                sup.div_code =  req.session.divid;
                sup.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                supplier.update(query ,sup ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving supplier', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/supplier_mast/supplier_mast');
                    }
                });
            }
        });
        router.get('/delete_supplier/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            supplier.findById(req.params.id, function(err, supplier){
                supplier.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/supplier_mast/supplier_mast');
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