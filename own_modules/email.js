/**
 * Created by user on 27.02.2016.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


var transporter = nodemailer.createTransport(smtpTransport({
    host: '',
    port: 0,
    auth: {
        user: '',
        pass: ''
    }
}));

var obj ={


    InitializeSMTP : function(email_data)
    {

        transporter.transporter.options.host = email_data.smtp_server;
        transporter.transporter.options.sender_address = email_data.sender_address;
        transporter.transporter.options.port = email_data.smtp_port;
        transporter.transporter.options.auth.user = email_data.smtp_user;
        transporter.transporter.options.auth.pass = email_data.smtp_password;


    },
    sendEmail : function(options,callback)
        {

            if ((options.from == "") || (options.from == undefined))
            {
                options.from = transporter.transporter.options.sender_address;
            }
            transporter.sendMail(options, function(error, info){
                var  email_result ={};

                if (error){
                    email_result.status = false;
                    email_result.error = error;
                    callback(email_result);
                }
                else
                {
                    email_result.status = true;
                    email_result.error = error;
                    callback(email_result);

                }


            });


        }


};



module.exports = obj;
