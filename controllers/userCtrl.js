/**
 * Created by user on 01.06.2016.
 */

var userModel = require('../models/userModel');
var menuModel = require('../models/menuModel');
var pageModel = require('../models/pageModel');
var users_ordersModel = require('../models/users_ordersModel');
var users_answersModel = require('../models/users_answersModel');


var exhibitionModel = require('../models/exhibitionModel');
var global_func = require('../own_modules/func');
var dictionary = require('../own_modules/translations');
var settingsModel = require('../models/settingsModel');
var email = require('../own_modules/email');

var async = require('async');
var hbs = require('handlebars');
var bwipjs = require('bwip-js');


bwipjs.loadFont('Inconsolata', 108,
    require('fs').readFileSync('fonts/Inconsolata.otf', 'binary'));


var def_lang = 'ru';
//var curent_lang = def_lang;

var languages = [{name:"ru"},{name:"en"},{name:"ukr"}];

function arrayObjectIndexOf(myArray, searchTerm, property, next) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

var get_main_template = function(req, res,callback)
{
    if (req.cookies.lang) {
       // curent_lang = req.cookies.lang;
    }
    else {
        // save def_lang
        res.cookie('lang', def_lang);
       // curent_lang = def_lang;
    }

    menuModel.getAllMenuItems(function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            var menu1 = [];
            for (var i = 0; i < data.length; i++) {

                //  console.log(data);
                var one_item = {};
                var item = data[i];

                one_item.id = item.id;
                one_item.name = item['name_' + req.cookies.lang];
                one_item.page_id = item['page_id'];
            /*    if (item['page_id']==page_id)
                {
                    one_item.isactive = true
                }
                else{
                    one_item.isactive = false
                };*/
                one_item.sort_position = item.sort_position;

                if (item['content_type'] == 'content') {
                    one_item.link = '/page/' + item['page_id'];
                }
                else {
                    one_item.link = item['link_' + req.cookies.lang];
                }


                one_item.subs = [];


                if (item.root_id) {
                    var s_index = arrayObjectIndexOf(menu1, item.root_id, 'id');
                    menu1[s_index].subs.push(one_item);
                    menu1[s_index].isactive = false;

                }
                else {
                    menu1.push(one_item);
                }

            }
            menu1.sort(function (a, b) {
                return a.sort_position > b.sort_position
            });



            callback(null,{lang: languages, user: req.user, menu_items: menu1,dictionary:dictionary(req.cookies.lang)});


        }

    });



};





