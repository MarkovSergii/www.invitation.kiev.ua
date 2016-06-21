/**
 * Created by user on 21.06.2016.
 */
var models = require('../models/models');


var obj = {
    getCountries:function(callback){
        models.Country.findAll({order:"order_by"})
            .then(function(countries) {
                callback(null,countries)
            })
            .catch(function(err){
                callback(err)
            })


    },
    getOblasts:function(callback){
        models.Oblast.findAll({order:"order_by"})
            .then(function(countries) {
                callback(null,countries)
            })
            .catch(function(err){
                callback(err)
            })


    },
    getCities:function(oblast_id, callback){
        models.City.findAll({where:{oblast_id:oblast_id}})
            .then(function(countries) {
                callback(null,countries)
            })
            .catch(function(err){
                callback(err)
            })

    }

};



module.exports = obj;