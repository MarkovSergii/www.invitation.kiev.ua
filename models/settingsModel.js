/**
 * Created by user on 13.06.2016.
 */
var models = require('../models/models');


var obj = {

    get_registration_type:function(callback) {
        models.Settings.findById(1)
            .then(function(sett) {
                callback(null,sett)
            })
            .catch(function(err){
                callback(err)
            })
    },
    set_registration_type:function(val,callback) {
        models.Settings.update({value:val},{where:{id:1}})
            .then(function() {
                callback(null)
            })
            .catch(function(err){
                callback(err)
            })
    }
};



module.exports = obj;