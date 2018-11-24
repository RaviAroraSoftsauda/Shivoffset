const express = require('express');
const router = express.Router(); 
let driver = require('../models/driver_mast_schema');
var query;

// Add Route
router.get('/driver_mast', ensureAuthenticated, function(req, res){
    driver.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, instyp){
            if (err) {
                console.log(err);
            } else {
                res.render('driver_mast.hbs', {
                    pageTitle:'Add driver',
                    instyp: instyp,
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
            let drvr = new driver();
            drvr.driver_name = req.body.driver_name;
            drvr.driver_salary = req.body.driver_salary;
            drvr.co_code =  req.session.compid;
            drvr.div_code =  req.session.divid;
            drvr.usrnm =  req.session.user;
            drvr.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving driver','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/driver_mast/driver_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        driver.findById(req.params.id, function(err, driver){
            console.log(driver);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching driver details' });
            } else {
                res.json({ 'success': true, 'driver': driver });
            }
            
        });
    });
        router.post('/edit_driver_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let drvr = {};
                drvr.driver_name = req.body.driver_name;
                drvr.driver_salary = req.body.driver_salary;
                drvr.co_code =  req.session.compid;
                drvr.div_code =  req.session.divid;
                drvr.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                driver.update(query ,drvr ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving driver', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/driver_mast/driver_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              driver.findById(req.params.id, function(err, driver){
                driver.remove(query, function(err){
                    if(err){
                      console.log(err);
                    }
                    res.send('Success');
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