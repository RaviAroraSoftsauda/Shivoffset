const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const passport = require('passport');
let security = require('../models/security_right_schema');
let userright = require('../models/user_right_schema');
let div_com = require('../models/company_schema');
let div_mast = require('../models/division_schema');
// const popup = require('popups');

var query;

// Add Route
router.get('/userright', ensureAuthenticated, function(req, res){
    security.find({}, function (err,security){
        div_com.find({}, function (err,div_com){
            div_mast.find({}, function (err,div_mast){
            if (err) {
                console.log(err);
            } else {
                res.render('userright.hbs', {
                    pageTitle:'Add User',
                    security: security,
                    div_com: div_com,
                    div_mast: div_mast,
                });
            }
        });
    });
});
});
    router.post('/add', function(req, res){
        const usrnm = req.body.usrnm;
        const usrpwd = req.body.usrpwd;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const emailid = req.body.emailid;
        const phone_num = req.body.phone_num;
        const details = req.body.details;
        const admin = req.body.admin;
        const co_code = req.body.co_code;
        const div_code = req.body.div_code;
        const administrator = req.body.administrator;
        // req.checkBody('name', 'Name is required').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            res.json({ 'success': false, 'message': 'Validation error', errors: errors });
        } else {
            userright.findOne({usrnm: req.body.usrnm}, function(errors, user){
                if(errors) {
                    console.log(errors);
                    res.json({ 'success': false, 'message': 'Error in finding usrnm', errors: errors });
                }
                if(!user){
                    let newUser = new userright({
                        usrnm:usrnm,
                        usrpwd:usrpwd,
                        emailid:emailid,
                        first_name:first_name,
                        last_name:last_name,
                        phone_num:phone_num,
                        details:details,
                        admin:admin,
                        co_code:co_code,
                        div_code:div_code,
                        administrator:administrator,
                    });
                    bcrypt.genSalt(10, function(errors, salt) {
                        bcrypt.hash(newUser.usrpwd, salt, function(errors, hash){
                          if(errors){
                            res.json({ 'success': false, 'message': 'Error in Generating Password Hash', errors: errors });
                          }
                          newUser.usrpwd = hash;
                          newUser.save(function(errors){
                            if(errors){
                                console.log(errors);
                                res.json({ 'success': false, 'message': 'Error in Saving User', errors: errors });
                            } else {
                            //   res.json({ 'success': true, 'message': 'User added succesfully'});
                            res.redirect('/userright/admin_list');
                            }
                          });
                        });
                    });
                } else {
                    var errors = 'User already exist';
                    // window.alert('User already exist');
                    // popup.alert({
                    //     content: 'User already exist!'
                    // });
                    // "<script>alert('Updated Succesfully');window.location.href='userright/userright'</script>";
                    res.json({ 'success': false, 'message': 'User already exist', serialerror: 'User already exist ' });
                }  
            });
        }
    });
    router.get('/division', ensureAuthenticated, function(req, res){
            div_com.findById(req.query.compid, function (err,div_com){
                div_mast.findById(req.query.divid, function (err,div_mast){
                if (err) {
                    console.log(err);
                } else {
                    req.session.divid = req.query.divid;
                    res.render('index.hbs', {
                        pageTitle:'Division Selection',
                        div_com: div_com,
                        div_mast: div_mast,
                        usernm: req.session.user,
                        com_name: req.session.compnm,
                        sdate: req.session.compsdate,
                        edate: req.session.compedate,

                });
                } 
            });
    });
});
    router.get('/company', ensureAuthenticated, function(req, res){
            div_com.findById(req.query.compid, function (err,div_com){
                div_mast.find({}, function (err, div_mast) {
            // div_mast.findById(req.query, function (err,div_mast){
            if (err) {
                console.log(err);
            } else {

           
                req.session.compid = req.query.compid;
                req.session.compnm = req.query.compname;
                req.session.compsdate = div_com['sdate'];
                req.session.compedate = div_com['edate'];
                req.session.divid = req.query.divid;
                res.render('divison.hbs', {
                    pageTitle:'Company Selection',
                    div_com: div_com,
                    div_mast: div_mast,
                    usernm: req.session.user,
                    com_name: req.session.compnm
            });
            } 
        });         
        });

});
router.get('/views', ensureAuthenticated, function(req, res){
            res.render('index.hbs', {
                pageTitle:'Dashboard',

        }); 
    });
    router.get('/login', function(req, res){
        res.render('login.hbs', { title: 'Login', error: req.flash('error')[0] });  
      });
      
      // Login Process
      router.post('/login', function(req, res, next){
        req.checkBody('usrnm', 'usrnm is required').isNumeric();
         req.checkBody('usrpwd', 'usrpwd is required').notEmpty();
            let errors = req.validationErrors();
             if(errors){
          res.json({ 'error': true, 'message': 'validation error' });
        } else {
            req.session.user = req.body.usrnm;
             req.session.user = req.body.usrnm;
          passport.authenticate('local', {
            successRedirect:'/',
            failureRedirect:'/userright/login',
            failureFlash: true,
          })(req, res, next);
          
        }
   
});
      router.get('/logout', function(req, res){
        req.logout();
        req.flash('success', 'You are logged out');
        res.redirect('/userright/login');
      });
      router.get('/admin_list', ensureAuthenticated ,function(req,res){
        userright.find({}, function (err,userright){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render('admin_list.hbs',{
                    pageTitle:'admin List',
                    userright:userright
                });
            }
        });   
       });
       router.get('/admin_list_update/:id', ensureAuthenticated, function(req, res){
        userright.findById(req.params.id, function(err, userright){
            security.find({}, function (err,security){
                div_com.find({}, function (err,div_com){
                    div_mast.find({}, function (err,div_mast){
                if (err) {
                    console.log(err);
                } else {
                    res.render('admin_list_update.hbs', {
                        pageTitle:'Update Amin',
                        userright: userright, 
                        security: security,
                        div_com: div_com,
                        div_mast: div_mast,
                    });
                }
            }).sort({state_name: 'asc'});
         });
        });
    });
});
        router.post('/update/:id', function(req, res) {
            let errors = req.validationErrors();
            if (errors) {
                console.log(errors);
                res.json({ 'success': false, 'message': 'validation error', 'errors': errors });
            } else {
                let user = {}; 
                    user.usrnm = req.body.usrnm;
                    // user.usrpwd = ;
                    user.first_name = req.body.first_name;
                    user.last_name = req.body.last_name;
                    user.emailid = req.body.emailid;
                    user.phone_num = req.body.phone_num;
                    user.details = req.body.details;
                    user.admin = req.body.admin;
                    user.co_code = req.body.co_code;
                    user.div_code = req.body.div_code;
                    user.administrator = req.body.administrator;
                    bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(req.body.usrpwd, salt, function(err, hash){
                    user.usrpwd = hash;
                let query = {_id:req.params.id}
                userright.update(query ,user ,function (err) {
                    if (err) {
                        res.json({ 'success': false, 'message': 'Error in Saving State', 'errors': err });
                        return;
                    } else {
                        // res.json({ 'success': true, 'message': 'Order added succesfully' });
                        res.redirect('/userright/admin_list');
                    }
                });
            });
        });
            }
        });
        
        router.get('/delete_admin/:id', function(req, res){
            if(!req.user.id)
            {
                res.status(500).send();
            }
            let query = {_id:req.param.id}
            userright.findById(req.params.id, function(err, userright){
                userright.remove(query,function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                    // res.send('Success');
                    res.redirect('/userright/admin_list');
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