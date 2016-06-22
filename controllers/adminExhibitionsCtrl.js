/**
 * Created by user on 22.06.2016.
 */

var menuModel = require('../models/adminExhibitionsModel');

module.exports  = function(){

    var task =  {
        get_exhibition_list:function(callback)
        {
            menuModel.get_exhibition_list(null,function(err,data){
                if (err)
                    callback(err);
                
                callback(null,data);
                    
            });
        },
        get_exhibition_list_visiable:function(callback)
        {
            menuModel.get_exhibition_list({visible:true},function(err,data){
                if (err)
                    callback(err);

                callback(null,data);

            });
        }
    };

    return task;
};
