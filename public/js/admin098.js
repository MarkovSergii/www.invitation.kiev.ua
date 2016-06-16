/**
 * Created by Markoff on 03.12.2015.
 */
$(document).ready(function(){

    $('#btn_login').click(function(){
        //      $('body').on("click","#btn_login",function(){

        if (($('#passwordinput').val()=='') || ($('#logininput').val()==''))
        {
            swal({   title: "Внимание!",   text: "Поля не могут быть пустыми",   timer: 1000, type: "error",  showConfirmButton: false });
        }
        else
        {
            var request = $.ajax({
                url : window.location.protocol + "//"+location.host+'/login',
                type : "POST",
                data: { login: $('#logininput').val(),password:$('#passwordinput').val() },
                dataType : "json",
                timeout : 5000
            });

            request.success(function() {
                window.location.href = '/admin/'
            });

            request.error(function(httpObj, textStatus) {
                if(httpObj.status==200)
                {
                    window.location.href = '/admin/'
                }
                else
                {
                    if (httpObj.status==401)
                    {
                        swal({   title: "Error!",   text: "Bad login or password",   timer: 2000, type: "warning",  showConfirmButton: false });

                    }

                }
            });
        }



    });


});