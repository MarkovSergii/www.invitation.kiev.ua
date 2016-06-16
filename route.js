/**
 * Created by user on 09.05.2016.
 */
var express = require('express');
var router = express.Router();
var passport =  require ('passport');
var LocalStrategy  =  require ('passport-local');

var adminRenderCtrl = require('./controllers/adminRenderCtrl')();
var userCtrl = require('./controllers/userCtrl')();
var pageCtrl = require('./controllers/pageCtrl')();
var menuCtrl = require('./controllers/menuCtrl')();
var adminSMTPCtrl = require('./controllers/adminSMTPCtrl')();
var adminFileCtrl = require('./controllers/adminFileCtrl')();
var settingsCtrl = require('./controllers/settingsCtrl')();

var email = require('./own_modules/email');




// Passport:
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, function(username, password,done){



    userCtrl.findUserByCredentials({email:username,password:password},function(err,result){

        if (err) done(null,false);

        if (result.status == true)
        {

            done(null, result.user);
        }
        else
        {
            done(null,false)
        }
    });


}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var pass = passport.authenticate('local',{ successRedirect: '/' });

var mustBeAuth = function(req,res,next){

    if (req.isAuthenticated()) { next() }
    else res.render('401',{});

};

var mustBeAdmin = function(req,res,next){

    if (req.isAuthenticated())
    {

        if (req.user.role == 'admin')
        {
            next()
        }
        else
        {
            res.render('403',{})
        }
    }
    else
    {
        res.render('401',{})
    }
};

router.get('/',userCtrl.index);
router.get('/page/:id',userCtrl.get_page);
router.get('/exhibitions',userCtrl.get_exhibitions);

//router.post('/login',pass);


router.post('/login',function(req,res)
{
    pass(req,res);
   // console.log(req.user);
   // res.send('ok');
});
/*router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),function(err, user) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(user);
  //  res.send("ok");
});*/


router.get('/logout',userCtrl.logout);
router.get('/registration',userCtrl.registration);
router.get('/verificate/:id',userCtrl.user_email_verificate);

router.post('/forgot_ask',userCtrl.ask_change_password); // send email
router.get('/user/new_pass/:id',userCtrl.user_form_new_password); //  form for change
router.post('/user/change_password',userCtrl.change_password); // change pass

//add user
router.post('/user',userCtrl.adduser);



// auth area
router.get('/user',mustBeAuth);
router.get('/user/*',mustBeAuth);
//router.get('/user',userCtrl.index);

// admin section
router.get('/admin',mustBeAdmin);
router.get('/admin/*',mustBeAdmin);
router.get('/admin/logout',userCtrl.logout);


// render admin pages
router.get('/admin/',adminRenderCtrl.index);
router.get('/admin/menu/admin_dashboard',adminRenderCtrl.menu_dashboard);
router.get('/admin/menu/template_edit',adminRenderCtrl.template_edit);
router.get('/admin/menu/menu_edit',adminRenderCtrl.menu_edit);
router.get('/admin/menu/page_edit',adminRenderCtrl.page_edit);
router.get('/admin/menu/exhibition_calender',adminRenderCtrl.menu_calendar);
router.get('/admin/menu/users',adminRenderCtrl.menu_users);
router.get('/admin/menu/settings_smtp',adminRenderCtrl.settings_smtp);
router.get('/admin/menu/other_settings',adminRenderCtrl.other_settings);


// exhibitions
router.get('/exhibition/:id',userCtrl.goToExhibition);

// pages
router.get('/admin/page/:id',pageCtrl.findPage);
router.post('/admin/page/:id',pageCtrl.updatePage);
router.post('/admin/page/:id/delete',pageCtrl.deletePage);
router.post('/admin/pages',pageCtrl.createPage);
router.get('/admin/pages',pageCtrl.getAllPages_JSON); // json

// menus
router.get('/admin/menuitem/:id',menuCtrl.findMenuItem);
router.post('/admin/menuitem/:id',menuCtrl.updateMenuItem);
router.post('/admin/menuitem/:id/delete',menuCtrl.deleteMenuItem);
router.post('/admin/menuitems',menuCtrl.createMenuItem);

// smtp
//router.get('/admin/smtp/settings_smtp',adminSMTPCtrl.get_settings_smtp_JSON);
router.post('/admin/smtp/save_settings_smtp',adminSMTPCtrl.set_settings_smtp);
//console.log(data);
//email.InitializeSMTP(data);
router.post('/admin/send_test_email',adminSMTPCtrl.sendEmail);

// files
router.get('/admin/file',adminFileCtrl.readFile);
router.post('/admin/file',adminFileCtrl.saveFile);
router.post('/admin/file/delete',adminFileCtrl.deleteFile);

// settings

router.post('/admin/settings/registration_data',settingsCtrl.set_registration_type);


module.exports = router;