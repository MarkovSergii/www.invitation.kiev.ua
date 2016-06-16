/**
 * Created by user on 01.06.2016.
 */

function arrayObjectIndexOf(myArray, searchTerm, property, next) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

var menuModel = require('../models/menuModel');
var global_func = require('../own_modules/func');

module.exports  = function(){

    var task =  {
        findMenuItem:function(req,res){
            menuModel.findMenuItem(req.params.id,function(err,menuitem){
                if (err) res.send({err:err});
                if (!menuitem)
                {
                    res.send({err:err,status:false,msg:"No page with ID = "+ id});
                }
                else
                {
                    res.send({err:err,status:true,msg:"",menuitem:menuitem});
                }


            })
        },
        getAllMenuItems:function(callback){
            menuModel.getAllMenuItems(function(err,menuitems){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    //   create object from menu items

                    var menu = [];

                    for (var i = 0;i<menuitems.length;i++)
                        {

                            //  console.log(data);
                            var one_item = {};
                            var item = menuitems[i];

                            one_item.id = item.id;
                            one_item.name = item['name_ru'];
                            one_item.sort = item['sort_position'];
                            one_item.root_id = item['root_id'];
                            one_item.visible = item['visible'];
                            one_item.page_id = item['page_id'];
                            one_item.content_type = item['content_type'];
                            one_item.subs = [];

                            if (item.root_id) {
                                var s_index = arrayObjectIndexOf(menu, item.root_id, 'id');
                                menu[s_index].subs.push(one_item);
                            }
                            else {
                                menu.push(one_item);
                            }
                        }

                    menu.sort(function(a,b){
                        return parseInt(a.sort) >parseInt(b.sort)
                    });

                    callback(err,menu);
                }

            });
        },
        updateMenuItem:function(req,res){
            menuModel.updateMenuItem(req.body,function(err){
                if (err) res.send({err:err});
                res.send({err:err,status:true,msg:""});

            })
        },
        createMenuItem:function(req,res){
            menuModel.createMenuItem(req.body,function(err,menuitem){
                if (err) res.send({err:err});
                if (!menuitem)
                {
                    res.send({err:err,status:false,msg:"Cant create new menuitem"});
                }
                else
                {
                    res.send({err:err,status:true,msg:"",menuitem:menuitem});
                }
            })


        },
        deleteMenuItem:function(req,res){
            menuModel.deleteMenuItem(req.params.id,function(err){
                if (err) res.send({err:err});

                res.send({err:err,status:true,msg:""});

            })
        }

    };

    return task;
};
