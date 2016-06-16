/**
 * Created by user on 01.06.2016.
 */
var models = require('../models/models');


var obj = {

    findMenuItem:function(id,callback) {
        models.Menus.findById(id)
            .then(function(menuitem) {
                callback(null,menuitem)
            })
            .catch(function(err){
                callback(err)
            })
    },
    createMenuItem:function(menuitem,callback) {
        models.Menus.create(menuitem)
            .then(function(menuitem) {
                callback(null,menuitem)
            })
            .catch(function(err){
                callback(err)
            })
    },
    updateMenuItem:function(menuitem,callback) {
        models.Menus.update(menuitem,{where:{id:menuitem.id}})
            .then(function() {
                callback(null)
            })
            .catch(function(err){
                callback(err)
            })
    },
    deleteMenuItem:function(id,callback) {
        models.Menus.destroy({
            where: {
                id: id
            }
        })
            .then(function() {
                callback(null)
            })
            .catch(function(err){
                callback(err)
            })
    },
    getAllMenuItems:function(callback) {
        models.Menus.findAll()
            .then(function(menuitems) {
                callback(null,menuitems)
            })
            .catch(function(err){
                callback(err)
            })
    }

};



module.exports = obj;