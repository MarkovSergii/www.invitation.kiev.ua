/**
 * Created by Markoff on 16.11.2015.
 */
var curent_language;
var go_to_exhib = 0;


var find_translation = function(key,lang)
{
    var found = false;
    var msg = "";
    var error_found = "translation not found";
    global_translation.forEach(function(item){
        if (item.id == key)
        {
            found = true;
            msg = item['lang_'+lang];
        }
    });

    if (found) {
        return msg;
    }
    else
    {
        return error_found;
    }

};

var change_menu_language_selector = function(lang_sh)
{
    var sel = "value='"+lang_sh+"'";
    $("#lang").find("["+sel+"]").attr('selected','selected');
};

var go_to_exhib = 0;
var go_to_exhib_name = "";

$(document).ready(function(){


  //  alert(go_to_exhib);

    curent_language = $.cookie('lang');
    change_menu_language_selector(curent_language);


    $.fn.bootstrapDropdownHover();



    $('body').on("change",'#lang',function(){

        $.cookie('lang', $('#lang').val());
        window.location.reload();

    });


    $('body').on("click",'.go_exhib',function(e){
        e.preventDefault();

        var exhib_id = $(this).attr('ex_id');
        var exhib_name = $(this).attr('ex_name');

        go_to_exhib = exhib_id;
        go_to_exhib_name = exhib_name;


        $.get('/is_auth/',function(data)
        {

            if (data)
            {
                // перейти на страницу заказа приглоса
                window.location = '/user/exhibitions/'+exhib_name+'/'+exhib_id;
            }
            else
            {
                // предложить зарегестрироватся или войти

                $('#auth_login_modal').modal('show');
            }


        });


    });

    $('#select_country').prop('value', false);

    $('body').on("change",'#select_country',function(){

        if ($("#select_country :selected").val()==1)
        {
            // ukraine
            $('#select_oblast').empty();
            $('#select_city').empty();

            $('.select_oblast').removeClass('hidden');
            $('.input_oblast').addClass('hidden');
            $('.select_city').removeClass('hidden');
            $('.input_city').addClass('hidden');

            $.get('/get_region_list',function(data){
                data.forEach(function(item){
                    $("#select_oblast").append( $('<option value="'+item.id+'">'+item.name+'</option>'));
                });
                $('#select_oblast').prop('value', false);
            });


        }
        else
        {
            // other
            $('.select_oblast').addClass('hidden');
            $('.input_oblast').removeClass('hidden');
            $('.select_city').addClass('hidden');
            $('.input_city').removeClass('hidden');
        }

    });

    $('body').on("change",'#select_oblast',function(){


            // город
            $('#select_city').empty();


            $('.select_city').removeClass('hidden');
            $('.input_city').addClass('hidden');

            var curent_city_id = $("#select_oblast :selected").val();

            $.get('/get_city_list_by_reg',{city_id:curent_city_id},function(data){
                data.forEach(function(item){
                    $("#select_city").append( $('<option value="'+item.id+'">'+item.name+'</option>'));
                });
                $('#select_city').prop('value', false);
            });


    });

    $('body').on("change",'#select_city',function(){


       if ($("#select_city :selected").val()==0)
       {
           $('#input_city').val('');
        //   $('.select_city').addClass('hidden');
           $('.input_city').removeClass('hidden');
       }
       else
       {
           $('.input_city').addClass('hidden');
       }


    });



    $('body').on('click','#btn_registration',function(){
        var form_ok = false;

        form_ok = true;
        if (form_ok)
        {
            var user_data = $('#add_user_form').serialize();


            console.log(user_data);

            $.post('/add_user',user_data,function(data){
                console.log(data);
                if (data.status == 'ok')
                {
                    // show message to check email
                    $('.user_reg_form').html('Go to email');
                }
                else
                {
                    // show err message
                    swal({   title: "Error!",   text: "Cant add user",   timer: 2000, type: "warning",  showConfirmButton: false });
                }
            });
        }


    });

    $('body').on('click','.forgot',function(){

        $('#auth_login_modal').modal('hide');
        $('#forgot_modal').modal('show');

    });

    $('body').on('click','#btn_forgot',function(){

        if ($('#forgot_email').val()!='')
        {
            var email = $('#forgot_email').val();
            $.post('/forgot_ask',{email:email},function(data)
            {

                if (data.status)
                {
                    swal({   title: "OK!",   text: "Check email and change your password",    type: "success",  showConfirmButton: true });
                    $('#forgot_email').val("");
                    $('#forgot_modal').modal('hide');
                }
                else
                {
                    swal({   title: "Error!",   text: "Cant send new password",   timer: 3000, type: "warning",  showConfirmButton: false });
                    $('#forgot_email').val("");
                    $('#forgot_modal').modal('hide');
                }
            });
        }


    });

    var correct_pass = function()
    {
        if ($('#input_password').val().match(/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i)== null)
        {
            $('#password_span').show();
            return false
        }

        if ($('#input_password').val()!=$('#input_repassword').val())
        {
            $('#repassword_span').show();
            return false
        }

        return true;
    };

    $('body').on('click','#change_pass_btn',function(){


        if(correct_pass())
        {
            $.post('/user/change_password',{email_verification_code:$('form').attr('hash'),password:$('#input_password').val()},function(data)
            {
                if (data.err)
                {
                    swal({
                        title: "Ошибка!",
                        text: 'Ошибка обратитесь в службу поддержки',
                       // timer: 1000,
                        type: "error",
                        showConfirmButton: true
                    });
                }
                else
                {
                    if (data.status)
                    {
                        swal({
                            title: "Успех!",
                            text: 'Теперь можете зайти в свой аккаунт под новім паролем',
                        //    timer: 1000,
                            type: "success",
                            showConfirmButton: true
                        });
                    }
                    else
                    {
                        swal({
                            title: "Ошибка!",
                            text: 'Ошибка неверная ссылка',
                          //  timer: 1000,
                            type: "error",
                            showConfirmButton: true
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
          //      timer: 1000,
                type: "error",
                showConfirmButton: true
            });
        }


    });


});