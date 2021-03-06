/**
 * Created by user on 22.06.2016.
 */
var ExhibitionModel = require('../models/exhibitionModel');
var QuestionModel = require('../models/questionModel');
var AnswerModel = require('../models/answerModel');
var async = require('async');

var getCountByID = function(arr,id){
    var cc = 0;
    arr.forEach(function(item){
        if (item.exhibition_id == id)
            cc = item.count
    });
    return cc;
};


module.exports = function () {

    var task = {
        getOrders:function(){
          return new Promise(function(resolve,reject){
              ExhibitionModel.get_exhibition_list({date_end:{$gt: new Date()}},function(err,exhibitionsList){

                  var arrOrders = [];                  
                  exhibitionsList.map(function(exhib){                      
                      var one_ex = " (exhibition_id = "+exhib.id+")";
                      arrOrders.push(one_ex);

                  });

                  ExhibitionModel.getOrders('('+arrOrders.join(" or ")+') and (DATE(createdAt)=DATE(now()))')
                      .then(function(one_day){
                          ExhibitionModel.getOrders(arrOrders.join(" or "))
                              .then(function(activeOrders){

                                  exhibitionsList.map(function(one){
                                      one.orders = {};
                                      one.orders.total = getCountByID(activeOrders,one.id);
                                      one.orders.day = getCountByID(one_day,one.id);
                                      return one
                                  });
                                  resolve(exhibitionsList);
                              })

                      });


              });

          });
        },
        get_exhibition_list: function (params,callback) {

            ExhibitionModel.get_exhibition_list(params, function (err, data) {

                callback(err, data)
            })
        },
        get_exhibition_visible_list: function (callback) {
            ExhibitionModel.get_exhibition_list({visible: true}, function (err, data) {
                callback(err, data)
            })
        },
        ExhibitionQuestions:function(req,res)
        {
            ExhibitionModel.ExhibitionQuestions(req.params.id, function (err, data) {
              //  if (err) res.send({err:err});
                res.send({err:err,data:data})
            })
        },
        change_visibility:function(req,res)
        {
            var exhib = {};

            if (req.body.curent_status == 'true')
            {
                exhib.visible = false
            }
            else
            {
                exhib.visible = true;
            }

          //  console.log(exhib.visible);

            exhib.id = req.params.id;

            ExhibitionModel.change_visibility(exhib,function(err){
                if (err) res.send({err:err});
                res.send({err:null});
            })
        },
        add_exhibition: function (req, res) {
            var new_exhib = JSON.parse(req.body.new_exhib);

            ExhibitionModel.add_exhibition(new_exhib, function (err, exhib) {
                if (err) {
                    res.send({err: err})
                }
                else {


                    var t_question = function (item, callback) {
                        var one_question = {};
                        one_question.name_ru = item.ru;
                        one_question.name_en = item.en;
                        one_question.name_ukr = item.ukr;
                        one_question.exhibition_id = exhib.id;
                        one_question.order_by = item.oreder_by;
                        one_question.q_type = item.type;
                        one_question.is_pro = item.pro;
                        one_question.have_other = item.other;
                        one_question.is_first = 0;

                      //  console.log(item);

                        QuestionModel.add_question(one_question, function (err, question) {
                            if ((item.other) && ((item.type=="checkbox") || (item.type=="radiobox")))
                            {
                                item.answers.push({ru:"Другое",en:"Other",ukr:"Інше"});
                            }

                            async.each(item.answers, function (item) {

                                var one_answer = {};
                                one_answer.name_ru = item.ru;
                                one_answer.name_en = item.en;
                                one_answer.name_ukr = item.ukr;
                                one_answer.question_id = question.id;


                                AnswerModel.add_answer(one_answer, function (err, answer) {


                                });
                            }, function (err) {

                                console.log('err');
                            });


                        });
                        callback();


                    };


                    //add first question
                    var one_question = {};
                    one_question.name_ru = new_exhib.first_question_ru;
                    one_question.name_en = new_exhib.first_question_en;
                    one_question.name_ukr =new_exhib.first_question_ukr;
                    one_question.exhibition_id = exhib.id;
                    one_question.q_type = 'radiobox';

                    one_question.is_first = 1;
                    one_question.answers = [
                        {
                            ru: "Да",
                            en: 'Yes',
                            ukr:'Так'
                        },
                        {
                            ru: "Нет",
                            en: 'No',
                            ukr:'Ні'
                        }
                    ];


                    QuestionModel.add_question(one_question, function (err, question) {
                        if (err) console.log('error');


                        async.each(one_question.answers, function (item) {

                            var one_answer = {};
                            one_answer.name_ru = item.ru;
                            one_answer.name_en = item.en;
                            one_answer.name_ukr = item.ukr;
                            one_answer.question_id = question.id;


                            AnswerModel.add_answer(one_answer, function (err, answer) {


                            });
                        }, function (err) {

                            console.log('err');
                        });


                        // add other questions
                        async.each(new_exhib.questions, t_question, function (err) {

                            if (err) res.send({err: "error"});

                            res.send({err: null, status: true});

                        });

                    });



                }
            });

        }


    };

    return task;
};