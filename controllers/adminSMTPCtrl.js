/**
 * Created by user on 01.06.2016.
 */

var SMTPModel = require('../models/adminSMTPModel');
var email = require('../own_modules/email');

module.exports  = function(){

    var task =  {
        get_settings_smtp:function(callback)
        {

            SMTPModel.get_settings_smtp(function(err,data){
                if (err)
                {
                    callback(err);
                }
                else
                {
                    callback(null,data);
                }

            });
        },
        get_settings_smtp_JSON:function(callback)
        {
            SMTPModel.get_settings_smtp(function(err,data){

                if (err)
                {
                    callback({err:err,status:false});

                }
                else
                {

                    callback({err:err,status:true,data:data.dataValues});
                }

            });
        },
        set_settings_smtp:function(req,res)
        {
            var smpt_settings = {};
            smpt_settings.smtp_server    = req.body.smtp_server;
            smpt_settings.smtp_port      = req.body.smtp_port;
            smpt_settings.sender_address = req.body.sender_address;
            smpt_settings.smtp_user      = req.body.smtp_user;
            smpt_settings.smtp_password  = req.body.smtp_password;

            SMTPModel.set_settings_smtp(smpt_settings, function(err,data){
                if (err)
                {
                    res.send({err:err,status:false});
                }
                else
                {
                    email.InitializeSMTP(smpt_settings);
                    res.send({err:err,status:true,data:smpt_settings});
                }

            });
        },
        sendEmail:function(req,res) {

            var mailOptions = {
                to: req.body.test_email, // list of receivers
                subject: 'Test invitation message', // Subject line
                text: 'text test',//desired_cell.v, // plaintext body
                html: 'html test' // html body
            };


            email.sendEmail(mailOptions, function (email_result) {

                if (email_result.status) {

                    res.send({status: true});
                }
                else {
                    res.send({status: false, err: email_result.error});
                }
            });


        }

    };

    return task;
};
