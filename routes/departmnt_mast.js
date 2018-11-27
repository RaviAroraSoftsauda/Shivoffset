const express = require('express');
const router = express.Router(); 
let departmnt = require('../models/departmnt_mast_schema');
let depart = require('../models/departmnt_mast_schema');
let manufuctur = require('../models/manufactur_mast_schema');
let machine = require('../models/machine_mast_schema');
var query;
router.get('/departmntname', function (req, res) {
    departmnt.find({}, function(err, departmnt){
        res.json({ 'success': true, 'departmnt': departmnt});
    });
});
router.get('/machinename', function (req, res) {
    machine.find({}, function(err, machine){
        res.json({ 'success': true, 'machine': machine});
    });
});
// Add Route
router.get('/departmnt_mast', ensureAuthenticated, function(req, res){
    departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
        manufuctur.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, manufuctur){
            machine.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machine){
            if (err) {
                console.log(err);
            } else {
                res.render('departmnt_mast.hbs', {
                    pageTitle:'Add departmnt',
                    departmnt: departmnt,
                    manufuctur: manufuctur,
                    machine: machine,
                });
            }
        })
    });
}).populate('departmnt_manufctur');
});
    router.post('/add',function(req, res){
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let dpart = new departmnt();
            dpart.departmnt_name = req.body.departmnt_name;
            dpart.machine_group = req.body.machine_group;
            dpart.departmnt_jbordr = req.body.departmnt_jbordr;
            dpart.departmnt_dflt = req.body.departmnt_dflt;
            dpart.departmnt_invreqrmnt = req.body.departmnt_invreqrmnt;
            dpart.dprtmnt_group = req.body.dprtmnt_group;
            dpart.co_code =  req.session.compid;
            dpart.div_code =  req.session.divid;
            dpart.usrnm =  req.session.user;
            dpart.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving departmnt','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/departmnt_mast/departmnt_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        departmnt.findById(req.params.id, function(err, departmnt){
            depart.find({}, function(err, depart){
                machine.find({}, function(err, machine){
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching departmnt details' });
            } else {
                res.json({ 'success': true, 'departmnt': departmnt,'depart': depart,'machine': machine });
            }
            
        });
    });
});
});
        router.post('/edit_departmnt_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let dpart = {};
                dpart.departmnt_name = req.body.departmnt_name;
                dpart.machine_group = req.body.machine_group;
                dpart.departmnt_jbordr = req.body.departmnt_jbordr;
                dpart.departmnt_dflt = req.body.departmnt_dflt;
                dpart.departmnt_invreqrmnt = req.body.departmnt_invreqrmnt;
                dpart.dprtmnt_group = req.body.dprtmnt_group;
                dpart.co_code =  req.session.compid;
                dpart.div_code =  req.session.divid;
                dpart.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                departmnt.update(query ,dpart ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving departmnt', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/departmnt_mast/departmnt_mast');
                    }
                });
            }
        });
        router.get('/delete_departmnt/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            departmnt.findById(req.params.id, function(err, departmnt){
                departmnt.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/departmnt_mast/departmnt_mast');
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