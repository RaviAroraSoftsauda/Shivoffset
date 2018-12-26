const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
let product = require('../models/product_mast_schema');
let prdttyp = require('../models/product_type_schema');
let country = require('../models/country_mast_schema');
let state = require('../models/state_mast_schema');
let inserttyp = require('../models/inserttyp_mast_schema');
let floading = require('../models/floading_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let city = require('../models/city_mast_schema');
let design = require('../models/designstyl_mast_schema');
let construction = require('../models/construction_mast_schema');
let vernish = require('../models/varnish_mast_schema');
let manufactur = require('../models/manufactur_mast_schema');
let machine = require('../models/machine_mast_schema');
let party = require('../models/party_mast_schema');
let stockpantone = require('../models/accessories_mast_schema');
let accbord = require('../models/accessories_mast_schema');
let accessories = require('../models/accessories_mast_schema');
var query;
router.get('/cityname', function (req, res) {
    city.find({co_code:req.session.compid,div_code:req.session.divid}, function(err, city){
        res.json({ 'success': true, 'city': city});
    });
});
router.get('/pantonename', function (req, res) {
    stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function(err, stockpantone){
        res.json({ 'success': true, 'stockpantone': stockpantone});
    }).populate('stockpantone_pantonno');
});
router.post('/deprtmentname', function (req, res) {
    var prdtname = req.body.prdtname;
    prdttyp.find({prdt_typ_name:prdtname,co_code:req.session.compid,div_code:req.session.divid},'prdt_deprtmnt', function(err, prdttyp){
        departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function(err, departmnt){
        res.json({ 'success': true, 'prdttyp': prdttyp, 'departmnt': departmnt});
    }).populate('prdt_deprtmnt');
});
});
// Add Route
router.get('/product_mast', ensureAuthenticated, function(req, res){
            product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
            prdttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, prdttyp){
            country.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, country){
            inserttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, inserttyp){
            floading.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, floading){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            design.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, design){
            construction.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, construction){
            vernish.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vernish){
            machine.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, machine){
            party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
            manufactur.find({manufactur_typ:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, manufactur){
            accbord.find({accestyp_name:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, accbord){
            if (err) {
                console.log(err);
            } else {
                res.render('product_mast.hbs', {
                    pageTitle:'Add product',
                    product: product,
                    prdttyp: prdttyp,
                    country: country,
                    inserttyp: inserttyp,
                    floading: floading,
                    departmnt: departmnt,
                    city: city,
                    design: design,
                    construction: construction,
                    vernish: vernish,
                    machine: machine,
                    party: party,
                    stockpantone: stockpantone,
                    manufactur: manufactur,
                    accbord: accbord,
                    accessories: accessories,
                });
            }
        })
    })
}).populate('stockpantone_pantonno');
});
});
});
});
});
});
});
});
});
});
});
});
});
});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/product')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.pdf') {
            req.fileValidationError = "Forbidden extension";
            return callback(null, false, req.fileValidationError);
        }
        callback(null, true)
    },
    limits:{
        fileSize: 420 * 150 * 200
    }
});
router.post('/add', upload.single('prdt_image'), (req, res, next) => {
    if(req.body.productid=="") req.body.productid=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_country=="") req.body.prdt_country=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_brdmnfctur=="") req.body.prdt_brdmnfctur=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_cnstrcton=="") req.body.prdt_cnstrcton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_vernish=="") req.body.prdt_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_dsignstyl=="") req.body.prdt_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_fldingflat=="") req.body.prdt_fldingflat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_fldingpttrn=="") req.body.prdt_fldingpttrn=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_prtyname=="") req.body.prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_typ_name=="") req.body.prdt_typ_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.prdt_material=="") req.body.prdt_material=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        // const productid= req.body.productid;
                const prdt_typ_name=req.body.prdt_typ_name;
                const prdt_itemcode = req.body.prdt_itemcode;
                const prdt_subresscode= req.body.prdt_subresscode;
                const prdt_artwkdt= req.body.prdt_artwkdt;
                const prdt_prtyname= req.body.prdt_prtyname;
                const location_group= req.body.location_group;
                // const pantone_group = req.body.pantone_group;
                const prdt_material = req.body.prdt_material;
                const prdt_pantone = req.body.prdt_pantone;
                const prdt_barcode = req.body.prdt_barcode;
                const prdt_pname= req.body.prdt_pname;
                const prdt_brdqlty= req.body.prdt_brdqlty;
                const prdt_gsmmb= req.body.prdt_gsmmb;
                const prdt_coinscratch =req.body.prdt_coinscratch;
                const prdt_perfration =req.body.prdt_perfration;
                const actul_l= req.body.actul_l;
                const actul_w= req.body.actul_w;
                const actul_h= req.body.actul_h;
                const flap_l= req.body.flap_l;
                const flap_w= req.body.flap_w;
                const flap_h= req.body.flap_h;
                const prdt_gsmtp= req.body.prdt_gsmtp;
                const pad_l= req.body.pad_l;
                const pad_w= req.body.pad_w;
                const pad_h= req.body.pad_h;
                const prdt_lfcolor= req.body.prdt_lfcolor;
                const prdt_fldingflat= req.body.prdt_fldingflat;
                const prdt_fldingpttrn= req.body.prdt_fldingpttrn;
                const foldng_l= req.body.foldng_l;
                const foldng_w= req.body.foldng_w;
                const foldng_h= req.body.foldng_h;
                const prdt_vrtclhorzntlone= req.body.prdt_vrtclhorzntlone;
                const prdt_vrtclhorzntltwo= req.body.prdt_vrtclhorzntltwo;
                const prdt_tkingszmm= req.body.prdt_tkingszmm;
                const prdt_erflp= req.body.prdt_erflp;
                const prdt_dsignstyl= req.body.prdt_dsignstyl;
                const prdt_country= req.body.prdt_country;
                const prdt_nvz= req.body.prdt_nvz;
                const prdt_brdmnfctur= req.body.prdt_brdmnfctur;
                const prdt_cnstrcton= req.body.prdt_cnstrcton;
                const prdt_embssrckno= req.body.prdt_embssrckno;
                const prdt_lamination= req.body.prdt_lamination;
                const prdt_laminationtyp= req.body.prdt_laminationtyp;
                const prdt_uv= req.body.prdt_uv;
                const prdt_vernish= req.body.prdt_vernish;
                const remark_group= req.body.remark_group;
                const prdt_deprtmnt= req.body.prdt_deprtmnt;
                const co_code =  req.session.compid;
                const div_code =  req.session.divid;
                const usrnm =  req.session.user;
                let errors = req.validationErrors();
                if (errors) {
                    if(req.file) {
                        let filename = './public/uploads/product/'+req.file.filename;
                        console.log(filename);
                        fs.stat(filename, function (err, stats) {
                            console.log(stats);//here we got all information of file in stats variable
                        
                            if (err) {
                                return console.error(err);
                            }
                            fs.unlink(filename,function(err){
                                if(err) return console.log(err);
                                console.log('file deleted successfully');
                            });  
                        });
                    }
                    res.render('product_mast.hbs', {
                        title: 'Add Product',
                        errors: errors
                    });
                }
            else {
                if (req.fileValidationError) {
                    res.render('product_mast.hbs', {
                        title: 'Add Product',
                        errors: req.fileValidationError
                    });     
                } 
            }
            if (errors) {
                res.json({ 'success': false, 'message': 'Validation error', errors: errors });
            } else {
                product.findOne({prdt_itemcode: req.body.prdt_itemcode}, function(errors, prdt){
                    if(errors) {
                        console.log(errors);
                        res.json({ 'success': false, 'message': 'Error in finding usrnm', errors: errors });
                    }
                    if(!prdt){
                        let newUser = new product({
                            prdt_typ_name:prdt_typ_name,
                            prdt_itemcode : prdt_itemcode,
                            prdt_subresscode: prdt_subresscode,
                            prdt_artwkdt: prdt_artwkdt,
                            prdt_prtyname: prdt_prtyname,
                            location_group: location_group,
                            prdt_pantone :prdt_pantone,
                            prdt_barcode :prdt_barcode,
                            // pantone_group : pantone_group,
                            prdt_material :prdt_material,
                            prdt_pname: prdt_pname,
                            prdt_brdqlty: prdt_brdqlty,
                            prdt_gsmmb: prdt_gsmmb,
                            prdt_coinscratch :prdt_coinscratch,
                            prdt_perfration :prdt_perfration,
                            actul_l: actul_l,
                            actul_w: actul_w,
                            actul_h: actul_h,
                            flap_l:flap_l,
                            flap_w:flap_w,
                            flap_h:flap_h,
                            prdt_gsmtp: prdt_gsmtp,
                            pad_l: pad_l,
                            pad_w: pad_w,
                            pad_h: pad_h,
                            prdt_lfcolor: prdt_lfcolor,
                            prdt_fldingflat: prdt_fldingflat,
                            prdt_fldingpttrn: prdt_fldingpttrn,
                            foldng_l: foldng_l,
                            foldng_w: foldng_w,
                            foldng_h: foldng_h,
                            prdt_vrtclhorzntlone: prdt_vrtclhorzntlone,
                            prdt_vrtclhorzntltwo: prdt_vrtclhorzntltwo,
                            prdt_tkingszmm: prdt_tkingszmm,
                            prdt_erflp: prdt_erflp,
                            prdt_dsignstyl: prdt_dsignstyl,
                            prdt_country: prdt_country,
                            prdt_nvz: prdt_nvz,
                            prdt_brdmnfctur: prdt_brdmnfctur,
                            prdt_cnstrcton: prdt_cnstrcton,
                            prdt_embssrckno: prdt_embssrckno,
                            prdt_lamination: prdt_lamination,
                            prdt_laminationtyp: prdt_laminationtyp,
                            prdt_uv: prdt_uv,
                            prdt_vernish: prdt_vernish,
                            remark_group: remark_group,
                            prdt_deprtmnt: prdt_deprtmnt,
                            co_code :  co_code,
                            div_code : div_code,
                            usrnm : usrnm ,
                        });
                        if(req.file) {
                            newUser.filepath = req.file.path;
                            newUser.filename = req.file.filename;
                        }
                            newUser.save(function(errors){
                                if(errors){
                                    res.json({ 'success': false, 'message': 'Error in Saving User', errors: errors });
                                } else {
                                //   res.json({ 'success': true, 'message': 'User added succesfully'});
                                res.redirect('/product_mast/product_mast_list');
                                }
                            });
                    } 
                    else {
                        // return res.end("File uploaded sucessfully!.");
                            // req.flash('errors', 'Offer Added');
                            // res.redirect('/newjobentry/newjobentry_submit/'+req.params.id);
                        var errors = 'Job Card Number  already exist';
                        res.json({ 'success': false, 'message': 'Job Card Number  already exist', serialerror: 'Job Card Number  already exist ' });
                        // res.redirect('/newjobentry/newjobentry_submit/'+req.params.id);
                    }  
        });
    }
});
    // router.post('/add', upload.single('prdt_image'), (req, res, next) => {
    //     if(req.body.prdt_country=="") req.body.prdt_country=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_brdmnfctur=="") req.body.prdt_brdmnfctur=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_cnstrcton=="") req.body.prdt_cnstrcton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_vernish=="") req.body.prdt_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_dsignstyl=="") req.body.prdt_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_fldingflat=="") req.body.prdt_fldingflat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_fldingpttrn=="") req.body.prdt_fldingpttrn=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_prtyname=="") req.body.prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     if(req.body.prdt_typ_name=="") req.body.prdt_typ_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    //     let errors = req.validationErrors();
    //     if (errors) {
    //         if(req.file) {
    //             let filename = './public/uploads/product/'+req.file.filename;
    //             console.log(filename);
    //             fs.stat(filename, function (err, stats) {
    //                 console.log(stats);//here we got all information of file in stats variable
                
    //                 if (err) {
    //                     return console.error(err);
    //                 }
    //                 fs.unlink(filename,function(err){
    //                     if(err) return console.log(err);
    //                     console.log('file deleted successfully');
    //                 });  
    //             });
    //         }
    //         res.render('product_mast.hbs', {
    //             title: 'Add Product',
    //             errors: errors
    //         });
    //     } else {
    //         if (req.fileValidationError) {
    //             res.render('product_mast.hbs', {
    //                 title: 'Add Product',
    //                 errors: req.fileValidationError
    //             });     
    //         } else {
    //             let prdt = new product();
    //             prdt.prdt_typ_name=req.body.prdt_typ_name;
    //             prdt.prdt_itemcode = req.body.prdt_itemcode;
    //             prdt.prdt_subresscode= req.body.prdt_subresscode;
    //             prdt.prdt_artwkdt= req.body.prdt_artwkdt;
    //             prdt.prdt_prtyname= req.body.prdt_prtyname;
    //             prdt.location_group= req.body.location_group;
    //             prdt.pantone_group = req.body.pantone_group;
    //             prdt.prdt_pname= req.body.prdt_pname;
    //             prdt.prdt_brdqlty= req.body.prdt_brdqlty;
    //             prdt.prdt_gsmmb= req.body.prdt_gsmmb;
    //             prdt.prdt_coinscratch =req.body.prdt_coinscratch;
    //             prdt.prdt_perfration =req.body.prdt_perfration;
    //             prdt.actul_l= req.body.actul_l;
    //             prdt.actul_w= req.body.actul_w;
    //             prdt.actul_h= req.body.actul_h;
    //             prdt.prdt_gsmtp= req.body.prdt_gsmtp;
    //             prdt.pad_l= req.body.pad_l;
    //             prdt.pad_w= req.body.pad_w;
    //             prdt.pad_h= req.body.pad_h;
    //             prdt.prdt_lfcolor= req.body.prdt_lfcolor;
    //             prdt.prdt_fldingflat= req.body.prdt_fldingflat;
    //             prdt.prdt_fldingpttrn= req.body.prdt_fldingpttrn;
    //             prdt.foldng_l= req.body.foldng_l;
    //             prdt.foldng_w= req.body.foldng_w;
    //             prdt.foldng_h= req.body.foldng_h;
    //             prdt.prdt_vrtclhorzntlone= req.body.prdt_vrtclhorzntlone;
    //             prdt.prdt_vrtclhorzntltwo= req.body.prdt_vrtclhorzntltwo;
    //             prdt.prdt_tkingszmm= req.body.prdt_tkingszmm;
    //             prdt.prdt_erflp= req.body.prdt_erflp;
    //             prdt.prdt_dsignstyl= req.body.prdt_dsignstyl;
    //             prdt.prdt_country= req.body.prdt_country;
    //             prdt.prdt_nvz= req.body.prdt_nvz;
    //             prdt.prdt_brdmnfctur= req.body.prdt_brdmnfctur;
    //             prdt.prdt_cnstrcton= req.body.prdt_cnstrcton;
    //             prdt.prdt_embssrckno= req.body.prdt_embssrckno;
    //             prdt.prdt_lamination= req.body.prdt_lamination;
    //             prdt.prdt_laminationtyp= req.body.prdt_laminationtyp;
    //             prdt.prdt_uv= req.body.prdt_uv;
    //             prdt.prdt_vernish= req.body.prdt_vernish;
    //             prdt.remark_group= req.body.remark_group;
    //             prdt.prdt_deprtmnt= req.body.prdt_deprtmnt;
    //             prdt.co_code =  req.session.compid;
    //             prdt.div_code =  req.session.divid;
    //             prdt.usrnm =  req.session.user;
    //             if(req.file) {
    //                 prdt.filepath = req.file.path;
    //                 prdt.filename = req.file.filename;
    //             }
    //             prdt.save(function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                     return;
    //                 } else {
    //                     req.flash('success', 'Product Added');
    //                     res.redirect('/product_mast/product_mast_list');
    //                 }
    //             });
    //         }
    //     }
    // });
    router.get('/product_mast_list', ensureAuthenticated, function(req, res){
        product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
        if (err) {
            console.log(err);
        } else {
            res.render('product_mast_list.hbs', {
                pageTitle:'Add product',
                product: product,
            });
        }
}).populate('prdt_material').populate('prdt_country').populate('prdt_prtyname').populate('prdt_brdmnfctur').populate('prdt_cnstrcton').populate('prdt_vernish').populate('prdt_dsignstyl').populate('prdt_fldingflat').populate('prdt_fldingpttrn').populate('design_michne').populate('prdt_typ_name');
});

