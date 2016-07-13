/**
 * Created by user on 22.06.2016.
 */
var models = require('../models/models');
var async = require('async');

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
    ExhibitionQuestions:function(ex_id,callback1) {
        var qq = [];

        models.Questions.findAll({where:{exhibition_id:ex_id},order:'order_by'})
            .then(function(questions) {

                async.each(questions,function(quest,callback){
                    var q ={};
                    q.id = quest.id;
                    q.name_ru = quest.name_ru;
                    q.name_en = quest.name_en;
                    q.name_ukr = quest.name_ukr;
                    q.exhibition_id = quest.exhibition_id;
                    q.order_by = quest.order_by;

                    q.is_first = quest.is_first;
                    q.q_type = quest.q_type;
                    q.is_pro = quest.is_pro;
                    q.answers = [];

                    models.Answers.findAll({where:{question_id:quest.id}})
                        .then(function(answers){
                            q.answers = answers;
                            qq.push(q);
                            callback(null)

                        })
                        .catch(function(err){
                            callback(err)
                        })

                },function(err){
                    callback1(err,qq)
                });
            })
            .catch(function(err){
                callback1(err,"hh")
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