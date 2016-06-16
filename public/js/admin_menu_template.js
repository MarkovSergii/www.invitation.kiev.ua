/**
 * Created by user on 07.06.2016.
 */
$(document).ready(function() {

    if ($('#editor').length!=0)
    {
        var editor = ace.edit("editor");

        var file_name = "";
        var file_type = "";
        $('.file').click(function(){

            file_name = $(this).text();
            file_type = $(this).attr('file_type');

            $.get('/admin/file',{filename:file_name,file_type:file_type},function(data){
                //      $('#editor').html(data);

                editor.setTheme("ace/theme/monokai");
                if (file_type == 'js') editor.getSession().setMode("ace/mode/javascript");
                if (file_type == 'hbs') editor.getSession().setMode("ace/mode/html");
                if (file_type == 'css') editor.getSession().setMode("ace/mode/css");
                editor.setValue(data);
                editor.gotoLine(0);
                $('#file_name_edit').val(file_name);

                $('#file_name_edit').prop( "disabled", true );


                $('#edit_file_form').modal('show');
            });
        });


        $('.close1').click(function(){
            swal({
                title: "Вы уверены?",
                text: "Вы действительно хотите закрыть окно? Несохраненные данные будут утеряны.",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: "Да, закрыть!",
                confirmButtonColor: "#ec6c62"
            }, function() {
                $('#edit_file_form').modal('hide');
            });

        });

        var save = function(callback)
        {
            file_name = $('#file_name_edit').val();



            var bad = null;
            if (file_type == 'js') bad = file_name.match(/\b.+\.js\b/gi);
            if (file_type == 'css') bad = file_name.match(/\b.+\.css\b/gi);
            if (file_type == 'hbs') bad = file_name.match(/\b.+\.hbs\b/gi);


            var file_pattern =   new RegExp( file_name.substring(0,file_name.indexOf('.',0)) + '\\.' + file_type,'ig');

            if (bad!=null) {

                var name_lists = $('.box_'+file_type).html();

                if (name_lists.match(file_pattern))
                {
                    swal({
                        title: "Презаписать?",
                        text: "Такой файл уже есть. Перезаписать?",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        confirmButtonText: "Да, заменить!",
                        confirmButtonColor: "#ec6c62"
                    }, function() {

                        $.post('/admin/file',{file_name:file_name,file_context:editor.getValue(),file_type:file_type},function(data){
                            swal({
                                title: "Успех!",
                                text: 'Сохранено',
                                timer: 1000,
                                type: "success",
                                showConfirmButton: true
                            },function(){
                                if (callback) callback();

                            });
                        });


                    });
                }
                else
                {
                    $.post('/admin/file',{file_name:file_name,file_context:editor.getValue(),file_type:file_type},function(data){
                        swal({
                            title: "Успех!",
                            text: 'Сохранено',
                            timer: 1000,
                            type: "success",
                            showConfirmButton: true
                        },function(){
                            if (callback) callback();

                        });
                    });
                }

            }
            else
            {
                swal({
                    title: "Ошибка!",
                    text: 'Ошибка имени файла',
                    timer: 3000,
                    type: "error",
                    showConfirmButton: false
                });
            }
        };

        $('#btn_modal_file_save').click(function(){
            save();
        });

        $('#btn_modal_file_save_and_close').click(function(){
            save(function(){
                $('#edit_file_form').modal('hide');
                window.location.reload();
            });
        });


        $('.add_file').click(function(){
            swal({
                html:true,
                title:'Какой файл будем создавать?',
                showCancelButton: true,
                closeOnConfirm: true,
                text:"<select id='select_file_type'><option value='js'>JavaScript</option><option value='css'>CSS</option><option value='hbs'>HBS template</option></select>"},function(){


                editor.setTheme("ace/theme/monokai");
                if ($('#select_file_type').val() == 'js') editor.getSession().setMode("ace/mode/javascript");
                if ($('#select_file_type').val() == 'hbs') editor.getSession().setMode("ace/mode/html");
                if ($('#select_file_type').val() == 'css') editor.getSession().setMode("ace/mode/css");
                file_type = $('#select_file_type').val();
                editor.setValue("");
                editor.gotoLine(0);
                $('#file_name_edit').val("");
                $('#file_name_edit').prop( "disabled", false );
                $('#edit_file_form').modal('show');

            });
        });




        var del_file1 = function()
        {


            swal({
                title: "Вы уверены?",
                text: "Вы действительно хотите удалить файл? Востановить невозможно!!!",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true,
                confirmButtonText: "Да, удалить!",
                confirmButtonColor: "#ec6c62"
            }, function() {
                $.post( '/admin/file/delete',{file_name:file_name,file_type:file_type},function(data){
                    if (data.err == null)
                    {
                        swal({
                            title: "Успех!",
                            text: "Успешно удалено",
                            timer: 1000,
                            type: "success",
                            showConfirmButton: false
                        });
                        window.location.reload();
                    }
                    else
                    {
                        swal({
                            title: "Ошибка!",
                            text: 'Ошибка удаления: ' + data.err,
                            timer: 3000,
                            type: "error",
                            showConfirmButton: false
                        });
                    }
                });



            });
        };

        $('#btn_modal_file_delete').click(function(){
            del_file1();
        });

        $('.del_file').click(function(){
            file_name = $(this).attr('file_name');
            file_type = $(this).attr('file_type');
            del_file1();
        });
    }


});
