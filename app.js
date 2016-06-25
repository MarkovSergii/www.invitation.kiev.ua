/**
 * Created by Markoff on 30.11.2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var favicon = require('serve-favicon');

var con = require('consolidate');
var session = require('cookie-session');
var hbs = require('handlebars');
var moment = require('moment');
var adminSMTPCtrl = require('./controllers/adminSMTPCtrl')();
var email = require('./own_modules/email');
var router = require('./route');

app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CookieParser());
app.use(session({keys:['la-la']}));
app.use(express.static('public'));

// Teamplating Helper
hbs.registerHelper('IFactive',function(v1,v2,options){
    if (v1==v2) {
        return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
});

hbs.registerHelper('IFNOTactive',function(v1,v2,options){
    if (v1!=v2) {
        return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
});

hbs.registerHelper('IFactive_sub',function(v11,v22,options){
    if (v11==v22) {
        return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
});

hbs.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});
// Teamplating
app.engine('hbs',con.handlebars);
app.set('view engine','hbs');
app.set('views', __dirname+'/views');


adminSMTPCtrl.get_settings_smtp_JSON(function(data){
    if (data.status)
    {
        email.InitializeSMTP(data.data);
    }
    else
    {
        //defaul settings
    }

});



app.use(router);


module.exports = app;
