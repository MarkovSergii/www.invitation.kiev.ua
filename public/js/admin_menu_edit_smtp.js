/**
 * Created by user on 13.12.2015.
 */
$(document).ready(function() {

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click', '.smtp_test_send_btn', function () {

        var test_email = $('#smtp_test').val();



        $('.smtp_test_send_btn').find('span').removeClass('fa-envelope-o');
        $('.smtp_test_send_btn').find('span').addClass('fa-spinner');
        $('.smtp_test_send_btn').find('span').addClass('fa-spin');




        $.post('/admin/send_test_email', {test_email:test_email}, function (data) {
            if (data.status) {



                $('.smtp_test_send_btn').find('span').addClass('fa-envelope-o');
                $('.smtp_test_send_btn').find('span').removeClass('fa-spinner');
                $('.smtp_test_send_btn').find('span').removeClass('fa-spin');

                // показываем что все ок
                swal({   title: "Успех!",   text: "Успешно отправлено",   timer: 2000, type: "success",  showConfirmButton: false });

            }
            else {

                $('.smtp_test_send_btn').find('span').addClass('fa-envelope-o');
                $('.smtp_test_send_btn').find('span').removeClass('fa-spinner');
                $('.smtp_test_send_btn').find('span').removeClass('fa-spin');

                // показываем ошибку
                swal({   title: "Ошибка!",   text: "Ошибка отправки"+ JSON.stringify(data.err),   timer: 3000, type: "error",  showConfirmButton: false });



            }
        });

    });


//--------------------------------------------------------------------------------------------------------------------


    $('body').on('change', '#show_pass', function () {

        if ($('#show_pass').prop('checked')) {
            $('#smtp_password').attr('type', 'text');
        }
        else {
            $('#smtp_password').attr('type', 'password');
        }
    });

//--------------------------------------------------------------------------------------------------------------------


    $('body').on('click', '.btn_smtp_save', function () {
     //   alert('hk');

        var smpt_settings = {};

        smpt_settings.smtp_server = $('#smtp_server').val();
        smpt_settings.smtp_port = $('#smtp_port').val();
        smpt_settings.sender_address = $('#sender_address').val();
        smpt_settings.smtp_user = $('#smtp_user').val();
        smpt_settings.smtp_password = $('#smtp_password').val();


        $.post('/admin/smtp/save_settings_smtp', smpt_settings, function (data) {
            console.log(data);
            if (data.status) {
                // показываем что все ок
                swal({   title: "Успех!",   text: "Успешно сохранено",   timer: 2000, type: "success",  showConfirmButton: false });
            }
            else {
                // показываем ошибку
                swal({   title: "Ошибка!",   text: "Ошибка отправки: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                location.reload();

            }

        });

    });
//--------------------------------------------------------------------------------------------------------------------




//--------------------------------------------------------------------------------------------------------------------
});