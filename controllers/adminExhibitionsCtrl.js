/**
 * Created by user on 22.06.2016.
 */
var ExhibitionModel = require('../models/exhibitionModel');


module.exports  = function(){

    var task = {
        get_exhibition_list:function(callback){
            ExhibitionModel.get_exhibition_list(null,function(err,data){
                callback(err,data)
            })
        },
        get_exhibition_visible_list:function(callback){

            ExhibitionModel.get_exhibition_list({visible:true},function(err,data){
                callback(err,data)
            })
        }


    };
    
        return task;
};