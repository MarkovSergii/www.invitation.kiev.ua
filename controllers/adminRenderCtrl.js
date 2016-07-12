/**
 * Created by user on 01.06.2016.
 */

var pageCtrl = require('../controllers/pageCtrl')();
var menuCtrl = require('../controllers/menuCtrl')();
var adminSMTPCtrl = require('../controllers/adminSMTPCtrl')();
var adminFileCtrl = require('../controllers/adminFileCtrl')();
var settingsCtrl = require('../controllers/settingsCtrl')();
var adminExhibitionsCtrl = require('../controllers/adminExhibitionsCtrl')();

module.exports  = function(){


    var task = {
        index : function(req,res) {
            res.render('admin_menu_dashboard',function(err,html){
                res.render('admin',{content:html,user:req.user,v1:'1'});
            });

        },
        menu_dashboard:function(req,res){
           res.render('admin_menu_dashboard',function(err,html){
                res.render('admin',{content:html,user:req.user,v1:'1'});
            });
        },
        template_edit:function(req,res){

            adminFileCtrl.getListOf(__dirname+"/../views",function(hbs) {
                adminFileCtrl.getListOf(__dirname+"/../public/js",function(js){
                    adminFileCtrl.getListOf(__dirname+"/../public/css",function(css){
                        res.render('admin_template_edit',{hbs:hbs,css:css,js:js},function(err,html){
                            res.render('admin',{content:html,user:req.user,v1:'4',v11:'6'});
                        });
                    });
                });
            });


        },
        menu_calendar:function(req,res){

            adminExhibitionsCtrl.get_exhibition_list(null,function(err,data) {

                res.render('admin_menu_exhibitions',{exhibition:data},function(err,html){

                    res.render('admin',{content:html,user:req.user,v1:'2'});
                });

            });
        },
        settings_smtp:function(req,res){

            adminSMTPCtrl.get_settings_smtp(function(err,data){

                res.render('settings_smtp',data.dataValues,function(err,html){

                    res.render('admin',{content:html,user:req.user,v1:'4',v11:'7'});
                });

            });


        },
        other_settings:function(req,res){

            settingsCtrl.get_registration_type(function(err,r_type){
                res.render('other_settings',{r_type:r_type},function(err,html){
                    res.render('admin',{content:html,user:req.user,v1:'4',v11:'8'});
                });
            });
        },
        menu_edit:function(req,res){
            menuCtrl.getAllMenuItems(function(err,menuitems){
                res.render('admin_menu_edit_menu',{menu_items:menuitems},function(err,html){
                    res.render('admin',
                        {content:html,user:req.user,v1:'4',v11:'5'});
                });

            });
        },
        page_edit:function(req,res){

            pageCtrl.getAllPages(function(err,pages){

                if (err) {
                    res.render('admin_menu_edit_page',{pages:[]},function(err,html){
                        res.render('admin',
                            {content:html,user:req.user,v1:'4',v11:'8'});
                    });
                }
                else
                {
                    res.render('admin_menu_edit_page',{pages:pages},function(err,html){
                        res.render('admin',
                            {content:html,user:req.user,v1:'4',v11:'8'});
                    });
                }


            });
        },
        menu_users:function(req,res){
            res.render('admin_menu_users',function(err,html){
                res.render('admin',{content:html,user:req.user,v1:'3'});
            });
        }

    };




    return task;
};