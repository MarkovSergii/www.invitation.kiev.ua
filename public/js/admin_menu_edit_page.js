/**
 * Created by user on 21.02.2016.
 */
$(document).ready(function() {

    var curent_page_id;
    var $curent_elem;
    var $curent_tr;
    var edit_page_ru,edit_page_en,edit_page_ukr;
    var add_page_ru,add_page_en,add_page_ukr;




//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click',' #btn_modal_page_add',function() {

        var page_item = {};

        page_item.name = $('#add_page_name').val();

        page_item.content_en =  add_page_en.getData();
        page_item.content_ru =  add_page_ru.getData();
        page_item.content_ukr =  add_page_ukr.getData();


        if (page_item.name =="")
        {

            swal({   title: "Внимание!",   text: "Название не может быть пустым",   timer: 1500, type: "warning",  showConfirmButton: false });

        }
        else
        {
            $.post('/admin/pages', page_item, function (data) {

                if (data.status) {
                    // показываем что все ок
                    swal({
                        title: "Успех!",
                        text: "Успешно изменено",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });
                    location.reload();

                }
                else {
                    // показываем ошибку
                    swal({
                        title: "Ошибка!",
                        text: 'Ошибка измения: ' + data.err,
                        timer: 3000,
                        type: "error",
                        showConfirmButton: false
                    });
                }


            });

            $('#page_content_edit_form').modal('hide');

        }



    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' .page_del',function() {

        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        $curent_tr = $tr;
        curent_page_id = $(this).attr('page_id');

        swal({
            title: "Удалить страницу?",
            text: "Вы действительно хотите удалить страницу безвозвратно?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Да, удалить!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.post('/admin/page/'+curent_page_id+'/delete')
                .done(function(data) {

                    if (data.status)
                    {
                        $($tr).remove();
                        swal({ title:"Успех!", text:"Успешно удалено", type:"success",timer: 1000});
                    }


                })
                .error(function(data) {
                    if (data.status!='true')
                    {

                        swal({title:"Oops", text:"Не получилось удалить!",  type:"error",timer: 2000});
                    }

                });
        });
    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' .add_page_item',function() {

        if (!add_page_ru) {
            add_page_ru = CKEDITOR.appendTo('add_page_ru');

        }

        if (!add_page_en) {
            add_page_en = CKEDITOR.appendTo('add_page_en');

        }

        if (!add_page_ukr) {
            add_page_ukr = CKEDITOR.appendTo('add_page_ukr');
        }


        $("#add_page_name").val("");

        $("#edit_page_ru").val("");
        $("#edit_page_en").val("");
        $("#edit_page_ukr").val("");


        $('#page_item_add_form').modal('show');

    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' .page_edit',function() {


        // get type of link by ID and show needed page
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        $curent_tr = $tr;
        curent_page_id = $(this).attr('page_id');


        $.get('/admin/page/' + curent_page_id, function (data) {

                if ((!data.err) &&  (data.status))
                {
                    if (!edit_page_ru) {
                        edit_page_ru = CKEDITOR.appendTo('edit_page_ru');

                    }

                    if (!edit_page_en) {
                        edit_page_en = CKEDITOR.appendTo('edit_page_en');

                    }

                    if (!edit_page_ukr) {
                        edit_page_ukr = CKEDITOR.appendTo('edit_page_ukr');
                    }

                    edit_page_ru.setData(data.page.content_ru);
                    edit_page_en.setData(data.page.content_en);
                    edit_page_ukr.setData(data.page.content_ukr);

                    $('#edit_link_p_content_name').val(data.page.name);

                    $('#page_content_edit_form').modal('show');

                }
            });




    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' #btn_modal_content_page_edit',function() {

        var page_item = {};

        page_item.id = curent_page_id;
        page_item.name = $('#edit_link_p_content_name').val();
        page_item.content_en =  edit_page_en.getData();
        page_item.content_ru =  edit_page_ru.getData();
        page_item.content_ukr =  edit_page_ukr.getData();


        if (page_item.name =="")
        {

            swal({   title: "Внимание!",   text: "Название не может быть пустым",   timer: 3000, type: "warning",  showConfirmButton: false });

        }
        else
        {
            $.post('/admin/page/'+curent_page_id, page_item, function (data) {

                if (data.status) {
                    // показываем что все ок
                    swal({
                        title: "Успех!",
                        text: "Успешно изменено",
                        timer: 1000,
                        type: "success",
                        showConfirmButton: false
                    });

                    $($curent_tr).find('.page_name').text(page_item.name);

                }
                else {
                    // показываем ошибку
                    swal({
                        title: "Ошибка!",
                        text: 'Ошибка измения: ' + data.err,
                        timer: 3000,
                        type: "error",
                        showConfirmButton: false
                    });
                }


            });

            $('#page_content_edit_form').modal('hide');

        }

    });
//--------------------------------------------------------------------------------------------------------------------

});