const express = require('express');
const router = express.Router(); 
let supplier = require('../models/supplier_mast_schema');
let accessriestyp = require('../models/accessriestyp_mast_schema');
let accessories = require('../models/accessories_mast_schema');
let recepitnote = require('../models/accessories_recepit_note_schema');
let recep = require('../models/accessories_recepit_note_schema');
let rackloc = require('../models/rackloc_mast_schema');
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
    });
}); 
router.get('/acctyname', function (req, res) {
    accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
        rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
        res.json({ 'success': true, 'accessriestyp': accessriestyp,'rackloc': rackloc});
    });
});
});
// Add Route
router.get('/accessories_recepit_note', ensureAuthenticated, function(req, res){
    supplier.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, supplier){
        accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
            rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
                recepitnote.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepitnote){
            if (err) {
                console.log(err);
            } else {
                res.render('accessories_recepit_note.hbs', {
                    pageTitle:'Add Accessories Note',
                    supplier: supplier,
                    recepitnote: recepitnote,
                    accessriestyp: accessriestyp,
                    rackloc: rackloc,
                });
            }
        }).populate('acc_suppliername').sort('-ref_no')
    })
})
    }).populate('supplier_city');
});
    router.post('/add',function(req, res){
        if(req.body.acc_suppliername=="") req.body.acc_suppliername=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let recpt = new recepitnote();
            recpt.ref_no =req.body.ref_no;
            recpt.main_bk ="ARN";
            recpt.c_j_s_p =req.body.c_j_s_p;
            recpt.acc_date = req.body.acc_date;
            recpt.acc_suppliername = req.body.acc_suppliername;
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
                    res.redirect('/accessories_recepit_note/accessories_recepit_note');
                }
            });
        }
    });
    router.get('/accessories_recepit_note_list', ensureAuthenticated, function(req, res){
        recepitnote.find({main_bk:"ARN",co_code:req.session.compid,div_code:req.session.divid}, function (err, recepitnote){
        if (err) {
            console.log(err);
        } else {
            res.render('accessories_recepit_note_list.hbs', {
                pageTitle:'Recepit List',
                recepitnote: recepitnote,
            });
        }
}).populate('acc_suppliername');
});
router.get('/accessories_recepit_note_update/:id', ensureAuthenticated, function(req, res){
    recepitnote.findById(req.params.id, function (err, recepitnote){
    supplier.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, supplier){
        accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories) {
        accessriestyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, accessriestyp){
            rackloc.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, rackloc){
               
            if (err) {
                console.log(err);
            } else {
                res.render('accessories_recepit_note_update.hbs', {
                    pageTitle:'Add Accessories Note',
                    supplier: supplier,
                    recepitnote: recepitnote,
                    accessories: accessories,
                    accessriestyp: accessriestyp,
                    rackloc: rackloc,
                });
            }
        })
    })
})
}).populate('supplier_city');
    });
});
router.post('/update/:id',function(req, res){
    if(req.body.acc_suppliername=="") req.body.acc_suppliername=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if(errors)
    {
        console.log(errors);
    }
    else
    {
        let recpt = {};
        recpt.ref_no =req.body.ref_no;
        recpt.main_bk ="ARN";
        recpt.c_j_s_p =req.body.c_j_s_p;
        recpt.acc_date = req.body.acc_date;
        recpt.acc_suppliername = req.body.acc_suppliername;
        recpt.acc_invoice = req.body.acc_invoice;
        recpt.acc_supdt = req.body.acc_supdt;
        recpt.acc_note_item = req.body.acc_note_item;
        recpt.acc_totalqty = req.body.acc_totalqty;
        recpt.co_code =  req.session.compid;
        recpt.div_code =  req.session.divid;
        recpt.usrnm =  req.session.user;
        let query = {_id:req.params.id}
        recepitnote.update(query ,recpt ,function (err) {
            if(err)
            {
                res.json({'success':false,'message':'error in saving supplier','errors':err});
                return;
            }
            else
            {
                res.redirect('/accessories_recepit_note/accessories_recepit_note_list');
            }
        });
    }
});
        router.get('/delete_accessories_recepit_note/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            recepitnote.findById(req.params.id, function(err, recepitnote){
                recepitnote.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/accessories_recepit_note/accessories_recepit_note_list');
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