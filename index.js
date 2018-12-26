const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const hbs = require('hbs');
const moment = require('moment');
const div_com = require('./models/company_schema');
let userright = require('./models/user_right_schema');



var url = "mongodb://localhost:27017/suda";
var onlineurl = "mongodb://mishrarohit:rohit123@ds249123.mlab.com:49123/shivoffset";

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGOLAB_URI || onlineurl);

let db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use('*/css', express.static('public/css'));
app.use('*/js', express.static('public/js'));
app.use('*/images', express.static('public/images'));
app.use('*/fonts', express.static('public/fonts'));
app.use('*/uploads', express.static('public/uploads'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('equal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue != rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
hbs.registerHelper('dateformat', function (datetime, format) {
    return moment(datetime).tz("Asia/Kolkata").format(format);
});

hbs.registerHelper("contains", function( value, strval ){
    var xx ="Y";
    if (strval.search(value) > -1) xx = "checked";
    else xx = "Y";
    return xx;
});
hbs.registerHelper('maxstokno', function (context) {
    // var maxsno = parseInt(context[0].stockpantone_rcpno)+1;
    // return maxsno;
    var lstcode =0;
    if (context.toString().length == 0) lstcode =0; 
    else lstcode = context[0].stockpantone_rcpno; 
    var maxsno = parseInt(lstcode)+1;
    return maxsno;
 });
 hbs.registerHelper('maxno', function (context) {
    var lstcode =0;
    if (context.toString().length == 0) lstcode =0; 
    else lstcode = context[0].newjb_jbcrd; 
    var maxsno = parseInt(lstcode)+1;
    return maxsno;
 });
 hbs.registerHelper('maxnewjobcard', function (context) {
    var lstcode =0;
    if (context.toString().length == 0) lstcode =0; 
    else lstcode = context[0].newjb_jbcrdno; 
    var maxsno = parseInt(lstcode)+1;
    return maxsno;
 });
 hbs.registerHelper('maxentryno', function (context,lvalue) {
    var lstcode =0;
    if (context.toString().length == 0) lstcode =0; 
    else lstcode = context[0].jobprcss_entryno; 
    var maxsno = parseInt(lstcode)+1;
    return maxsno;
 });
 hbs.registerHelper('maxaccno', function (context,lvalue) {
    var lstcode =0;
    if (context.toString().length == 0) lstcode =0; 
    else lstcode = context[0].ref_no; 
    var maxsno = parseInt(lstcode)+1;
    return maxsno;
 });
hbs.registerHelper('chkchecked', function(vlu,cvlu) {

    console.log(vlu);
    var ret = "";
    if (vlu == cvlu) ret = "checked";
    else ret = "";
    return ret;
});
hbs.registerHelper("compare", function( value, strval ){
    // fallback...
    // array = ( array instanceof Array ) ? array : [array];
    // console.log(value);
    var xx ="Y";
    if (value == strval) xx = "selected";
    else xx = "";
    return xx;
});

hbs.registerHelper('notequal', function (lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if (lvalue == rvalue) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

hbs.registerHelper('subtract', function (lvalue, rvalue, options) {
    if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    var newvalue = lvalue - rvalue;
    return newvalue;
});

hbs.registerHelper('sum', function (lvalue, rvalue, options) {
    if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
    }
    var newvalue = lvalue + rvalue;
    return newvalue;
});

hbs.registerHelper('listbsrt', function(context, BSRT, rvalue,listid, options ) {
    var ret = "<select class='form-control add_btn' name='"+rvalue+"' id='"+listid+"'><option>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        
            if ((context[i].p_type).search(BSRT)>=0) 
            {
                console.log((context[i].p_type).search(BSRT));
                ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
            }
    }
    
    return ret + "</select>";
});
hbs.registerHelper('list', function(context, lvalue, rvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='offerproductname'>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('departmntlist', function(context, lvalue, rvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='offerproductname'>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('listrt', function(context , lvalue, rvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='offerproductname'><option value=''>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
          
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('listrtcomp', function(context , lvalue, rvalue,idvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='"+idvalue+"'><option value=''>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-productid='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"</option>";
          
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('listjob', function(context , lvalue, rvalue,idvalue, options) {
    var ret = "<select class='form-control' name='"+rvalue+"' id='"+idvalue+"' onchange='foldername();'><option value=''>Select</option>";
    for(var i=0, j=context.length; i<j; i++) {
        if ((context[i]._id).toString().trim() == lvalue.toString().trim()) {
            ret = ret + "<option value='"+context[i]._id+"' selected='' data-prdttyp='"+options.fn(context[i]).trim()+"'>"+options.fn(context[i]).trim()+"</option>";
        } else {
            ret = ret + "<option value='"+context[i]._id+"' data-prdttyp='"+options.fn(context[i]).trim()+"'>"+options.fn(context[i]).trim()+"</option>";
          
        }
    }
    return ret + "</select>";
});
hbs.registerHelper('checklist', function(context , lvalue, options) {
    var ret = "";
    for(var i=0, j=context.length; i<j; i++) {
        if ((lvalue).toString().search(context[i]._id)>=0) {
            ret = ret + ""+options.fn(context[i]).trim()+"";
        }
    }
    
    return ret + "";
});
hbs.registerHelper('checklist', function(context , context) {
        var index = context.indexOf(context)
        if (index >-1) {
            context.splice(index,1);
        } else {
            context.push(context)
        }
});

hbs.registerHelper('checkdynmc', function(context , lvalue, options) {
    var ret="";
    for(var i=0, j=context.length; i<j; i++) {
        var found = false;
        for(var x=0, y=lvalue.length; x<y; x++) {
            if ((context[i]._id).toString().trim() == lvalue[x].toString().trim()){
                found=true;
            }
        }
        if (found)
        {
            ret = ret + "<input type='checkbox' name='prdt_deprtmnt[]' id='prdt_deprtmnt' onclick='deprt();' checked value='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"";
        }
        else
        {
            ret = ret + "<input type='checkbox' name='prdt_deprtmnt[]' id='prdt_deprtmnt' onclick='deprt();' value='"+context[i]._id+"'>"+options.fn(context[i]).trim()+"";  
        }
    }
    return ret + "";
});
hbs.registerHelper('dateformat', function (datetime, format) {
    return moment(datetime).format(format);
});
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(session({
    key: 'user_sid',
    secret: 'keyboard sesskey',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/userright/login');
    }
}
// Home Route
app.get('/', loggedIn, function (req, res,err) {
    userright.findOne({usrnm: req.session.user}, function(err,userright){
    req.session.co_code =userright['co_code'];
    req.session.div_code =userright['div_code'];
    div_com.find({},function (err, div_com){
        if (err) {
            console.log(err);
        } else {           
            
            res.render('company.hbs', {
                div_com: div_com,
                pageTitle: 'Company Selection',
            }); 
        }
    }); 
}); 
});

// Route Files
// let users = require('./routes/users');
let users = require('./routes/userright');
let security_right = require('./routes/security_right');
let product_type_mast = require('./routes/product_type_mast');
let country_mast = require('./routes/country_mast');
let state_mast = require('./routes/state_mast');
let city_mast = require('./routes/city_mast');
let varnish_mast = require('./routes/varnish_mast');
let blankettyp_mast = require('./routes/blankettyp_mast');
let designstyl_mast = require('./routes/designstyl_mast');
let manufactur_mast = require('./routes/manufactur_mast');
let construction_mast = require('./routes/construction_mast');
let inserttyp_mast = require('./routes/inserttyp_mast');
let floading_mast = require('./routes/floading_mast');
let deviation_mast = require('./routes/deviation_mast');
let complaint_mast = require('./routes/complaint_mast');
let vehiclemaintnce_mast = require('./routes/vehiclemaintnce_mast');
let trnsportagncy_mast = require('./routes/trnsportagncy_mast');
let accessriestyp_mast = require('./routes/accessriestyp_mast');
let accessubtyp_mast = require('./routes/accessubtyp_mast');
let accessories_mast = require('./routes/accessories_mast');
let machine_mast = require('./routes/machine_mast');
let departmnt_mast = require('./routes/departmnt_mast');
let sop_mast = require('./routes/sop_mast');
let product_mast = require('./routes/product_mast');
let party_mast = require('./routes/party_mast');
let party_type_mast = require('./routes/party_type_mast');
let supplier_mast = require('./routes/supplier_mast');
let driver_mast = require('./routes/driver_mast');
let rackloc_mast = require('./routes/rackloc_mast');
let pantone_mast = require('./routes/pantone_mast');
let employee_mast = require('./routes/employee_mast');
let vehicle_mast = require('./routes/vehicle_mast');
let maintance_mast = require('./routes/maintance_mast');
let machinechecklist_mast = require('./routes/machinechecklist_mast');
let qcequimnts_mast = require('./routes/qcequimnts_mast');
let jobactivty_mast = require('./routes/jobactivty_mast');
let stockpantone_mast = require('./routes/stockpantone_mast');
let newjobentry = require('./routes/newjobentry');
let jobprocessentry = require('./routes/jobprocessentry');
let accessories_recepit_note = require('./routes/accessories_recepit_note');
let accessories_issue_note = require('./routes/accessories_issue_note');
let plate_issuance_note = require('./routes/plate_issuance_note');
let plate_preparation_report = require('./routes/plate_preparation_report');
let plate_receval_note = require('./routes/plate_receval_note');
let ink_preparation = require('./routes/ink_preparation');
let detruction_note_entry = require('./routes/detruction_note_entry');
// app.use('/users', users);
app.use('/userright', users);
app.use('/security_right', security_right);
app.use('/product_type_mast', product_type_mast);
app.use('/country_mast', country_mast);
app.use('/state_mast', state_mast);
app.use('/city_mast', city_mast);
app.use('/varnish_mast', varnish_mast);
app.use('/blankettyp_mast', blankettyp_mast);
app.use('/designstyl_mast', designstyl_mast);
app.use('/manufactur_mast', manufactur_mast);
app.use('/construction_mast', construction_mast);
app.use('/inserttyp_mast', inserttyp_mast);
app.use('/floading_mast', floading_mast);
app.use('/deviation_mast', deviation_mast);
app.use('/complaint_mast', complaint_mast);
app.use('/vehiclemaintnce_mast', vehiclemaintnce_mast);
app.use('/trnsportagncy_mast', trnsportagncy_mast);
app.use('/accessriestyp_mast', accessriestyp_mast);
app.use('/accessubtyp_mast', accessubtyp_mast);
app.use('/accessories_mast', accessories_mast);
app.use('/machine_mast', machine_mast);
app.use('/departmnt_mast', departmnt_mast);
app.use('/sop_mast', sop_mast);
app.use('/product_mast', product_mast);
app.use('/party_mast', party_mast);
app.use('/party_type_mast', party_type_mast);
app.use('/supplier_mast',supplier_mast);
app.use('/driver_mast',driver_mast);
app.use('/rackloc_mast',rackloc_mast);
app.use('/pantone_mast',pantone_mast);
app.use('/employee_mast',employee_mast);
app.use('/vehicle_mast',vehicle_mast);
app.use('/maintance_mast',maintance_mast);
app.use('/machinechecklist_mast',machinechecklist_mast);
app.use('/qcequimnts_mast',qcequimnts_mast);
app.use('/jobactivty_mast',jobactivty_mast);
app.use('/stockpantone_mast',stockpantone_mast);
app.use('/newjobentry',newjobentry);
app.use('/jobprocessentry',jobprocessentry);
app.use('/accessories_recepit_note',accessories_recepit_note);
app.use('/accessories_issue_note',accessories_issue_note);
app.use('/plate_issuance_note',plate_issuance_note);
app.use('/plate_preparation_report',plate_preparation_report);
app.use('/plate_receval_note',plate_receval_note);
app.use('/ink_preparation',ink_preparation);
app.use('/detruction_note_entry',detruction_note_entry);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


