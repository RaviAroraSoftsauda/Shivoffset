const express = require('express');
const router = express.Router(); 
let supplier = require('../models/supplier_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
let accessories = require('../models/accessories_mast_schema');
let platepreparation = require('../models/accessories_recepit_note_schema');
let plateissuance = require('../models/accessories_recepit_note_schema');
let rackloc = require('../models/rackloc_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let city = require('../models/city_mast_schema');
let newjobentry = require('../models/newjobentry_mast_schema');
var query;
router.get('/plateszname', function (req, res) {
    accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
        res.json({ 'success': true, 'accessories': accessories});
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
router.get('/plate_preparation_report', ensureAuthenticated, function(req, res){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            platepreparation.find({main_bk:"PPR",co_code:req.session.compid,div_code:req.session.divid}, function (err, platepreparation){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
                plateissuance.find({main_bk:"PIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, plateissuance) {
            if (err) {
                console.log(err);
            } else {
                res.render('plate_preparation_report.hbs', {
                    pageTitle:'Add Accessories Issue Note',
                    accessories: accessories,
                    platepreparation: platepreparation,
                    newjobentry: newjobentry,
                    plateissuance: plateissuance,
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
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let plate = new platepreparation();
            plate.ref_no =req.body.ref_no;
            plate.main_bk ="PPR";
            plate.c_j_s_p =req.body.c_j_s_p;
            plate.acc_date = req.body.acc_date;
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
                    res.redirect('/plate_preparation_report/plate_preparation_report');
                }
            });
        }
    });
    router.get('/plate_preparation_report_list', ensureAuthenticated, function(req, res){
        platepreparation.find({main_bk:"PPR",co_code:req.session.compid,div_code:req.session.divid}, function (err, platepreparation){
        if (err) {
            console.log(err);
        } else {
            res.render('plate_preparation_report_list.hbs', {
                pageTitle:'Plate Preparation List',
                platepreparation: platepreparation,
            });
        }
    })
    });
    router.get('/plate_preparation_report_update/:id', ensureAuthenticated, function(req, res){
        platepreparation.findById(req.params.id, function (err, platepreparation){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
                city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
                newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry) {
                    plateissuance.find({main_bk:"PIN",co_code:req.session.compid,div_code:req.session.divid}, function (err, plateissuance) {
                   
                if (err) {
                    console.log(err);
                } else {
                    res.render('plate_preparation_report_update.hbs', {
                        pageTitle:'Update Plate Preparation Report',
                        accessories: accessories,
                        platepreparation: platepreparation,
                        newjobentry: newjobentry,
                        plateissuance: plateissuance,
                        city: city,
                    });
                }
            })
        })
    })
    });
    });
    });
        router.post('/update/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let plate = {};
                plate.ref_no =req.body.ref_no;
                plate.main_bk ="PPR";
                plate.c_j_s_p =req.body.c_j_s_p;
                plate.acc_date = req.body.acc_date;
                plate.p_i_n = req.body.p_i_n;
                plate.co_code =  req.session.compid;
                plate.div_code =  req.session.divid;
                plate.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                platepreparation.update(query ,plate ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving supplier', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/plate_preparation_report/plate_preparation_report_list');
                    }
                });
            }
        });
        router.get('/delete_plate_preparation_report/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            platepreparation.findById(req.params.id, function(err, platepreparation){
                platepreparation.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/plate_preparation_report/plate_preparation_report_list');
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