const express = require('express');
const router = express.Router(); 
let qcequimnts = require('../models/qcequimnts_mast_schema');
let depart = require('../models/departmnt_mast_schema');
let machinechecklist = require('../models/machinechecklist_mast_schema');
var query;

// Add Route
router.get('/qcequimnts_mast', ensureAuthenticated, function(req, res){
    qcequimnts.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, qcequimnts){
        depart.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, depart){
            machinechecklist.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machinechecklist){
            if (err) {
                console.log(err);
            } else {
                res.render('qcequimnts_mast.hbs', {
                    pageTitle:'Add qcequimnts',
                    qcequimnts: qcequimnts,
                    depart: depart,
                    machinechecklist: machinechecklist,
                });
            }
        })
    });
}).populate('qcequimnts_deprt').populate('qcequimnts_chklst');
});
    router.post('/add',function(req, res){
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let qc = new qcequimnts();
            qc.qcequimnts_eqname= req.body.qcequimnts_eqname;
            qc.qcequimnts_calbrton= req.body.qcequimnts_calbrton;
            qc.qcequimnts_calbrtontwo= req.body.qcequimnts_calbrtontwo;
            qc.qcequimnts_days= req.body.qcequimnts_days;
            qc.qcequimnts_year= req.body.qcequimnts_year;
            qc.qcequimnts_deprt= req.body.qcequimnts_deprt;
            qc.qcequimnts_wghtbxcabrton= req.body.qcequimnts_wghtbxcabrton;
            qc.qcequimnts_chklst= req.body.qcequimnts_chklst;
            qc.qcequimnts_instrcton= req.body.qcequimnts_instrcton;
            qc.co_code =  req.session.compid;
            qc.div_code =  req.session.divid;
            qc.usrnm =  req.session.user;
            qc.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving qcequimnts','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/qcequimnts_mast/qcequimnts_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        qcequimnts.findById(req.params.id, function(err, qcequimnts){
            console.log(qcequimnts);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching qcequimnts details' });
            } else {
                res.json({ 'success': true, 'qcequimnts': qcequimnts });
            }
            
        });
    });
        router.post('/edit_qcequimnts_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let qc = {};
                qc.qcequimnts_eqname= req.body.qcequimnts_eqname;
                qc.qcequimnts_calbrton= req.body.qcequimnts_calbrton;
                qc.qcequimnts_calbrtontwo= req.body.qcequimnts_calbrtontwo;
                qc.qcequimnts_days= req.body.qcequimnts_days;
                qc.qcequimnts_year= req.body.qcequimnts_year;
                qc.qcequimnts_deprt= req.body.qcequimnts_deprt;
                qc.qcequimnts_wghtbxcabrton= req.body.qcequimnts_wghtbxcabrton;
                qc.qcequimnts_chklst= req.body.qcequimnts_chklst;
                qc.qcequimnts_instrcton= req.body.qcequimnts_instrcton;
                qc.co_code =  req.session.compid;
                qc.div_code =  req.session.divid;
                qc.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                qcequimnts.update(query ,qc ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving qcequimnts', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/qcequimnts_mast/qcequimnts_mast');
                    }
                });
            }
        });
        router.delete('/:id', function(req, res){
            if(!req.user._id){
                res.status(500).send();
              }
              let query = {_id:req.params.id}
              qcequimnts.findById(req.params.id, function(err, qcequimnts){
                qcequimnts.remove(query, function(err){
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