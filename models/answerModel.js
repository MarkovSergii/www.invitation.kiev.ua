/**
 * Created by Markoff on 11.07.2016.
 */
var models = require('../models/models');


var obj = {
    add_answer:function(answer,callback) {
    models.Answers.create(answer)
        .then(function(answer) {
            callback(null,answer)
        })
        .catch(function(err){
            callback(err)
        })
}
};



module.exports = obj;