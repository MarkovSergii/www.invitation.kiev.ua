/**
 * Created by user on 01.06.2016.
 */

var pageModel = require('../models/pageModel');
var global_func = require('../own_modules/func');

module.exports  = function(){

    var task =  {
        findPage:function(req,res){

                pageModel.findPage(req.params.id,function(err,page){
                    if (err) res.send({err:err});
                    if (!page)
                    {
                        res.send({err:err,status:false,msg:"No page with ID = "+ id});
                    }
                    else
                    {
                        res.send({err:err,status:true,msg:"",page:page});
                    }


                })


        },
        getAllPages:function(callback){
            pageModel.getAllPages(function(err,pages){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    callback(err,pages);
                }

            });
        },
        getAllPages_JSON:function(req,res){
            pageModel.getAllPages(function(err,pages){
                    if (err) res.send({err:err});
                    res.send({err:err,status:true,msg:"",pages:pages});
            });
        },
        updatePage:function(req,res){
            pageModel.updatePage(req.body,function(err){
                if (err) {
                    res.send({err:err})
                }
                else
                {
                    res.send({err:err,status:true,msg:""});
                }


            })
        },
        createPage:function(req,res){
            pageModel.createPage(req.body,function(err,page){
                if (err) res.send({err:err});
                if (!page)
                {
                    res.send({err:err,status:false,msg:"Cant create new page"});
                }
                else
                {
                    res.send({err:err,status:true,msg:"",page:page});
                }
            })
        },
        deletePage:function(req,res){
            pageModel.deletePage(req.params.id,function(err){
                if (err) res.send({err:err});

                res.send({err:err,status:true,msg:""});

            })
        }

    };

    return task;
};
