/**
 * Created by Markoff on 19.11.2015.
 */




$(document).ready(function() {

    $('#logininput').val('');

    $('#logininput').keypress(function(){
        $('.modal-title').html(find_translation('greating',curent_language));
        $('.modal-title').css('color','black');
    });

    $('#passwordinput').keypress(function(){
        $('.modal-title').html(find_translation('greating',curent_language));
        $('.modal-title').css('color','black');
    });

    $('#passwordinput').keypress(function()
    {
        if (event.which == null) { // IE
            if (event.keyCode == 13)
                login_auth();
        }

        if (event.which != 0 && event.charCode != 0) { // все кроме IE
            if (event.which == 13)
                login_auth();
        }

    });



    login_auth = function()
    {

        if (($('#passwordinput').val()=='') || ($('#logininput').val()==''))
        {
            $('#auth_login_modal').effect( "shake" );
            $('.modal-title').html(find_translation('error_login_pass_empty',curent_language));
            $('.modal-title').css('color','red');
        }
        else {

            var request = $.ajax({
                url: window.location.protocol + "//" + location.host + '/login',
                type: "POST",
                data: {login: $('#logininput').val(), password: $('#passwordinput').val()},
                dataType: "json",
                timeout: 5000
            });

            request.success(function () {
                $('#login_modal').modal('hide');
                if (go_to_exhib != 0)
                {
                    window.location = '/user/exhibition/'+go_to_exhib;
               }
                else
                {
                    window.location.href = '/'
                }

            });

            request.error(function (httpObj, textStatus) {
                if (httpObj.status == 200) {
                    $('#login_modal').modal('hide');
                   // console.log(textStatus);
                    if (go_to_exhib != 0)
                    {
                        window.location = '/user/exhibition/'+go_to_exhib;
                    }
                    else
                    {
                        window.location.href = '/'
                    }
                }
                else {
                    if (httpObj.status == 401) {
                        $('#auth_login_modal').effect("shake");
                        $('.modal-title').html(find_translation('error_login_pass_bad',curent_language));
                        $('.modal-title').css('color', 'red');
                    }

                }
            });


        }

    };


    $('#btn_login').click(function(){

        login_auth();
    });

});