var get_full_page = function (req, res, page_id, callback) {

    if (req.cookies.lang) {
      //  curent_lang = req.cookies.lang;
    }
    else {
        // save def_lang
        res.cookie('lang', def_lang);
      //  curent_lang = def_lang;
    }

    menuModel.getAllMenuItems(function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            var menu1 = [];
            for (var i = 0; i < data.length; i++) {

                //  console.log(data);
                var one_item = {};
                var item = data[i];

                one_item.id = item.id;
                one_item.name = item['name_' + req.cookies.lang];
                one_item.page_id = item['page_id'];
                if (item['page_id']==page_id)
                {
                    one_item.isactive = true
                }
                else{
                    one_item.isactive = false
                };
                one_item.sort_position = item.sort_position;

                if (item['content_type'] == 'content') {
                    one_item.link = '/page/' + item['page_id'];
                }
                else {
                    one_item.link = item['link_' + req.cookies.lang];
                }


                one_item.subs = [];


                if (item.root_id) {
                    var s_index = arrayObjectIndexOf(menu1, item.root_id, 'id');
                    menu1[s_index].subs.push(one_item);
                    menu1[s_index].isactive = false;

                }
                else {
                    menu1.push(one_item);
                }

            }
            menu1.sort(function (a, b) {
                return a.sort_position > b.sort_position
            });


                if (page_id==2)
                {

                  //  var today = Date.now();
                    var today = new Date;
                    today.setHours(0, 0, 0, 0);
                    var params = {
                        $and:
                            [
                                {
                                    'date_end':
                                     {
                                        '$gte': today
                                     }
                                },
                                {
                                    visible: true
                                }
                            ]
                    };
                   // var params = null;
                  //  console.log(params);
                    exhibitionModel.get_exhibition_list(params,function(err,data){
                        // get exhibitions all blocks
                        var ex_block = "";
                        if (data.length == 0)
                        {
                            ex_block = 'no exhibitions';
                            callback(null,{lang: languages, user: req.user, menu_items: menu1, content: ex_block,dictionary:dictionary(req.cookies.lang)});
                        }
                        else
                        {
                            // generate content

                            ex_block = '<div class="exhibition_calendar">';
                            for (var j=0;j<data.length;j++)
                            {
                                ex_block = ex_block +'<a class="go_exhib" ex_name = "'+data[j]['name_'+req.cookies.lang]+'"  ex_id = "'+data[j]['id']+'" href="/user/exhibitions/'+data[j]['name_'+req.cookies.lang]+'/'+data[j]['id']+'"> <div class="exhibition_calendar_item">'
                                +'<div class="exhib_name">'+data[j]['name_'+req.cookies.lang]+'</div>'

                                + data[j]['content_'+req.cookies.lang]+'</div></a>';
                            }
                            ex_block = ex_block+'</div>';
                            callback(null,{lang: languages, user: req.user, menu_items: menu1, content: ex_block,dictionary:dictionary(req.cookies.lang)});
                        }

                    });


                }

                else
                {
                    pageModel.findPage(page_id, function (err, page) {

                        var content = "";
                        if (err) {
                            content = "No data for item";
                        }
                        else {
                            content = page['content_' + req.cookies.lang];
                        }

                        callback(null,{lang: languages, user: req.user, menu_items: menu1, content: content,dictionary:dictionary(req.cookies.lang)});

                    });
                }


        }

    });


};





