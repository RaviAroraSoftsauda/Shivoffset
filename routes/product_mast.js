const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
let product = require('../models/product_mast_schema');
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
var query;
router.get('/cityname', function (req, res) {
    city.find({co_code:req.session.compid,div_code:req.session.divid}, function(err, city){
        res.json({ 'success': true, 'city': city});
    });
});
// Add Route
router.get('/product_mast', ensureAuthenticated, function(req, res){
            product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
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
            manufactur.find({manufactur_typ:"5bf8dfc5971f74121491300b",co_code:req.session.compid,div_code:req.session.divid}, function (err, manufactur){
            if (err) {
                console.log(err);
            } else {
                res.render('product_mast.hbs', {
                    pageTitle:'Add product',
                    product: product,
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
                    manufactur: manufactur,
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
}).populate('prdt_country').populate('prdt_brdmnfctur').populate('prdt_cnstrcton').populate('prdt_vernish').populate('prdt_dsignstyl').populate('prdt_fldingflat').populate('prdt_fldingpttrn');
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
        if(req.body.prdt_country=="") req.body.prdt_country=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_brdmnfctur=="") req.body.prdt_brdmnfctur=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_cnstrcton=="") req.body.prdt_cnstrcton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_vernish=="") req.body.prdt_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_dsignstyl=="") req.body.prdt_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingflat=="") req.body.prdt_fldingflat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingpttrn=="") req.body.prdt_fldingpttrn=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_prtyname=="") req.body.prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
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
        } else {
            if (req.fileValidationError) {
                res.render('product_mast.hbs', {
                    title: 'Add Product',
                    errors: req.fileValidationError
                });     
            } else {
                let prdt = new product();
                prdt.prdt_itemcode = req.body.prdt_itemcode;
                prdt.prdt_subresscode= req.body.prdt_subresscode;
                prdt.prdt_artwkdt= req.body.prdt_artwkdt;
                prdt.prdt_prtyname= req.body.prdt_prtyname;
                prdt.location_group= req.body.location_group;
                prdt.prdt_pname= req.body.prdt_pname;
                prdt.prdt_brdqlty= req.body.prdt_brdqlty;
                prdt.prdt_gsmmb= req.body.prdt_gsmmb;
                prdt.actul_l= req.body.actul_l;
                prdt.actul_w= req.body.actul_w;
                prdt.actul_h= req.body.actul_h;
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
                }
                prdt.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'Product Added');
                        res.redirect('/product_mast/product_mast_list');
                    }
                });
            }
        }
    });
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
}).populate('prdt_country').populate('prdt_prtyname').populate('prdt_brdmnfctur').populate('prdt_cnstrcton').populate('prdt_vernish').populate('prdt_dsignstyl').populate('prdt_fldingflat').populate('prdt_fldingpttrn');
});
//     router.get('/:id', ensureAuthenticated, function(req, res){
//         product.findById(req.params.id, function(err, product){
//             city.find({}, function(err, city){
//             console.log(product);
//             if (err) {
//                 res.json({ 'success': false, 'message': 'error in fetching product details' });
//             } else {
//                 res.json({ 'success': true, 'product': product,'city': city });
//             }
            
//         });
//     });
// });

router.get('/product_mast_update/:id', ensureAuthenticated, function(req, res){
    product.findById(req.params.id, function(err, product){
        country.find({}, function (err, country){
            inserttyp.find({}, function (err, inserttyp){
            floading.find({}, function (err, floading){
            departmnt.find({}, function (err, departmnt){
            city.find({}, function (err, city){
            design.find({}, function (err, design){
            construction.find({}, function (err, construction){
            vernish.find({}, function (err, vernish){
            party.find({}, function (err, party){
            manufactur.find({manufactur_typ:"5beab94623fe5315e0150488"}, function (err, manufactur){
            machine.find({}, function (err, machine){
            if (err) {
                console.log(err);
            } else {
                res.render('product_mast_update.hbs', {
                    pageTitle:'Update product',
                    product: product, 
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
router.post('/update/:id', upload.single('prdt_image'), function(req, res){
    if(req.body.prdt_country=="") req.body.prdt_country=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_brdmnfctur=="") req.body.prdt_brdmnfctur=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_cnstrcton=="") req.body.prdt_cnstrcton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_vernish=="") req.body.prdt_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_dsignstyl=="") req.body.prdt_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingflat=="") req.body.prdt_fldingflat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_fldingpttrn=="") req.body.prdt_fldingpttrn=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.prdt_prtyname=="") req.body.prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
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
            prdt.prdt_itemcode = req.body.prdt_itemcode;
            prdt.prdt_subresscode= req.body.prdt_subresscode;
            prdt.prdt_artwkdt= req.body.prdt_artwkdt;
            prdt.prdt_prtyname= req.body.prdt_prtyname;
            prdt.location_group= req.body.location_group;
            prdt.prdt_pname= req.body.prdt_pname;
            prdt.prdt_brdqlty= req.body.prdt_brdqlty;
            prdt.prdt_gsmmb= req.body.prdt_gsmmb;
            prdt.actul_l= req.body.actul_l;
            prdt.actul_w= req.body.actul_w;
            prdt.actul_h= req.body.actul_h;
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
                    res.redirect('/product_mast/product_mast');
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