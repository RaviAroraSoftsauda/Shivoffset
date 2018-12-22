const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let accessories = require('../models/accessories_mast_schema');
let accessubtyp = require('../models/accessubtyp_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
let manufactur = require('../models/manufactur_mast_schema');
let machine = require('../models/machine_mast_schema');
var query;

// Add Route
router.get('/accessories_mast', ensureAuthenticated, function(req, res){
    accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
    accessubtyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessubtyp){
    manufactur.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, manufactur){
    accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
    machine.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machine){
            if (err) {
                console.log(err);
            } else {
                res.render('accessories_mast.hbs', {
                    pageTitle:'Add accessories',
                    accessories: accessories,
                    accessubtyp: accessubtyp,
                    manufactur: manufactur,
                    accessriestyp: accessriestyp,
                    machine: machine,
                });
            }
        })
    });
});
});
}).populate('accessubtyp_name').populate('manufactur_name').populate('accestyp_name').populate('machine_name');
});
    router.post('/add',function(req, res){
        if(req.body.accestyp_name=="----Select Type----") req.body.accestyp_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.accessubtyp_name=="----Select Sub Type----") req.body.accessubtyp_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.manufactur_name=="----Select Manuacturer----") req.body.manufactur_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.machine_name=="") req.body.machine_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let access = new accessories();
            access.flag= "ACC";
            access.accestyp_name= req.body.accestyp_name;
            access.accessubtyp_name = req.body.accessubtyp_name;
            access.accessories_desc = req.body.accessories_desc;
            access.manufactur_name = req.body.manufactur_name;
            access.machine_name = req.body.machine_name;
            access.accessoriesmin_stk = req.body.accessoriesmin_stk;
            access.accessories_gsm =req.body.accessories_gsm;
            access.accessories_maxstk =req.body.accessories_maxstk;
            access.accessories_sku =req.body.accessories_sku;
            access.accessoriesqty_pen = req.body.accessoriesqty_pen;
            access.co_code =  req.session.compid;
            access.div_code =  req.session.divid;
            access.usrnm =  req.session.user;
            access.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving accessories','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/accessories_mast/accessories_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        accessories.findById(req.params.id, function(err, accessories){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching accessories details' });
            } else {
                res.json({ 'success': true, 'accessories': accessories });
            }
            
        });
    });
        router.post('/edit_accessories_mast/:id', function(req, res) {
            if(req.body.accestyp_name=="----Select Type----") req.body.accestyp_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.accessubtyp_name=="----Select Sub Type----") req.body.accessubtyp_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.manufactur_name=="----Select Manuacturer----") req.body.manufactur_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.machine_name=="") req.body.machine_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let access = {};
                access.flag= "ACC";
                access.accestyp_name= req.body.accestyp_name;
                access.accessubtyp_name = req.body.accessubtyp_name;
                access.accessories_desc = req.body.accessories_desc;
                access.manufactur_name = req.body.manufactur_name;
                access.machine_name = req.body.machine_name;
                access.accessoriesmin_stk = req.body.accessoriesmin_stk;
                access.accessories_gsm =req.body.accessories_gsm;
                access.accessories_maxstk =req.body.accessories_maxstk;
                access.accessories_sku =req.body.accessories_sku;
                access.accessoriesqty_pen = req.body.accessoriesqty_pen;
                access.co_code =  req.session.compid;
                access.div_code =  req.session.divid;
                access.usrnm =  req.session.user;
                accessories.update(query ,access ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving accessories', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/accessories_mast/accessories_mast');
                    }
                });
            }
        });
        router.get('/delete_accessories/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            accessories.findById(req.params.id, function(err, accessories){
                accessories.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/accessories_mast/accessories_mast');
                });
            });
        });
        // router.delete('/:id', function(req, res){
        //     if(!req.user._id){
        //         res.status(500).send();
        //       }
        //       let query = {_id:req.params.id}
        //       accessories.findById(req.params.id, function(err, accessories){
        //         accessories.remove(query, function(err){
        //             if(err){
        //               console.log(err);
        //             }
        //             res.send('Success');
        //           });
        //       });
        //   });
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