router.get('/product_mast_update/:id', ensureAuthenticated, function(req, res){
    product.findById(req.params.id, function(err, product){
        stockpantone.find({flag:"PANT",co_code:req.session.compid,div_code:req.session.divid}, function (err, stockpantone){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            prdttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, prdttyp){
            country.find({}, function (err, country){
            inserttyp.find({}, function (err, inserttyp){
            floading.find({}, function (err, floading){
            departmnt.find({}, function (err, departmnt){
            city.find({}, function (err, city){
            design.find({}, function (err, design){
            construction.find({}, function (err, construction){
            vernish.find({}, function (err, vernish){
            party.find({}, function (err, party){
            manufactur.find({manufactur_typ:"5bf8dfc5971f74121491300b"}, function (err, manufactur){
            machine.find({}, function (err, machine){
            if (err) {
                console.log(err);
            } else {
                res.render('product_mast_update.hbs', {
                    pageTitle:'Update product',
                    product: product,
                    stockpantone: stockpantone, 
                    prdttyp: prdttyp,   
                    country: country,
                    inserttyp: inserttyp,
                    floading: floading,
                    departmnt: departmnt,
                    city: city,
                    design: design,
                    construction: construction,
                    vernish: vernish,
                    party: party,
                    manufactur: manufactur,
                    machine: machine,
                    accessories: accessories,
                });
            }
        })
    });
});
    });
    });
    });
    });
    });
});
    });
    });
    });
});
    }).populate('stockpantone_pantonno');;
});
});
router.post('/update/:id', upload.single('prdt_image'), function(req, res){
    if(req.body.prdt_country=="") req.body.prdt_country=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_brdmnfctur=="") req.body.prdt_brdmnfctur=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_cnstrcton=="") req.body.prdt_cnstrcton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_vernish=="") req.body.prdt_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_dsignstyl=="") req.body.prdt_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingflat=="") req.body.prdt_fldingflat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingpttrn=="") req.body.prdt_fldingpttrn=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_prtyname=="") req.body.prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_typ_name=="") req.body.prdt_typ_name=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_material=="") req.body.prdt_material=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        let errors = req.validationErrors();
    if (errors) {
        if(req.file) {
            let filename = './public/uploads/product/'+req.file.filename;
            fs.stat(filename, function (err, stats) {
                console.log(stats);
                if (err) {
                    return console.error(err);
                }
                fs.unlink(filename,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });  
            });
        }
        res.json({ 'success': false, 'message': 'Validation error', errors: errors });
    } else {
        if (req.fileValidationError) {
            res.json({ 'success': false, 'message': 'File Validation error', errors: req.fileValidationError });    
        } else {
            let prdt = {};
            prdt.prdt_typ_name=req.body.prdt_typ_name;
            prdt.prdt_itemcode = req.body.prdt_itemcode;
            prdt.prdt_subresscode= req.body.prdt_subresscode;
            prdt.prdt_artwkdt= req.body.prdt_artwkdt;
            prdt.prdt_prtyname= req.body.prdt_prtyname;
            prdt.location_group= req.body.location_group;
            // prdt.pantone_group = req.body.pantone_group;
            prdt.prdt_material = req.body.prdt_material;
            prdt.prdt_pantone = req.body.prdt_pantone;
            prdt.prdt_barcode = req.body.prdt_barcode;
            prdt.prdt_pname= req.body.prdt_pname;
            prdt.prdt_brdqlty= req.body.prdt_brdqlty;
            prdt.prdt_gsmmb= req.body.prdt_gsmmb;
            prdt.prdt_coinscratch =req.body.prdt_coinscratch;
            prdt.prdt_perfration =req.body.prdt_perfration;
            prdt.actul_l= req.body.actul_l;
            prdt.actul_w= req.body.actul_w;
            prdt.actul_h= req.body.actul_h;
            prdt.flap_l= req.body.flap_l;
            prdt.flap_w= req.body.flap_w;
            prdt.flap_h= req.body.flap_h;
            prdt.prdt_gsmtp= req.body.prdt_gsmtp;
            prdt.pad_l= req.body.pad_l;
            prdt.pad_w= req.body.pad_w;
            prdt.pad_h= req.body.pad_h;
            prdt.prdt_lfcolor= req.body.prdt_lfcolor;
            prdt.prdt_fldingflat= req.body.prdt_fldingflat;
            prdt.prdt_fldingpttrn= req.body.prdt_fldingpttrn;
            prdt.foldng_l= req.body.foldng_l;
            prdt.foldng_w= req.body.foldng_w;
            prdt.foldng_h= req.body.foldng_h;
            prdt.prdt_vrtclhorzntlone= req.body.prdt_vrtclhorzntlone;
            prdt.prdt_vrtclhorzntltwo= req.body.prdt_vrtclhorzntltwo;
            prdt.prdt_tkingszmm= req.body.prdt_tkingszmm;
            prdt.prdt_erflp= req.body.prdt_erflp;
            prdt.prdt_dsignstyl= req.body.prdt_dsignstyl;
            prdt.prdt_country= req.body.prdt_country;
            prdt.prdt_nvz= req.body.prdt_nvz;
            prdt.prdt_brdmnfctur= req.body.prdt_brdmnfctur;
            prdt.prdt_cnstrcton= req.body.prdt_cnstrcton;
            prdt.prdt_embssrckno= req.body.prdt_embssrckno;
            prdt.prdt_lamination= req.body.prdt_lamination;
            prdt.prdt_laminationtyp= req.body.prdt_laminationtyp;
            prdt.prdt_uv= req.body.prdt_uv;
            prdt.prdt_vernish= req.body.prdt_vernish;
            prdt.remark_group= req.body.remark_group;
            prdt.prdt_deprtmnt= req.body.prdt_deprtmnt;
            prdt.co_code =  req.session.compid;
            prdt.div_code =  req.session.divid;
            prdt.usrnm =  req.session.user;
            if(req.file) {
                prdt.filepath = req.file.path;
                prdt.filename = req.file.filename;
                let previousFilename = './public/uploads/product/'+req.body.previousfilename;
                fs.stat(previousFilename, function (err, stats) {
                    console.log(stats);
                    if (err) {
                        return console.error(err);
                    }
                    fs.unlink(previousFilename,function(err){
                        if(err) return console.log(err);
                        console.log('file deleted successfully');
                    });  
                });
            }
            let query = {_id:req.params.id}
            product.update(query ,prdt ,function (err) {
                if (err) {
                    res.json({ 'success': false, 'message': 'Error in Saving Product', 'errors': err });
                    return;
                } else {;
                    res.redirect('/product_mast/product_mast_list');
                }
            });
        }
    }
});
        router.post('/updatedesign/:id', function(req, res) {
            if(req.body.design_michne=="") req.body.design_michne=mongoose.Types.ObjectId('578df3efb618f5141202a196');
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                ////Design Department
                prdt.dsign_phrmacd= req.body.dsign_phrmacd;
                prdt.dsign_brcd= req.body.dsign_brcd;
                prdt.dsign_shetppsiz= req.body.dsign_shetppsiz;
                prdt.dsign_uvblkt= req.body.dsign_uvblkt;
                prdt.dsign_ctsizone= req.body.dsign_ctsizone;
                prdt.dsign_ctsiztwo= req.body.dsign_ctsiztwo;
                prdt.dsign_cutinsrtone= req.body.dsign_cutinsrtone;
                prdt.dsign_cutinsrttwo= req.body.dsign_cutinsrttwo;
                prdt.dsign_relsiz= req.body.dsign_relsiz;
                prdt.dsign_ups= req.body.dsign_ups;
                prdt.dsign_grain= req.body.dsign_grain;
                prdt.dsign_dieno= req.body.dsign_dieno;
                prdt.design_michne= req.body.design_michne;
                prdt.dsign_bralletyp= req.body.dsign_bralletyp;
                prdt.dsign_brallerckno= req.body.dsign_brallerckno;
                prdt.dsign_blnktno= req.body.dsign_blnktno;
                prdt.dsign_grippr= req.body.dsign_grippr;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving product', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/product_mast/product_mast_list');
                    }
                });
            }
        });
        router.post('/updateblanketinformartion/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                ////Blanket
                prdt.blanket_name = req.body.blanket_name;
                prdt.dsign_grippr= req.body.dsign_grippr;
                prdt.dsign_blnktno= req.body.dsign_blnktno;
                prdt.blanketyp_ups = req.body.blanketyp_ups;
                prdt.blanket_sizeone = req.body.blanket_sizeone;
                prdt.blanket_sizetwo = req.body.blanket_sizetwo;
                prdt.blanket_in = req.body.blanket_in;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving product', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/product_mast/product_mast_list');
                    }
                });
            }
        });
        router.post('/updateqcdepartment/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                prdt.qc_fileno= req.body.qc_fileno;
                prdt.qc_cadesption= req.body.qc_cadesption;
                prdt.qc_coaconstrtion= req.body.qc_coaconstrtion;
                prdt.qc_psting= req.body.qc_psting;
                prdt.qc_corbx= req.body.qc_corbx;
                prdt.qc_size= req.body.qc_size;
                prdt.qc_qty= req.body.qc_qty;
                prdt.qc_ups= req.body.qc_ups;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving product', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/product_mast/product_mast_list');
                    }
                });
            }
        });
        router.post('/updatepeastedepartment/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let prdt = {};
                prdt.qc_corbx= req.body.qc_corbx;
                prdt.qc_size= req.body.qc_size;
                prdt.qc_qty= req.body.qc_qty;
                prdt.qc_ups= req.body.qc_ups;
                prdt.co_code =  req.session.compid;
                prdt.div_code =  req.session.divid;
                prdt.usrnm =  req.session.user;
                let query = {_id:req.params.id}
                product.update(query ,prdt ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving product', 'errors': err });
                        return;
                    } else {;
                        res.redirect('/product_mast/product_mast_list');
                    }
                });
            }
        });
        router.get('/delete_prodtmast/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            product.findById(req.params.id, function(err, product){
                product.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/product_mast/product_mast_list');
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