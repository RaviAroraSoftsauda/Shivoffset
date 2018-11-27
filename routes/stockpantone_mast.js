const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let stockpantone = require('../models/accessories_mast_schema');
let accbord = require('../models/accessories_mast_schema');
let accink = require('../models/accessories_mast_schema');
let pantone = require('../models/pantone_mast_schema');
var query;
router.get('/pantonename', function (req, res) {
    accink.find({accestyp_name:"5bf8e000971f74121491300c",co_code:req.session.compid,div_code:req.session.divid}, function(err, accink){
        res.json({ 'success': true, 'accink': accink});
    });
});
// Add Route
router.get('/stockpantone_mast', ensureAuthenticated, function(req, res){
    stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
        pantone.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, pantone){
            accbord.find({accestyp_name:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, accbord){
                accink.find({accestyp_name:"5bf8e000971f74121491300c",co_code:req.session.compid,div_code:req.session.divid}, function (err, accink){
            if (err) {
                console.log(err);
            } else {
                res.render('stockpantone_mast.hbs', {
                    pageTitle:'Add stockpantone',
                    stockpantone: stockpantone,
                    pantone: pantone,
                    accbord: accbord,
                    accink: accink,
                });
            }
        })
    });
});
}).populate('stockpantone_board').populate('stockpantone_pantonno').sort('-stockpantone_rcpno');
});
    router.post('/add',function(req, res){
        if(req.body.stockpantone_board=="") req.body.stockpantone_board=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.stockpantone_pantonno=="") req.body.stockpantone_pantonno=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
        if(errors)
        {
            console.log(errors);
        }
        else
        {
            let pntn = new stockpantone();
            pntn.flag= "PANT";
            pntn.stockpantone_rcpno= req.body.stockpantone_rcpno;
            pntn.stockpantone_board= req.body.stockpantone_board;
            pntn.stockpantone_pantonno= req.body.stockpantone_pantonno;
            pntn.stockpantone_barcode= req.body.stockpantone_barcode;
            pntn.stock_item= req.body.stock_item;
            pntn.co_code =  req.session.compid;
            pntn.div_code =  req.session.divid;
            pntn.usrnm =  req.session.user;
            pntn.save(function (err){
                if(err)
                {
                    res.json({'success':false,'message':'error in saving stockpantone','errors':err});
                    return;
                }
                else
                {
                    res.redirect('/stockpantone_mast/stockpantone_mast');
                }
            });
        }
    });
    router.get('/:id', ensureAuthenticated, function(req, res){
        stockpantone.findById(req.params.id, function(err, stockpantone){
            accink.find({accestyp_name:"5bf8e000971f74121491300c",co_code:req.session.compid,div_code:req.session.divid}, function(err, accink){
            console.log(stockpantone);
            if (err) {
                res.json({ 'success': false, 'message': 'error in fetching stockpantone details' });
            } else {
                res.json({ 'success': true, 'stockpantone': stockpantone,'accink': accink });
            }
            
        });
    });
    });
        router.post('/edit_stockpantone_mast/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let pntn = {};
                pntn.flag= "PANT";
                pntn.stockpantone_rcpno= req.body.stockpantone_rcpno;
                pntn.stockpantone_board= req.body.stockpantone_board;
                pntn.stockpantone_pantonno= req.body.stockpantone_pantonno;
                pntn.stockpantone_barcode= req.body.stockpantone_barcode;
                pntn.stock_item= req.body.stock_item;
                pntn.co_code =  req.session.compid;
                pntn.div_code =  req.session.divid;
                pntn.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                stockpantone.update(query ,pntn ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving stockpantone', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/stockpantone_mast/stockpantone_mast');
                    }
                });
            }
        });
        router.get('/delete_stockpantone/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            stockpantone.findById(req.params.id, function(err, stockpantone){
                stockpantone.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/stockpantone_mast/stockpantone_mast');
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