/**
 * Created by user on 01.06.2016.
 */
var md5 = require('md5');
var global_const = require('../own_modules/const');

var obj ={
    md5:md5,
    encode_password:function(password){
        return (md5(password+global_const.solt));
    }
};


module.exports = obj;