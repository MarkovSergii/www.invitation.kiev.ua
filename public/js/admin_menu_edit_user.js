/**
 * Created by user on 13.12.2015.
 */
$(document).ready(function(){

    var curent_user_id;
    var curent_email_status;
    var curent_ban_status;
    var $curent_elem;

    $('body').on('click','.email_v',function()
    {

        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_user_id = $($tr).find('.userID').text();
        var some_txt;
        if ($(this).hasClass('fa-check'))
        {
            curent_email_status = '1';
            // меняем текст формы в зависимости от текущего статуса
            some_txt = 'убрать подтверждение email?';
        }
        else
        {
            curent_email_status = '0';
            // меняем текст формы в зависимости от текущего статуса
            some_txt = 'подтвердить email?';
        }



        // показываем форму подтверджения
        swal({
            title: "Изменить статус email?",
            text: "Вы действительно хотите "+some_txt,
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Да, изменить!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.post('/admin/user/'+curent_user_id+'/email_v',{curent_email_status:curent_email_status})
                .done(function(data) {

                    if (data.status=='ok')
                    {

                        // перерисовываем иконку
                        if (curent_email_status=='0')
                        {
                            $($curent_elem).removeClass('fa-ban');
                            $($curent_elem).addClass('fa-check');
                        }
                        else
                        {
                            $($curent_elem).removeClass('fa-check');
                            $($curent_elem).addClass('fa-ban');
                        }
                        swal({ title:"Успех!", text:"Статус изменен", type:"success",timer: 1000});
                    }


                })
                .error(function(data) {
                    if (data.status!='ok')
                    {

                        swal({title:"Oops", text:"Не получилось изменить статус: "+data.err,  type:"error",timer: 3000});
                    }

                });
        });



    });

//-------------------------------------------------------------------------------------------------------------------


    $('body').on('click','.ban',function(){
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_user_id = $($tr).find('.userID').text();

        if ($(this).hasClass('fa-check'))
        {
            curent_ban_status = '0';

            $.get('/admin/user/'+curent_user_id+'/why_ban',function(data){

                if (data.status=='ok')
                {

                    swal({
                    title: "Забанить пользователя?",
                    text: "Вы действительно хотите забанить пользователя?",
                    type: "input",
                    inputValue:data.text,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Да забанить",
                    closeOnConfirm: false
                    }, function (inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("You need to write something!");
                            return false
                        }
                        $.post('/admin/user/'+curent_user_id+'/change_ban_status',{curent_ban_status:curent_ban_status,ban_comment:inputValue},function(data){
                            if (data.status=='ok')
                            {
                                // перерисовываем иконку
                                if (curent_ban_status=='1')
                                {
                                    $($curent_elem).removeClass('fa-ban');
                                    $($curent_elem).addClass('fa-check');
                                }
                                else
                                {
                                    $($curent_elem).removeClass('fa-check');
                                    $($curent_elem).addClass('fa-ban');
                                }

                                // показываем что все ок
                                swal({   title: "Успех!",   text: "Успешно изменено",   timer: 2000, type: "success",  showConfirmButton: false });

                            }
                            else
                            {
                                // показываем ошибку
                                swal({   title: "Ошибка!",   text: "Ошибка изменения: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                            }


                        },"json");

                    });
                }
                else
                {
                    swal({   title: "Ошибка!",   text: "Ошибка запроса"+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                }

            });

        }
        else
        {
            curent_ban_status = '1';
            // меняем текст формы в зависимости от текущего статуса

            //запрашиваем причину бана
            $.get('/admin/user/'+curent_user_id+'/why_ban',function(data){


                if (data.status=='ok')
                {

                    swal({
                        title: "Убрать БАН с пользователя??",
                        text: "Вы действительно хотите убрать БАН с пользователя??",
                        type: "input",
                        inputValue:data.text,
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Да разбанить",
                        closeOnConfirm: false
                    }, function (inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("You need to write something!");
                            return false
                        }
                        $.post('/admin/user/'+curent_user_id+'/change_ban_status',{curent_ban_status:curent_ban_status,ban_comment:inputValue},function(data){
                            if (data.status=='ok')
                            {
                                // перерисовываем иконку
                                if (curent_ban_status=='1')
                                {
                                    $($curent_elem).removeClass('fa-ban');
                                    $($curent_elem).addClass('fa-check');
                                }
                                else
                                {
                                    $($curent_elem).removeClass('fa-check');
                                    $($curent_elem).addClass('fa-ban');
                                }

                                // показываем что все ок
                                swal({   title: "Успех!",   text: "Успешно изменено",   timer: 2000, type: "success",  showConfirmButton: false });

                            }
                            else
                            {
                                // показываем ошибку
                                swal({   title: "Ошибка!",   text: "Ошибка изменения: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                            }


                        },"json");

                    });
                }
                else
                {
                    swal({   title: "Ошибка!",   text: "Ошибка запроса"+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                }


            });


        }


    });
//----------------------------------------------------------------------------------------------------------------


    $('body').on('click','.user_del',function() {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_user_id = $($tr).find('.userID').text();

        // показываем форму подтверджения
        swal({
            title: "Удаление",
            text: "Вы действительно хотите удалить пользователя?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Да, удалить!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.post('/admin/user/'+curent_user_id+'/delete')
                .done(function(data) {

                    if (data.status=='ok')
                    {


                        var table = $('#users_table').DataTable();
                        table.row($($curent_elem).parent().parent()).remove().draw();

                        swal({ title:"Успех!", text:"Пользователь удален", type:"success",timer: 1000});
                    }


                })
                .error(function(data) {
                    if (data.status!='ok')
                    {

                        swal({title:"Oops", text:"Ошибка удаления: "+data.err,  type:"error",timer: 3000});
                    }

                });
        });
    });


    $('body').on('click','.user_edit',function() {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_user_id = $($tr).find('.userID').text();

        $.get('/admin/user/'+curent_user_id,function(data){

            $('#form_edit_content').html(data);
            $('#user_edit_form').modal('show');
        });


    });



        $('#users_table').DataTable({
            "ajax": {

                url:"/admin/users",
                dataSrc: 'data'
            },
            columns: [
                { data: 'id',
                    className: "userID"},

                { data: 'FIO' },
                { data: 'Email' },
                { data: 'Email_v',
                    className: "dt-center"
                },
                { data: 'Not_ban',
                    className: "dt-center"
                },
                {
                    "data": null,
                    className: "dt-center",
                    "defaultContent": "<span class='fa  fa-pencil user_edit'></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='fa  fa-trash-o user_del'></span>"
                }
            ],
            columnDefs: [{
                targets: 3,
                //  data: 'email',
                "render": function (data, type, full, meta) {
                    if (data == '1') {
                        return '<span class="fa fa-check email_v"></span>';
                    }
                    else {
                        return '<span class="fa fa-ban email_v"></span>';
                    }

                }
            },
                {
                    targets: 4,
                    //  data: 'Not_ban',
                    "render": function (data, type, full, meta) {
                        if (data == '0') {
                            return '<span class="fa fa-check ban"></span>';
                        }
                        else {
                            return '<span class="fa fa-ban ban"></span>';
                        }

                    }
                }],
            "deferRender": true,
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true,
            "language": {
                "info": "Показано с _START_ по _END_ из _TOTAL_ пользователей",
                "infoEmpty": "Тут ничего нет",
                "infoFiltered": " - найдено из _MAX_ пользователей",
                "lengthMenu": "Показывать по _MENU_ пользователей",
                "loadingRecords": "Загрузка...",
                "processing": "Обработка...",
                "search": "Поиск",
                "zeroRecords": "Ничего не найдено",
                "paginate": {
                    "first": "Первая",
                    "last": "Последняя",
                    "next": "Следующая",
                    "previous": "Предыдущая"
                },
                "emptyTable": "Нет данных"

            }
        });


    $('body').on('click','.user_profiler',function() {
        $.get('/admin/user/'+$(this).attr('user_id'),function(data){

            $('#form_edit_content').html(data);
            $('#user_edit_form').modal('show');
        });
    });

});