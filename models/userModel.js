/**
 * Created by user on 01.06.2016.
 */
var models = require('../models/models');


var obj = {
    findUser:function(params,callback){
        models.Users.findOne({ where: params })
            .then(function(user) {
                callback(null,user)
            })
            .catch(function(err){
                callback(err)
            })
    },
    addUser:function(user,callback)
    {
        models.Users.create(user)
            .then(function(user) {
                callback(null,user)
            })
            .catch(function(err){
                callback(err)
            })
    },
    updateUser:function(user,callback)
    {
        models.Users.update({id:id})
            .then(function(user) {
                callback(null,user)
            })
            .catch(function(err){
                callback(err)
            })
    },
    verifyEmail:function(email_verification_code,callback){
        models.Users.update({email_verification_status:1},{where:{email_verification_code:email_verification_code}})
            .then(function(user) {
                callback(null,user)
            })
            .catch(function(err){
                callback(err)
            })

    },
    change_password:function(email_verification_code,password,callback){
        models.Users.update({password:password},{where:{email_verification_code:email_verification_code}})
            .then(function(user) {
                callback(null,user)
            })
            .catch(function(err){
                callback(err)
            })

    }


};



module.exports = obj;