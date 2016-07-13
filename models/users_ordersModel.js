/**
 * Created by Markoff on 13.07.2016.
 */
var models = require('../models/models');


var obj = {

    check_order_exists:function(params,callback) {
        models.Users_orders.findOne({where:params})
            .then(function(order) {
                callback(null,order)
            })
            .catch(function(err){
                callback(err)
            })
    }



};



module.exports = obj;