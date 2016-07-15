/**
 * Created by Markoff on 14.07.2016.
 */
var models = require('../models/models');


var obj = {

    addAnswers:function(params,callback){
       // console.log(params);
        models.Users_answers.create(params)
            .then(function(order) {
                callback(null,order)
            })
            .catch(function(err){
                callback(err)
            })
    }



};



module.exports = obj;