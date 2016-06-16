/**
 * Created by user on 13.06.2016.
 */
$(document).ready(function() {

    $('#btn_save_registration_type').click(function(){
        console.log($('#r_type_select').val());
        $.post('/admin/settings/registration_data',{val:$('#r_type_select').val()},function(data){
            console.log(data);
            if (data.err)
            {

                swal({
                    title: "Ошибка!",
                    text: 'Ошибка измения: ' + data.err,
                    timer: 3000,
                    type: "error",
                    showConfirmButton: false
                });
                $("#r_type_select [value='"+(+!$('#r_type_select').val())+"']").attr("selected", "selected");
            }
            else
            {
                swal({
                    title: "Успех!",
                    text: "Успешно изменено",
                    timer: 1000,
                    type: "success",
                    showConfirmButton: false
                });
            }

        })
    });

});

