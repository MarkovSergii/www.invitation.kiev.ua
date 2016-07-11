/**
 * Created by user on 22.06.2016.
 */
var models = require('../models/models');


var obj = {
    get_exhibition_list:function(params,callback){
        models.Exhibitions.findAll({where:params})
            .then(function(exhibitions) {
                callback(null,exhibitions)
            })
            .catch(function(err){
                callback(err)
            })
    },
    add_exhibition:function(exhib,callback) {
        models.Exhibitions.create(exhib)
            .then(function(new_exhib) {
                callback(null,new_exhib)
            })
            .catch(function(err){
                callback(err)
            })
    },
    change_visibility:function(exhib,callback) {
        models.Exhibitions.update(exhib,{where:{id:exhib.id}})
            .then(function() {
                callback(null)
            })
            .catch(function(err){
                callback(err)
            })
    }
};



module.exports = obj;