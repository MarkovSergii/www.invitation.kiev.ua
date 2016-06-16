/**
 * Created by user on 13.12.2015.
 */
$(document).ready(function() {

    var curent_menu_id;
    var $curent_elem;
    var editor_ru, editor_en, editor_ukr;
    var curent_visible_status;



//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click', '.menu_edit', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_menu_id = $($tr).find('.menu_id').text();

/*
        $("#edit_content_type").val('content');
        $(".edit_link").addClass("hidden");

        */

        $("#edit_page_link").empty();
        $.get('/admin/pages',function(data){

            data.pages.forEach(function(item){

                $("#edit_page_link").append( $('<option value="'+item.id+'">'+item.name+'</option>'));

            });

            $.get('/admin/menuitem/' + curent_menu_id, function (data) {



                $("#edit_menu_item_input_ru").val(data.menuitem.name_ru);
                $("#edit_menu_item_input_en").val(data.menuitem.name_en);
                $("#edit_menu_item_input_ukr").val(data.menuitem.name_ukr);

                $("#edit_menu_link_ru").val(data.menuitem.link_ru);
                $("#edit_menu_link_en").val(data.menuitem.link_en);
                $("#edit_menu_link_ukr").val(data.menuitem.link_ukr);

                $("#edit_page_link [value='"+data.menuitem.page_id+"']").attr("selected", "selected");



                if (data.menuitem.content_type == 'link')
                {
                    $(".edit_link").removeClass("hidden");
                    $(".edit_page").addClass("hidden");

                    $("#edit_content_type [value='link']").prop("selected", true);
                    $("#edit_content_type [value='content']").prop("selected", false);

                }
                else
                {
                    $(".edit_link").addClass("hidden");
                    $(".edit_page").removeClass("hidden");
                    $("#edit_content_type [value='link']").prop("selected", false);
                    $("#edit_content_type [value='content']").prop("selected", true);

                }

                $('#menu_edit_form').modal('show');

            });

        });

    });



//--------------------------------------------------------------------------------------------------------------------


    $('body').on('click','.menu_del',function() {

        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_menu_id = $($tr).find('.menu_id').text();

      //  $('#menu_del_form').modal('show');
        deleteMenuItem(curent_menu_id);

        function deleteMenuItem(curent_menu_id) {
            swal({
                title: "Вы уверены?",
                text: "Вы действительно хотите удалить пункт меню, страница удалена не будет?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "Да, удалить!",
                confirmButtonColor: "#ec6c62"
            }, function() {
                $.ajax({
                    url: "/admin/menuitem/"+curent_menu_id+"/delete",
                    type: "POST"
                })
                    .done(function(data) {

                        if (data.status)
                        {
                            // показываем что все ок
                            $($curent_elem).parent().parent().remove();
                            // удаляем из списка родительских
                             $('#root_menu').find($('[value = "'+curent_menu_id+'"]')).remove();
                             swal({   title: "Успех!",   text: "Пункт меню успешно удален",   timer: 2000, type: "success",  showConfirmButton: false });

                        }


                    })
                    .error(function(data) {
                        if (data.status!='ok')
                        {
                            swal({   title: "Ошибка!",   text: "Не получилось удалить: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                        }

                    });
            });
        }

    });

//--------------------------------------------------------------------------------------------------------------------


    $('body').on('click','.add_menu_item',function() {

        $("#menu_type").val(0);
        $("#root_menu").val(1);

        $("#add_content_type").val('content');


        $("#root_menu_group").addClass("hidden");
        $("#add_page_link").empty();

        $(".add_link").addClass("hidden");


        $.get('/admin/pages',function(data){

            data.pages.forEach(function(item){

                $("#add_page_link").append( $('<option value="'+item.id+'">'+item.name+'</option>'));

            });

        });


        $('#menu_item_add_form').modal('show');

    });
//--------------------------------------------------------------------------------------------------------------------

    $('body').on('change','#add_content_type',function() {

        if ($(this).val()=="content")
        {
            $(".add_link").addClass("hidden");
            $(".add_page").removeClass("hidden");
        }
        else
        {
            $(".add_link").removeClass("hidden");
            $(".add_page").addClass("hidden");

        }

    });
//--------------------------------------------------------------------------------------------------------------------

    $('body').on('change','#edit_content_type',function() {

        if ($(this).val()=="content")
        {
            $(".edit_link").addClass("hidden");
            $(".edit_page").removeClass("hidden");
        }
        else
        {
            $(".edit_link").removeClass("hidden");
            $(".edit_page").addClass("hidden");

        }

    });

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('change','#menu_type',function() {

        if ($(this).val()=="0")
        {
           $("#root_menu_group").addClass("hidden");
        }
        else
        {
           $("#root_menu_group").removeClass("hidden");
        }

    });

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click','.menu_sort_go_up',function() {
       alert('Не работает');

    });

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click','.menu_sort_go_down',function() {
        alert('Не работает');
    });
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
/// form elements



