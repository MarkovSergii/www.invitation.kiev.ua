/**
 * Created by user on 13.06.2016.
 */


var clearAllSpans = function(){
    $('#email_span').hide();
    $('#firstname_span').hide();
    $('#lastname_span').hide();
    $('#password_span').hide();
    $('#repassword_span').hide();
    $('#mobile_span').hide();
};

var check_all_fields = function()
{

    clearAllSpans();

    if ($('#input_firstname').val().length==0)
    {
        $('#firstname_span').show();
        return false
    }

    if ($('#input_lastname').val().length==0)
    {
        $('#lastname_span').show();
        return false
    }
    if ($('#input_email').val().match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) == null)
    {
        $('#email_span').show();
        return false
    }

    if ($('#input_mobile').val().length==0)
    {
        $('#mobile_span').show();
        return false
    }

    if ($('#input_password').val().match(/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i)== null)
    {
        $('#password_span').show();
        return false
    }

    if ($('#input_password').val()!=$('#input_re_password').val())
    {
        $('#repassword_span').show();
        return false
    }





    return true
};



$(document).ready(function() {

    $('#btn_register').click(function(){

        if (check_all_fields())
        {

                var user = {
                    first_name:$('#input_firstname').val(),
                    last_name:$('#input_lastname').val(),
                    company:$('#input_company').val(),
                    email:$('#input_email').val(),
                    password  :$('#input_password').val(),
                    mobile:$('#input_mobile').val()
                };
            $.post(window.location.protocol + '//' + location.host + '/user',user,function(data){
                if (data.err)
                {
                    swal({
                        title: "Ошибка!"+data.msg,
                        text: 'Ошибка'+data.err,
                        timer: 1000,
                        type: "error",
                        showConfirmButton: false
                    });
                }
                else
                {
                    if (!data.status)
                    {
                        console.log(data);
                       if (data.msg == 'dublicate')
                       {

                           swal({
                               title: "Ошибка!",
                               text: "Пользователь с таким емайлом уже зарегестрирован воспользуйтесь формой востановления пароля",
                               type: "error",
                               showCancelButton: true,
                               confirmButtonColor: "#DD6B55",
                               confirmButtonText: "Востановить пароль!",
                               closeOnConfirm: true
                           }, function () {
                               $('#forgot_modal').modal('show');
                           });
                       }
                       else
                       {
                           swal({
                               title: "Ошибка!",
                               text: 'Системная ошибка. Пожалуйста свяжитесь с службой поддержки',
                               type: "error",
                               showConfirmButton: true
                           });
                       }
                    }
                    else
                    {
                        swal({
                            title: 'Успех',
                            text: 'Проверьте свою почту что б завершить регистрацию',
                            type: "success",
                            showConfirmButton: true,
                            closeOnConfirm: true
                        }, function () {
                            window.location = '/';
                        });

                    }
                }
            });
        }
        else
        {
            swal({
                title: "Ошибка!",
                text: 'Ошибка',
                timer: 1000,
                type: "error",
                showConfirmButton: false
            });
        }
    });

});