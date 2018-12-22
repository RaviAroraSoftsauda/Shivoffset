const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let city = require('../models/city_mast_schema');
let stockpantone = require('../models/accessories_mast_schema');
let employee = require('../models/employee_mast_schema');
let accbord = require('../models/accessories_mast_schema');
let inkpreparation = require('../models/ink_preparation_schema');
var query;
router.get('/pantoneno', function (req, res) {
    stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
        accbord.find({accestyp_name:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, accbord){
        res.json({ 'success': true, 'stockpantone': stockpantone,'accbord': accbord});
    });
}).populate('stockpantone_pantonno');
});
router.get('/ink_preparation', ensureAuthenticated, function(req, res){
    inkpreparation.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, inkpreparation){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            employee.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, employee){
            accbord.find({accestyp_name:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, accbord){
            stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
            if (err) {
                console.log(err);
            } else {
                res.render('ink_preparation.hbs', {
                    pageTitle:'Add Ink Preparation',
                    city: city,
                    stockpantone: stockpantone,
                    employee: employee,
                    accbord: accbord,
                    inkpreparation: inkpreparation,
                });
            }
        }).populate('stockpantone_pantonno');
    });
});
});
}).sort('-ref_no');
});
    router.post('/add',function(req, res){
        if(req.body.ink_employeename=="") req.body.ink_employeename=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let ink = new inkpreparation();
            ink.ref_no = req.body.ref_no;
            ink.ink_date = req.body.ink_date;
            ink.ink_employeename = req.body.ink_employeename;
            ink.ink_preparation = req.body.ink_preparation;
            ink.co_code =  req.session.compid;
            ink.div_code =  req.session.divid;
            ink.usrnm =  req.session.user;
            ink.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving city','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/ink_preparation/ink_preparation');
                }
            });
        }
    });
    router.get('/ink_preparation_list', ensureAuthenticated, function(req, res){
        inkpreparation.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, inkpreparation){
        if (err) {
            console.log(err);
        } else {
            res.render('ink_preparation_list.hbs', {
                pageTitle:'Ink Preparation List',
                inkpreparation: inkpreparation,
            });
        }
    }).populate('ink_employeename');
    });
    router.get('/ink_preparation_update/:id', ensureAuthenticated, function(req, res){
        inkpreparation.findById(req.params.id, function (err, inkpreparation){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
                employee.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, employee){
                accbord.find({accestyp_name:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, accbord){
                stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
                if (err) {
                    console.log(err);
                } else {
                    res.render('ink_preparation_update.hbs', {
                        pageTitle:'Update Ink Preparation',
                        city: city,
                        stockpantone: stockpantone,
                        employee: employee,
                        accbord: accbord,
                        inkpreparation: inkpreparation,
                    });
                }
            }).populate('stockpantone_pantonno');
        })
    })
        });
    });
    });
        router.post('/update/:id', function(req, res) {
            if(req.body.ink_employeename=="") req.body.ink_employeename=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let ink = {};
                ink.ref_no = req.body.ref_no;
                ink.ink_date = req.body.ink_date;
                ink.ink_employeename = req.body.ink_employeename;
                ink.ink_preparation = req.body.ink_preparation;
                ink.co_code =  req.session.compid;
                ink.div_code =  req.session.divid;
                ink.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                inkpreparation.update(query ,ink ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving Ink', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/ink_preparation/ink_preparation_list');
                    }
                });
            }
        });
        router.get('/delete_ink_preparation/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            inkpreparation.findById(req.params.id, function(err, inkpreparation){
                inkpreparation.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/ink_preparation/ink_preparation_list');
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