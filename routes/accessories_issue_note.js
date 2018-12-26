const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let supplier = require('../models/supplier_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
let accessories = require('../models/accessories_mast_schema');
let accessubtyp = require('../models/accessubtyp_mast_schema');
let recepitissue = require('../models/accessories_recepit_note_schema');
let rackloc = require('../models/rackloc_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let city = require('../models/city_mast_schema');
var query;
router.post('/productname', function(req, res) {
    var acctyp = req.body.acctyp;
    accessories.find({accestyp_name:acctyp,flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories) {
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'accessories': accessories});
        }
    }).populate('accessubtyp_name');
}); 
router.get('/acctyname', function (req, res) {
    accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
        rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
        res.json({ 'success': true, 'accessriestyp': accessriestyp,'rackloc': rackloc});
    });
});
});
// Add Route
router.get('/accessories_issue_note', ensureAuthenticated, function(req, res){
    supplier.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, supplier){
        accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
            rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
                departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
                    recepitissue.find({main_bk:"AIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepitissue){
            if (err) {
                console.log(err);
            } else {
                res.render('accessories_issue_note.hbs', {
                    pageTitle:'Add Accessories Issue Note',
                    supplier: supplier,
                    recepitissue: recepitissue,
                    departmnt: departmnt,
                    accessriestyp: accessriestyp,
                    rackloc: rackloc,
                });
            }
        }).sort('-ref_no');
    })
})
})
    }).populate('supplier_city');
});

    router.post('/add',function(req, res){
        if(req.body.acc_department=="") req.body.acc_department=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let recpt = new recepitissue();
            recpt.ref_no =req.body.ref_no;
            recpt.main_bk ="AIN";
            recpt.c_j_s_p =req.body.c_j_s_p;
            recpt.acc_date = req.body.acc_date;
            recpt.acc_department = req.body.acc_department;
            recpt.acc_invoice = req.body.acc_invoice;
            recpt.acc_supdt = req.body.acc_supdt;
            recpt.acc_note_item = req.body.acc_note_item;
            recpt.acc_totalqty = req.body.acc_totalqty;
            recpt.co_code =  req.session.compid;
            recpt.div_code =  req.session.divid;
            recpt.usrnm =  req.session.user;
            recpt.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving supplier','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/accessories_issue_note/accessories_issue_note');
                }
            });
        }
    });
    router.get('/accessories_issue_note_list', ensureAuthenticated, function(req, res){
        recepitissue.find({main_bk:"AIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepitissue){
        if (err) {
            console.log(err);
        } else {
            res.render('accessories_issue_note_list.hbs', {
                pageTitle:'Recepit List',
                recepitissue: recepitissue,
            });
        }
    }).populate('acc_department').populate('accessubtyp_name');
    });
    router.get('/accessories_issue_note_update/:id', ensureAuthenticated, function(req, res){
        recepitissue.findById(req.params.id, function (err, recepitissue){
        supplier.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, supplier){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
                accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories) {
            accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
                accessubtyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessubtyp){
                rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
                   
                if (err) {
                    console.log(err);
                } else {
                    res.render('accessories_issue_note_update.hbs', {
                        pageTitle:'Update Accessories issue',
                        supplier: supplier,
                        departmnt: departmnt,
                        accessories: accessories,
                        recepitissue: recepitissue,
                        accessriestyp: accessriestyp,
                        rackloc: rackloc,
                        accessubtyp: accessubtyp,
                    });
                }
            })
        })
    })
        });
    });
    });
    });
    });
        router.post('/update/:id', function(req, res) {
            if(req.body.acc_department=="") req.body.acc_department=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let recpt = {};
                recpt.ref_no =req.body.ref_no;
                recpt.main_bk ="AIN";
                recpt.c_j_s_p =req.body.c_j_s_p;
                recpt.acc_date = req.body.acc_date;
                recpt.acc_department = req.body.acc_department;
                recpt.acc_invoice = req.body.acc_invoice;
                recpt.acc_supdt = req.body.acc_supdt;
                recpt.acc_note_item = req.body.acc_note_item;
                recpt.acc_totalqty = req.body.acc_totalqty;
                recpt.co_code =  req.session.compid;
                recpt.div_code =  req.session.divid;
                recpt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                recepitissue.update(query ,recpt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving supplier', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/accessories_issue_note/accessories_issue_note_list');
                    }
                });
            }
        });
        router.get('/delete_accessories_issue_note/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            recepitissue.findById(req.params.id, function(err, recepitissue){
                recepitissue.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/accessories_issue_note/accessories_issue_note_list');
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