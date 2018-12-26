const express = require('express');
const router = express.Router();
let destruction = require('../models/detruction_note_entry_schema');
let departmnt = require('../models/departmnt_mast_schema');
let product = require('../models/product_mast_schema');
var query;
router.post('/productname', function(req, res) {
    var procode = req.body.procode;
    product.find({prdt_itemcode:procode,co_code:req.session.compid,div_code:req.session.divid}, function (err, product) {
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'product': product});
        }
    }).populate('prdt_prtyname');
}); 
// Add Route
router.get('/detruction_note_entry', ensureAuthenticated, function(req, res){
    destruction.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, destruction) {
    departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt) {
            if (err) {
                console.log(err);
            } else {
                res.render('detruction_note_entry.hbs', {
                    pageTitle:'Add Detruction Note Entry',
                    departmnt: departmnt,
                    destruction: destruction,
                });
            }
        });
    }).sort('-ref_no');
})

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
            let des = new destruction();
            des.ref_no =req.body.ref_no;
            des.main_bk ="DNT";
            des.c_j_s_p =req.body.c_j_s_p;
            des.dc_date = req.body.dc_date;
            des.stage = req.body.stage;
            des.deprtment = req.body.deprtment;
            des.destruction_note_entry = req.body.destruction_note_entry;
            des.co_code =  req.session.compid;
            des.div_code =  req.session.divid;
            des.usrnm =  req.session.user;
            des.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving supplier','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/detruction_note_entry/detruction_note_entry');
                }
            });
        }
    });
    // router.get('/plate_issuance_note_list', ensureAuthenticated, function(req, res){
    //     plateissuance.find({main_bk:"PIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, plateissuance){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render('plate_issuance_note_list.hbs', {
    //             pageTitle:'Recepit List',
    //             plateissuance: plateissuance,
    //         });
    //     }
    // }).populate('from_ltcon').populate('to_ltcon');
    // });
    // router.get('/plate_issuance_note_update/:id', ensureAuthenticated, function(req, res){
    //     accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
    //         plateissuance.findById(req.params.id, function (err, plateissuance){
    //         city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
    //         newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
    //             recepit.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepit) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     res.render('plate_issuance_note_update.hbs', {
    //                         pageTitle:'Update Plate Issuance Note',
    //                         accessories: accessories,
    //                         plateissuance: plateissuance,
    //                         newjobentry: newjobentry,
    //                         recepit: recepit,
    //                         city: city,
    //                     });
    //                 }
    //             });
    //          }).populate('productid.prdt_prtyname');
    //         })
    //       })
    //     })
    // });
    //     router.post('/update/:id', function(req, res) {
    //         if(req.body.from_ltcon=="") req.body.from_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //         if(req.body.to_ltcon=="") req.body.to_ltcon=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //         let errors = req.validationErrors();
    //         if (errors) {
    //             console.log(errors);
    //             res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
    //         } else {
    //             let plate = {};
    //             plate.ref_no =req.body.ref_no;
    //             plate.main_bk ="PIN";
    //             plate.c_j_s_p =req.body.c_j_s_p;
    //             plate.acc_date = req.body.acc_date;
    //             plate.from_ltcon = req.body.from_ltcon;
    //             plate.to_ltcon = req.body.to_ltcon;
    //             plate.p_i_n = req.body.p_i_n;
    //             plate.co_code =  req.session.compid;
    //             plate.div_code =  req.session.divid;
    //             plate.usrnm =  req.session.user;
    //             let query = {_id:req.params.id}
    //             plateissuance.update(query ,plate ,function (err) {
    //                 if (err) {
    //                     res.json({ 'success': false, 'message': 'Error in Saving supplier', 'errors': err });
    //                     return;
    //                 } else {;
    //                     res.redirect('/plate_issuance_note/plate_issuance_note_list');
    //                 }
    //             });
    //         }
    //     });
    //     router.get('/delete_plate_issuance_note/:id', function(req, res){
    //         if(!req.user.id)
    //         {
    //             res.status(500).send();
    //         }
    //         let query = {_id:req.param.id}
    //         plateissuance.findById(req.params.id, function(err, plateissuance){
    //             plateissuance.remove(query,function(err){
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                 }
    //                 res.redirect('/plate_issuance_note/plate_issuance_note_list');
    //             });
    //         });
    //     });
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