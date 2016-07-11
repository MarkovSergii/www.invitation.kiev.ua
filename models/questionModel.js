/**
 * Created by Markoff on 11.07.2016.
 */
var models = require('../models/models');


var obj = {
    add_question:function(question,callback) {
        models.Questions.create(question)
            .then(function(question) {
                callback(null,question)
            })
            .catch(function(err){
                callback(err)
            })
    }


};



module.exports = obj;