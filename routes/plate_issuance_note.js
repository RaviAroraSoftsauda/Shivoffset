const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let supplier = require('../models/supplier_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
let accessories = require('../models/accessories_mast_schema');
let plateissuance = require('../models/accessories_recepit_note_schema');
let recepit = require('../models/accessories_recepit_note_schema');
let rackloc = require('../models/rackloc_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let city = require('../models/city_mast_schema');
let newjobentry = require('../models/newjobentry_mast_schema');
var query;
router.get('/plateszname', function (req, res) {
    accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
        recepit.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepit) {
        res.json({ 'success': true, 'accessories': accessories,'recepit': recepit});
    });
});
});
router.post('/productname', function(req, res) {
    var jobcrdno = req.body.jobcrdno;
    newjobentry.find({newjb_jbcrd:jobcrdno,co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'newjobentry': newjobentry});
        }
    }).populate('newjb_prtynm').populate('productid');
}); 
// Add Route
router.get('/plate_issuance_note', ensureAuthenticated, function(req, res){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            plateissuance.find({main_bk:"PIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, plateissuance){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
                recepit.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepit) {
            if (err) {
                console.log(err);
            } else {
                res.render('plate_issuance_note.hbs', {
                    pageTitle:'Add Accessories Issue Note',
                    accessories: accessories,
                    plateissuance: plateissuance,
                    newjobentry: newjobentry,
                    recepit: recepit,
                    city: city,
                });
            }
        });
    }).populate('productid.prdt_prtyname');
})
        }).sort('-ref_no');
    })

});

    router.post('/add',function(req, res){
        if(req.body.from_ltcon=="") req.body.from_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.to_ltcon=="") req.body.to_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let plate = new plateissuance();
            plate.ref_no =req.body.ref_no;
            plate.main_bk ="PIN";
            plate.c_j_s_p =req.body.c_j_s_p;
            plate.acc_date = req.body.acc_date;
            plate.from_ltcon = req.body.from_ltcon;
            plate.to_ltcon = req.body.to_ltcon;
            plate.p_i_n = req.body.p_i_n;
            plate.co_code =  req.session.compid;
            plate.div_code =  req.session.divid;
            plate.usrnm =  req.session.user;
            plate.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving supplier','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/plate_issuance_note/plate_issuance_note');
                }
            });
        }
    });
    router.get('/plate_issuance_note_list', ensureAuthenticated, function(req, res){
        plateissuance.find({main_bk:"PIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, plateissuance){
        if (err) {
            console.log(err);
        } else {
            res.render('plate_issuance_note_list.hbs', {
                pageTitle:'Recepit List',
                plateissuance: plateissuance,
            });
        }
    }).populate('from_ltcon').populate('to_ltcon');
    });
    router.get('/plate_issuance_note_update/:id', ensureAuthenticated, function(req, res){
        accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            plateissuance.findById(req.params.id, function (err, plateissuance){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
                recepit.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepit) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('plate_issuance_note_update.hbs', {
                            pageTitle:'Update Plate Issuance Note',
                            accessories: accessories,
                            plateissuance: plateissuance,
                            newjobentry: newjobentry,
                            recepit: recepit,
                            city: city,
                        });
                    }
                });
             }).populate('productid.prdt_prtyname');
            })
          })
        })
    });
        router.post('/update/:id', function(req, res) {
            if(req.body.from_ltcon=="") req.body.from_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            if(req.body.to_ltcon=="") req.body.to_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let plate = {};
                plate.ref_no =req.body.ref_no;
                plate.main_bk ="PIN";
                plate.c_j_s_p =req.body.c_j_s_p;
                plate.acc_date = req.body.acc_date;
                plate.from_ltcon = req.body.from_ltcon;
                plate.to_ltcon = req.body.to_ltcon;
                plate.p_i_n = req.body.p_i_n;
                plate.co_code =  req.session.compid;
                plate.div_code =  req.session.divid;
                plate.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                plateissuance.update(query ,plate ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving supplier', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/plate_issuance_note/plate_issuance_note_list');
                    }
                });
            }
        });
        router.get('/delete_plate_issuance_note/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            plateissuance.findById(req.params.id, function(err, plateissuance){
                plateissuance.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/plate_issuance_note/plate_issuance_note_list');
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