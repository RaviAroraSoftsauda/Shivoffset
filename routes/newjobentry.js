const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
let product = require('../models/product_mast_schema');
let productid = require('../models/product_mast_schema');
let party = require('../models/party_mast_schema');
let vernish = require('../models/varnish_mast_schema');
let city = require('../models/city_mast_schema');
let newjobentry = require('../models/newjobentry_mast_schema');
let newjob = require('../models/newjobentry_mast_schema');
let inserttyp = require('../models/inserttyp_mast_schema');
let floading = require('../models/floading_mast_schema');
let departmnt = require('../models/departmnt_mast_schema');
let design = require('../models/designstyl_mast_schema');
let accessories = require('../models/accessories_mast_schema');
var query;
router.post('/productdetailtable', function(req, res) {
    var itemcode = req.body.itemcode;
    product.find({prdt_itemcode:itemcode,co_code:req.session.compid,div_code:req.session.divid}, function (err, product) {
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'product': product});
        }
    }).populate('prdt_country').populate('prdt_prtyname').populate('prdt_brdmnfctur').populate('prdt_cnstrcton').populate('prdt_vernish').populate('prdt_dsignstyl').populate('prdt_fldingflat').populate('prdt_fldingpttrn').populate('prdt_typ_name');
}); 
// Add Route
router.get('/newjobentry', ensureAuthenticated, function(req, res){
    product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
        party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            if (err) {
                console.log(err);
            } else {
                res.render('newjobentry.hbs', {
                    pageTitle:'New Job Entry',
                    product: product,
                    party: party,
                });
            }
        })
});
});
router.get('/newjobentry_submit/:id', ensureAuthenticated, function(req, res){
            product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
            productid.findById(req.params.id, function(err, productid){
            newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function(err, newjobentry){
            newjob.find({co_code:req.session.compid,div_code:req.session.divid}, function(err, newjob){
            party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            vernish.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vernish){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            inserttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, inserttyp){
            floading.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, floading){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            design.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, design){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            if (err) {
                console.log(err);
            } else {
                res.render('newjobentry_submit.hbs', {
                    pageTitle:'New Job Entry',
                    product: product,
                    accessories: accessories,
                    productid: productid,
                    newjobentry: newjobentry,
                    newjob: newjob,
                    party: party,
                    vernish: vernish,
                    city: city,
                    inserttyp: inserttyp,
                    floading: floading,
                    departmnt: departmnt,
                    design: design,
                });
            }
        })
    })
    })
    })
})
})
})
})
}).sort('-newjb_jbcrdno');
}).sort('-newjb_jbcrd');
})
}).populate('prdt_prtyname');
});
router.post('/add/:id', function(req, res){
    if(req.body.productid=="") req.body.productid=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_dlvat=="") req.body.newjb_dlvat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_prtynm=="") req.body.newjb_prtynm=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_vernish=="") req.body.newjb_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_locton=="") req.body.newjb_locton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_folft=="") req.body.newjb_folft=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_dsignstyl=="") req.body.newjb_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        if(req.body.newjb_matril=="") req.body.newjb_matril=mongoose.Types.ObjectId('578df3efb618f5141202a196');
        const productid= req.body.productid;
        const newjb_itemcd= req.body.newjb_itemcd;
        const newjb_dlvat= req.body.newjb_dlvat;
        const newjb_jbcrd= req.body.newjb_jbcrd;
        const newjb_jbcrdno =req.body.newjb_jbcrdno; 
        const newjb_pono= req.body.newjb_pono;
        const newjobdate= req.body.newjobdate;
        const newjb_podt= req.body.newjb_podt;
        const newjb_prtynm= req.body.newjb_prtynm;
        const newjb_lmiton= req.body.newjb_lmiton;
        const newjb_vernish= req.body.newjb_vernish;
        const newjb_gsm= req.body.newjb_gsm;
        const newjb_matril= req.body.newjb_matril;
        const newjb_cutsz= req.body.newjb_cutsz;
        const newjb_pichng= req.body.newjb_pichng;
        const newjb_actulsz= req.body.newjb_actulsz;
        const newjb_vrnshuv= req.body.newjb_vrnshuv;
        const newjb_folfltszl= req.body.newjb_folfltszl;
        const newjb_folfltszw= req.body.newjb_folfltszw;
        const newjb_folfltszh= req.body.newjb_folfltszh;
        const newjb_folft= req.body.newjb_folft;
        const newjb_ups= req.body.newjb_ups;
        const newjb_remks= req.body.newjb_remks;
        const newjb_stckhnd= req.body.newjb_stckhnd;
        const newjb_dsignstyl= req.body.newjb_dsignstyl;
        const newjb_locton= req.body.newjb_locton;
        const newjb_sndshdcrd= req.body.newjb_sndshdcrd;
        const newjb_tp= req.body.newjb_tp;
        const newjb_chng= req.body.newjb_chng;
        const newjb_nwjb= req.body.newjb_nwjb;
        const newjb_rupes= req.body.newjb_rupes;
        const co_code =  req.session.compid;
        const div_code =  req.session.divid;
        const usrnm =  req.session.user;
    let errors = req.validationErrors();
    if (errors) {
        res.json({ 'success': false, 'message': 'Validation error', errors: errors });
    } else {
        newjobentry.findOne({newjb_jbcrd: req.body.newjb_jbcrd}, function(errors, newjob){
            if(errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'Error in finding usrnm', errors: errors });
            }
            if(!newjob){
                let newUser = new newjobentry({
                    productid: productid,
                    newjb_itemcd: newjb_itemcd,
                    newjb_dlvat: newjb_dlvat,
                    newjb_jbcrd: newjb_jbcrd,
                    newjb_jbcrdno :newjb_jbcrdno, 
                    newjb_pono: newjb_pono,
                    newjobdate: newjobdate,
                    newjb_podt: newjb_podt,
                    newjb_prtynm: newjb_prtynm,
                    newjb_lmiton: newjb_lmiton,
                    newjb_vernish: newjb_vernish,
                    newjb_gsm: newjb_gsm,
                    newjb_matril: newjb_matril,
                    newjb_cutsz: newjb_cutsz,
                    newjb_pichng: newjb_pichng,
                    newjb_actulsz: newjb_actulsz,
                    newjb_vrnshuv: newjb_vrnshuv,
                    newjb_folfltszl: newjb_folfltszl,
                    newjb_folfltszw: newjb_folfltszw,
                    newjb_folfltszh: newjb_folfltszh,
                    newjb_folft: newjb_folft,
                    newjb_ups: newjb_ups,
                    newjb_remks: newjb_remks,
                    newjb_stckhnd: newjb_stckhnd,
                    newjb_dsignstyl: newjb_dsignstyl,
                    newjb_locton: newjb_locton,
                    newjb_sndshdcrd: newjb_sndshdcrd,
                    newjb_tp: newjb_tp,
                    newjb_chng: newjb_chng,
                    newjb_nwjb: newjb_nwjb,
                    newjb_rupes: newjb_rupes,
                    co_code :  co_code,
                    div_code : div_code,
                    usrnm : usrnm ,
                });
                      newUser.save(function(errors){
                        if(errors){
                            res.json({ 'success': false, 'message': 'Error in Saving User', errors: errors });
                        } else {
                        //   res.json({ 'success': true, 'message': 'User added succesfully'});
                        res.redirect('/newjobentry/newjobentry_list');
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
// router.post('/add',function(req, res){
//     if(req.body.productid=="") req.body.productid=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_dlvat=="") req.body.newjb_dlvat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_prtynm=="") req.body.newjb_prtynm=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_vernish=="") req.body.newjb_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_locton=="") req.body.newjb_locton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_folft=="") req.body.newjb_folft=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     if(req.body.newjb_dsignstyl=="") req.body.newjb_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
//     let errors = req.validationErrors();
//     if(errors)
//     {
//         console.log(errors);
//     }
//     else
//     {
//         let newjob = new newjobentry();
//         newjob.productid= req.body.productid;
//         newjob.newjb_itemcd= req.body.newjb_itemcd;
//         newjob.newjb_dlvat= req.body.newjb_dlvat;
//         newjob.newjb_jbcrd= req.body.newjb_jbcrd;
//         newjob.newjb_jbcrdno =req.body.newjb_jbcrdno; 
//         newjob.newjb_pono= req.body.newjb_pono;
//         newjob.newjobdate= req.body.newjobdate;
//         newjob.newjb_podt= req.body.newjb_podt;
//         newjob.newjb_prtynm= req.body.newjb_prtynm;
//         newjob.newjb_lmiton= req.body.newjb_lmiton;
//         newjob.newjb_vernish= req.body.newjb_vernish;
//         newjob.newjb_gsm= req.body.newjb_gsm;
//         newjob.newjb_matril= req.body.newjb_matril;
//         newjob.newjb_cutsz= req.body.newjb_cutsz;
//         newjob.newjb_pichng= req.body.newjb_pichng;
//         newjob.newjb_actulsz= req.body.newjb_actulsz;
//         newjob.newjb_vrnshuv= req.body.newjb_vrnshuv;
//         newjob.newjb_folfltszl= req.body.newjb_folfltszl;
//         newjob.newjb_folfltszw= req.body.newjb_folfltszw;
//         newjob.newjb_folfltszh= req.body.newjb_folfltszh;
//         newjob.newjb_folft= req.body.newjb_folft;
//         newjob.newjb_ups= req.body.newjb_ups;
//         newjob.newjb_remks= req.body.newjb_remks;
//         newjob.newjb_stckhnd= req.body.newjb_stckhnd;
//         newjob.newjb_dsignstyl= req.body.newjb_dsignstyl;
//         newjob.newjb_locton= req.body.newjb_locton;
//         newjob.newjb_sndshdcrd= req.body.newjb_sndshdcrd;
//         newjob.newjb_tp= req.body.newjb_tp;
//         newjob.newjb_chng= req.body.newjb_chng;
//         newjob.newjb_nwjb= req.body.newjb_nwjb;
//         newjob.newjb_rupes= req.body.newjb_rupes;
//         newjob.co_code =  req.session.compid;
//         newjob.div_code =  req.session.divid;
//         newjob.usrnm =  req.session.user;
//         newjob.save(function (err){
//             if(err)
//             {
//                 res.json({'success':false,'message':'error in saving pantone','errors':err});
//                 return;
//             }
//             else
//             {
//                 res.redirect('/newjobentry/newjobentry_list');
//             }
//         });
//     }
// });
router.get('/newjobentry_list', ensureAuthenticated, function(req, res){
    newjobentry.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, newjobentry){
        product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
        if (err) {
        console.log(err);
    } else {
        res.render('newjobentry_list.hbs', {
            pageTitle:'New Job Entry List',
            newjobentry: newjobentry,
            product: product,
        });
    }
}).populate('prdt_prtyname');
}).populate('newjb_matril').populate('newjb_dlvat').populate('newjb_prtynm').populate('newjb_locton').populate('newjb_vernish').populate('newjb_folft').populate('newjb_dsignstyl').populate('newjb_prtynm');
});
router.get('/newjobentry_update/:id', ensureAuthenticated, function(req, res){
            product.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, product){
            newjobentry.findById(req.params.id, function(err, newjobentry){
            party.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, party){
            vernish.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, vernish){
            city.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, city){
            inserttyp.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, inserttyp){
            floading.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, floading){
            departmnt.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, departmnt){
            design.find({co_code:req.session.compid,div_code:req.session.divid}, function (err, design){
            accessories.find({flag:"ACC",co_code:req.session.compid,div_code:req.session.divid}, function (err, accessories){
            if (err) {
                console.log(err);
            } else {
                res.render('newjobentry_update.hbs', {
                    pageTitle:'New Job Entry Update',
                    product: product,
                    accessories: accessories,
                    productid: productid,
                    newjobentry: newjobentry,
                    party: party,
                    vernish: vernish,
                    city: city,
                    inserttyp: inserttyp,
                    floading: floading,
                    departmnt: departmnt,
                    design: design,
                });
            }
        })
    })
    })
})
})
})
})
});
})
}).populate('prdt_prtyname');
});
router.post('/update/:id', function(req, res) {
    if(req.body.productid=="") req.body.productid=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_dlvat=="") req.body.newjb_dlvat=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_prtynm=="") req.body.newjb_prtynm=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_vernish=="") req.body.newjb_vernish=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_locton=="") req.body.newjb_locton=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_folft=="") req.body.newjb_folft=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_dsignstyl=="") req.body.newjb_dsignstyl=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    if(req.body.newjb_matril=="") req.body.newjb_matril=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
    } else {
        let newjob = {};
        newjob.productid= req.body.productid;
        newjob.newjb_itemcd= req.body.newjb_itemcd;
        newjob.newjb_dlvat= req.body.newjb_dlvat;
        newjob.newjb_jbcrd= req.body.newjb_jbcrd;
        newjob.newjb_jbcrdno =req.body.newjb_jbcrdno; 
        newjob.newjb_pono= req.body.newjb_pono;
        newjob.newjobdate= req.body.newjobdate;
        newjob.newjb_podt= req.body.newjb_podt;
        newjob.newjb_prtynm= req.body.newjb_prtynm;
        newjob.newjb_lmiton= req.body.newjb_lmiton;
        newjob.newjb_vernish= req.body.newjb_vernish;
        newjob.newjb_gsm= req.body.newjb_gsm;
        newjob.newjb_matril= req.body.newjb_matril;
        newjob.newjb_cutsz= req.body.newjb_cutsz;
        newjob.newjb_pichng= req.body.newjb_pichng;
        newjob.newjb_actulsz= req.body.newjb_actulsz;
        newjob.newjb_vrnshuv= req.body.newjb_vrnshuv;
        newjob.newjb_folfltszl= req.body.newjb_folfltszl;
        newjob.newjb_folfltszw= req.body.newjb_folfltszw;
        newjob.newjb_folfltszh= req.body.newjb_folfltszh;
        newjob.newjb_folft= req.body.newjb_folft;
        newjob.newjb_ups= req.body.newjb_ups;
        newjob.newjb_remks= req.body.newjb_remks;
        newjob.newjb_stckhnd= req.body.newjb_stckhnd;
        newjob.newjb_dsignstyl= req.body.newjb_dsignstyl;
        newjob.newjb_locton= req.body.newjb_locton;
        newjob.newjb_sndshdcrd= req.body.newjb_sndshdcrd;
        newjob.newjb_tp= req.body.newjb_tp;
        newjob.newjb_chng= req.body.newjb_chng;
        newjob.newjb_nwjb= req.body.newjb_nwjb;
        newjob.newjb_rupes= req.body.newjb_rupes;
        newjob.co_code =  req.session.compid;
        newjob.div_code =  req.session.divid;
        newjob.usrnm =  req.session.user;
        let query = {_id:req.params.id}
        newjobentry.update(query ,newjob ,function (err) {
            if (err) {
                res.json({ 'success': false, 'message': 'Error in Saving manufctur', 'errors': err });
                return;
            } else {;
                res.redirect('/newjobentry/newjobentry_list');
            }
        });
    }
});
router.post('/productdetail', function(req, res) {
    var prdt_prtyname = req.body.prdt_prtyname;
    var prdt_pname = req.body.prdt_pname;
    if (prdt_prtyname=="") prdt_prtyname=mongoose.Types.ObjectId('578df3efb618f5141202a196');   
    if (prdt_pname=="") prdt_pname=mongoose.Types.ObjectId('578df3efb618f5141202a196');
    product.find({$or:[{prdt_prtyname: prdt_prtyname},{prdt_pname:prdt_pname}],co_code:req.session.compid,div_code:req.session.divid}, function (err, product) {
     if (err) {
            console.log(err);
        } else {
            res.json({ 'success': true, 'product': product});
        }
    }).populate('prdt_country').populate('prdt_prtyname').populate('prdt_brdmnfctur').populate('prdt_cnstrcton').populate('prdt_vernish').populate('prdt_dsignstyl').populate('prdt_fldingflat').populate('prdt_fldingpttrn').populate('prdt_typ_name');
}); 

        router.get('/delete_newjobentry/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            newjobentry.findById(req.params.id, function(err, newjobentry){
                newjobentry.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    res.redirect('/newjobentry/newjobentry_list');
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