const express = require('express');
const router = express.Router(); 
let vehicle = require('../models/vehicle_mast_schema');
var query;

// Add Route
router.get('/vehicle_mast', ensureAuthenticated, function(req, res){
    vehicle.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vehicle){
            if (err) {
                console.log(err);
            } else {
                res.render('vehicle_mast.hbs', {
                    pageTitle:'Add vehicle',
                    vehicle: vehicle,
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
            let vchle = new vehicle();
            vchle.vehicle_no= req.body.vehicle_no;
            vchle.vehicle_cmpnymakr= req.body.vehicle_cmpnymakr;
            vchle.vehicle_mdlno= req.body.vehicle_mdlno;
            vchle.vehicle_orarrchd= req.body.vehicle_orarrchd;
            vchle.vehicle_nofaxels= req.body.vehicle_nofaxels;
            vchle.vehicle_rtopssing= req.body.vehicle_rtopssing;
            vchle.vehicle_chisno= req.body.vehicle_chisno;
            vchle.vehicle_engno= req.body.vehicle_engno;
            vchle.vehicle_expwin= req.body.vehicle_expwin;
            vchle.vehicle_active= req.body.vehicle_active;
            vchle.vehicle_lockdt= req.body.vehicle_lockdt;
            vchle.vehicle_mfgdt= req.body.vehicle_mfgdt;
            vchle.vehicle_othrinfo= req.body.vehicle_othrinfo;
            vchle.vehicle_onwrnm= req.body.vehicle_onwrnm;
            vchle.vehicle_pylod= req.body.vehicle_pylod;
            vchle.co_code =  req.session.compid;
            vchle.div_code =  req.session.divid;
            vchle.usrnm =  req.session.user;
            vchle.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving vehicle','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/vehicle_mast/vehicle_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        vehicle.findById(req.params.id, function(err, vehicle){
            console.log(vehicle);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching vehicle details' });
            } else {
                res.json({ 'success': true, 'vehicle': vehicle });
            }
            
        });
    });
        router.post('/edit_vehicle_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let vchle = {};
                vchle.vehicle_no= req.body.vehicle_no;
                vchle.vehicle_cmpnymakr= req.body.vehicle_cmpnymakr;
                vchle.vehicle_mdlno= req.body.vehicle_mdlno;
                vchle.vehicle_orarrchd= req.body.vehicle_orarrchd;
                vchle.vehicle_nofaxels= req.body.vehicle_nofaxels;
                vchle.vehicle_rtopssing= req.body.vehicle_rtopssing;
                vchle.vehicle_chisno= req.body.vehicle_chisno;
                vchle.vehicle_engno= req.body.vehicle_engno;
                vchle.vehicle_expwin= req.body.vehicle_expwin;
                vchle.vehicle_active= req.body.vehicle_active;
                vchle.vehicle_lockdt= req.body.vehicle_lockdt;
                vchle.vehicle_mfgdt= req.body.vehicle_mfgdt;
                vchle.vehicle_othrinfo= req.body.vehicle_othrinfo;
                vchle.vehicle_onwrnm= req.body.vehicle_onwrnm;
                vchle.vehicle_pylod= req.body.vehicle_pylod;
                vchle.co_code =  req.session.compid;
                vchle.div_code =  req.session.divid;
                vchle.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                vehicle.update(query ,vchle ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving vehicle', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/vehicle_mast/vehicle_mast');
                    }
                });
            }
        });
        router.get('/delete_vehicle/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            vehicle.findById(req.params.id, function(err, vehicle){
                vehicle.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/vehicle_mast/vehicle_mast');
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