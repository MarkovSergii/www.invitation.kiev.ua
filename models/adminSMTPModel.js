/**
 * Created by user on 01.06.2016.
 */
var models = require('../models/models');


var obj = {
    get_settings_smtp:function(callback)
    {
        models.Smtp_settings.findById(1)
            .then(function(data)
            {

                callback(null,data)
            })
            .catch(function(err)
            {
                callback(err)
            });
        },
    set_settings_smtp:function(new_settings,callback)
    {
        models.Smtp_settings.update(new_settings,{where:{id:1}})
            .then(function(data)
            {
                callback(null,data)
            })
            .catch(function(err)
            {
                callback(err)
            });
    }
};


module.exports = obj;