module.exports  = function(){

    var task = {
        index: function (req, res) {

            get_full_page(req,res,1,function(err,data){
                res.render('index',data);
            });


        },
        send_verification_email:function(user,callback)
        {

            var mailOptions = {
                to: user.email,
                subject: 'KMKYA invitation system', // Subject line
                text: '',//desired_cell.v, // plaintext body
                html: '' // html body
            };


            app.render('email_verification',{user:user,dictionary:dictionary(req.cookies.lang)}, function(err, html){
                mailOptions.html = html;

                email.sendEmail(mailOptions, function (email_result) {
                    if (email_result.status) {
                        callback(null,'ok');
                    }
                    else {
                        callback(email_result.error);
                    }
                });

            });

        },
        send_forgot_email:function(user,callback)
        {

            var mailOptions = {
                to: user.email,
                subject: 'KMKYA invitation system', // Subject line
                text: '',//desired_cell.v, // plaintext body
                html: '' // html body
            };


            app.render('forgot_password_email',{user:user,dictionary:dictionary(req.cookies.lang)}, function(err, html){
                mailOptions.html = html;

                email.sendEmail(mailOptions, function (email_result) {
                    if (email_result.status) {
                        callback(null,'ok');
                    }
                    else {
                        callback(email_result.error);
                    }
                });

            });

        },
        user_email_verificate:function(req,res){

           userModel.verifyEmail(req.params.id,function(err,data){
                   res.render('email_verification_page',{err:err,is_verify:data,linkto:req.query.exhib,dictionary:dictionary(req.cookies.lang)});

            });


        },
        user_form_new_password:function(req,res){

            get_main_template(req, res, function (err, global_data) {

               res.render('forgot_password_new_pass_page',{user:req.params.id,dictionary:dictionary(req.cookies.lang)}, function (err, html) {
                   global_data.content = html;
                   res.render('index', global_data);
                   });

            });


        },
        ask_change_password:function(req,res)
        {
            //   send email
            userModel.findUser({email:req.body.email},function(err,user){
                if (err)
                {
                    res.send({err:err,status:false,msg:"DB error"})
                }
                task.send_forgot_email(user,function(err,data){
                    if (err)
                    {
                        res.send({err:err,status:false,msg:"SMTP error"})
                    }
                    res.send({err:null,status:true})

                });
            });
        },
        change_password:function(req,res)
        {
            // change pass
            var password = global_func.encode_password(req.body.password);
            userModel.change_password(req.body.email_verification_code,password,function(err,data){
                if (err)
                {
                    res.send(err);
                }
                var status = (data == 1) ? true: false;

                res.send({err:null,status:status});
            })


        },
        saveDetails:function(req,res){
                res.status(200);
        },
        adduser:function(req,res)
        {


            task.findUserByEmail(req.body.email,function(err,data){
                    if (err) {
                        res.send({err:err,status:false,msg:"DB error"})
                    }
                    else
                {
                    if (data.status == true)
                    {
                        //user found error
                        res.send({err:null,status:false,msg:"dublicate"})
                    }
                    else
                    {
                        var user = req.body;

                        user.email_verification_status = 0;
                        user.role = 'user';
                        user.password = global_func.encode_password(user.password);
                        user.email_verification_code = global_func.encode_password(user.email);
                        user.banned_status = 0;

                        userModel.addUser(user,function(err,data){
                            if (err) {
                                res.send({err:err,status:false,msg:"DB error"})
                            }
                            task.send_verification_email(user,function(err,data){
                                if (err)
                                {
                                    res.send({err:err,status:false,msg:"SMTP error"})
                                }
                                res.send({err:null,status:true})

                            });

                        });
                    }
                }
            });

        },
        get_page:function(req,res){
            get_full_page(req,res,req.params.id,function(err,data){
                res.render('index',data);
            });
        },
        get_exhibitions:function(req,res){
            get_full_page(req,res,2,function(err,data){
                res.render('index',data);
            });
        },
        registration: function (req, res) {

            get_main_template(req, res, function (err, global_data) {
                settingsModel.get_registration_type(function (err, data) {
                    if (err) {
                        content = 'error';
                    }
                    else {

                        if (data.value == 'simple') {
                            // simple
                            res.render('registration_simple',{dictionary:dictionary(req.cookies.lang)}, function (err, html) {
                                global_data.content = html;
                                res.render('index', global_data);
                            });

                        }
                        else {
                            // full
                            res.render('registration_full',{dictionary:dictionary(req.cookies.lang)}, function (err, html) {
                                global_data.content = html;
                                res.render('index', global_data);
                            });
                        }
                    }
                });
            });


        },
        /////////////////////////////////////////////////////////////////////
        change_user_data: function(req, res){
            get_main_template(req, res, function (err, global_data) {
                settingsModel.set_registration_type(function (err, data) {
                    res.render('user_cab',{dictionary:dictionary(req.cookies.lang)}, function (err, html) {
                                global_data.content = html;
                                res.render('index', global_data);
                            });
                })
            })
        
        },
        ////////////////////////////////////////////////////////////////
        goToExhibition:function(req,res){
            get_main_template(req,res,function(err,data){
                var content;

                if (data.user.email_verification_status == 0)
                {
                    content = 'go to verify email';
                }
                else
                {
                    content = 'go to exhib';
                }
                data.content = content;
                res.render('index',data);
            });
        },
        userDetails:function(req,res)
        {
            get_main_template(req,res,function(err,data) {

                res.render('user_cab',{dictionary:dictionary(req.cookies.lang),user: req.user},function(err,html){
                    data.content = html;
                    res.render('index',data);
                    // res.render('index',user);
                });
            });
        },
        GetTicket:function(req,res){    
           // insert into users_orders

            users_ordersModel.addOrder({user_id:req.user.id,exhibition_id:req.body.exhibition_id},function(err,order){

                // insert into users_answers

                var ar = JSON.parse(req.body.answers);
               // console.log(ar);
                async.each(ar,function(item,callback){



                    var text_value2;
                    var text_value1;
                    var text_value;

                    var value = item.answers.map(function(answer)
                    {
                       text_value1 = (answer['text']) ? answer['text'] : "";
                       text_value2 = (answer.other) ? answer.other : "";

                       return answer.id;
                    });

                    text_value = (text_value1) ? text_value1 : text_value2;

                    users_answersModel.addAnswers({user_id:req.user.id,exhibition_id:req.body.exhibition_id,question_id:item.question_id,value:value.join(','),text_value:text_value},function(err,user_answer){

                        callback();
                    });


                },function(err){
                    // generate id and barcode

                    // send it to user

                    exhibitionModel.get_exhibition_by_id({id:req.body.exhibition_id},function(err,exhib){

                        if (err) res.send('error');


                        var code = order.id+'9999';

                        while (code.length != 12)
                            code = '0'+code;


                        bwipjs.toBuffer({
                            bcid:        'ean13',         // Barcode type
                            text:        code,            // Text to encode
                            scale:       3,               // 3x scaling factor
                            height:      10,              // Bar height, in millimeters
                            includetext: true,            // Show human-readable text
                            guardwhitespace: true,
                            textxalign:  'center',        // Always good to set this
                            textfont:    'Inconsolata',   // Use your custom font
                            textsize:    13               // Font size, in points
                        }, function (err, png) {
                            if (err) {
                                console.log(err);
                                // Decide how to handle the error
                                // `err` may be a string or Error object
                            } else {

                                var new_order =
                                {
                                    id:order.id,
                                    barcode:'<img src="data:image/png;base64,'+png.toString('Base64')+'">',
                                    FIO:req.user.last_name+' '+req.user.first_name
                                };

                                var template = hbs.compile(exhib['content_res_'+req.cookies.lang]);
                                var html    = template({order:new_order});
                                res.send(html);

                            }
                        });


                    });

                });






            });





        },
        OrderExhibition:function(req,res){
            get_main_template(req,res,function(err,data){


                //check if user have order it this exhibition
                users_ordersModel.check_order_exists({user_id:req.user.id,exhibition_id:req.params.id},function(err,result)
                {

                    if (err)
                    {
                            data.content = "Error";
                            res.render('index',data);
                    }
                    else
                    {
                        //if have record in users_orders

                        if (result != null)
                        {
                            res.redirect(302,'/user/details#orders');
                        }
                        else
                        {
                            //if dont then go
                            res.render('user_quering',{ex_id:req.params.id,ex_name:req.params.name},function(err,html){
                                data.content = html;
                                res.render('index',data);
                            });
                        }
                    }
                });
            });
        },
        is_auth:function(req,res){
            res.send(req.isAuthenticated());
        },
        findUserByID: function (id,callback) {

            userModel.findUser({id:id},function(err,user){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    if (!user)
                    {
                        callback(null,{status:false,msg:"User not found"});
                    }
                    else
                    {
                        callback(null,{status:true,msg:"ok",user:user});
                    }
                }

            })

        },
        findUserByEmail: function (email,callback) {

            userModel.findUser({email:email},function(err,user){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    if (!user)
                    {
                        callback(null,{status:false,msg:"User not found"});
                    }
                    else
                    {
                        callback(null,{status:true,msg:"ok",user:user});
                    }
                }

            })

        },
        logout:function(req,res){
            req.logout();

            res.redirect('/');

        },
        findUserByCredentials: function (credentials,callback) {

            credentials.password = global_func.encode_password(credentials.password);
             userModel.findUser(credentials,function(err,user){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    if (!user)
                    {

                        callback(null,{status:false,msg:"User not found"});
                    }
                    else
                    {
                        callback(null,{status:true,msg:"ok",user:user});
                    }
                }

            })

        }


    };

    return task;
};