//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' #btn_modal_menu_add',function() {

        var menu_item={};
        menu_item.name_ru = $.trim($("#add_menu_item_input_ru").val());
        menu_item.name_en = $.trim($("#add_menu_item_input_en").val());
        menu_item.name_ukr = $.trim($("#add_menu_item_input_ukr").val());

        menu_item.page_id = $("#add_page_link option:selected").val();
        menu_item.content_type = $("#add_content_type option:selected").val();

        menu_item.link_ru = $.trim($("#add_menu_link_ru").val());
        menu_item.link_en = $.trim($("#add_menu_link_en").val());
        menu_item.link_ukr = $.trim($("#add_menu_link_ukr").val());




        if ($('#menu_type').val()!="0")
        {
            menu_item.root_id = $("#root_menu").val();
        }
        else
        {
            menu_item.root_id = "0";
        }

        if ((menu_item.name_ru =="") || (menu_item.name_en =="") || (menu_item.name_ukr == ""))
        {


          //  $('#menu_item_add_form').effect( "shake" );
            swal({   title: "Внимание!",   text: "Пункты не могут быть пустыми",   timer: 3000, type: "warning",  showConfirmButton: false });


        }
        else
        {
            $.post('/admin/menuitems',menu_item,function(data)
            {

                if (data.status)
                {
                    // показываем что все ок
                    swal({   title: "Успех!",   text: "Успешно добавлено",   timer: 1000, type: "success",  showConfirmButton: false });
                    location.reload();
                }
                else
                {
                    // показываем ошибку
                    swal({   title: "Ошибка!",   text: 'Ошибка удаления: '+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                }


            });

            $('#menu_item_add_form').modal('hide');
        }


    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click','.menu_visiable',function()
    {

        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        console.log($tr);
        curent_menu_id = $($tr).find('.menu_id').text();

        if ($(this).hasClass('fa-check'))
        {
            curent_visible_status = true;
        }
        else
        {
            curent_visible_status = false;
        }


        // показываем форму подтверджения
        swal({
            title: "Изменить видимость?",
            text: "Вы действительно хотите изменить видимость пункта меню?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Да, изменить!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.post('/admin/menuitem/'+curent_menu_id,{id:curent_menu_id,visible:!curent_visible_status})
                .done(function(data) {

                    if (data.status)
                    {

                        // перерисовываем иконку
                        if (curent_visible_status=='0')
                        {
                            $($curent_elem).removeClass('fa-ban');
                            $($curent_elem).addClass('fa-check');
                        }
                        else
                        {
                            $($curent_elem).removeClass('fa-check');
                            $($curent_elem).addClass('fa-ban');
                        }
                        swal({ title:"Успех!", text:"Видимость изменена", type:"success",timer: 1000});
                    }


                })
                .error(function(data) {
                    if (!data.status)
                    {

                        swal({title:"Oops", text:"Не получилось изменить видимость!",  type:"error",timer: 2000});
                    }

                });
        });



    });
//--------------------------------------------------------------------------------------------------------------------


    $('body').on('click',' #btn_modal_menu_edit',function() {


        var new_data = {};
        new_data.id = curent_menu_id;
        new_data.name_ru =  $('#edit_menu_item_input_ru').val();
        new_data.name_en =  $('#edit_menu_item_input_en').val();
        new_data.name_ukr = $('#edit_menu_item_input_ukr').val();

        new_data.page_id = $("#edit_page_link :selected").val();

        new_data.content_type = $("#edit_content_type option:selected").val();

        new_data.link_ru = $.trim($("#edit_menu_link_ru").val());
        new_data.link_en = $.trim($("#edit_menu_link_en").val());
        new_data.link_ukr = $.trim($("#edit_menu_link_ukr").val());




        $.post('/admin/menuitem/'+curent_menu_id,new_data,function(data)
        {

            if (data.status)
            {

                // показываем что все ок
                swal({   title: "Успех!",   text: "Успешно изменено",   timer: 1000, type: "success",  showConfirmButton: false });
                $('#menu_edit_form').modal('hide');
                location.reload();
            }
            else
            {
                // показываем ошибку
                // data.err
                swal({   title: "Ошибка!",   text: 'Ошибка изменения: '+data.err,   timer: 3000, type: "error",  showConfirmButton: false });

            }


        });




    });

//--------------------------------------------------------------------------------------------------------------------
});