/**
 * Created by user on 01.06.2016.
 */
var models = require('../models/models');


var obj = {


    findPage:function(id,callback) {
        models.Pages.findById(id)
            .then(function(page) {
                callback(null,page)
            })
            .catch(function(err){
                callback(err)
            })
    },

    createPage:function(page,callback) {
        models.Pages.create(page)
            .then(function(page) {
                callback(null,page)
            })
            .catch(function(err){
                callback(err)
            })
    },
    updatePage:function(page,callback) {
        models.Pages.update(page,{where:{id:page.id}})
            .then(function() {
                callback(null)
            })
            .catch(function(err){
                callback(err)
            })
    },
    deletePage:function(id,callback) {
        models.Pages.destroy({
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
    getAllPages:function(callback) {
        models.Pages.findAll()
            .then(function(pages) {
                callback(null,pages)
            })
            .catch(function(err){
                callback(err)
            })
    }

};



module.exports = obj;