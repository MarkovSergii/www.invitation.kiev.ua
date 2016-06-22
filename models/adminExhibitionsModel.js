/**
 * Created by user on 22.06.2016.
 */
var models = require('../models/models');


var obj = {
    get_exhibition_list:function(params,callback)
    {
        if (params)
        {
            models.Exhibitions.findAll({where:params})
                .then(function(exhibitions) {
                    callback(null,exhibitions)
                })
                .catch(function(err){
                    callback(err)
                })
        }
        else
        {
            models.Exhibitions.findAll()
                .then(function(exhibitions) {
                    callback(null,exhibitions)
                })
                .catch(function(err){
                    callback(err)
                })
        }


    }
};



module.exports = obj;