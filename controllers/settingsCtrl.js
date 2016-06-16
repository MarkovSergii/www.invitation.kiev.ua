/**
 * Created by user on 13.06.2016.
 */
var settingsModel = require('../models/settingsModel');


module.exports  = function(){

    var task =  {
        get_registration_type:function(callback){
            settingsModel.get_registration_type(function(err,sett){
                if (err) callback(err);
                if (sett.value == 'simple')
                {
                    callback(null,'1')
                }
                else
                {
                    callback(null,'0')
                }

            })
        },
        set_registration_type:function(req,res)
        {
            var value;
            console.log(req.body.val);
            if (req.body.val == 1)
            {
                value = 'simple';
            }
            else
            {
                value = 'full';
            }

            settingsModel.set_registration_type(value,function(err){

               if (err){
                   res.send({err:err})
               }
                else
               {
                   res.send({err:null,status:true})
               }

            })
        }
    };

    return task;
};
