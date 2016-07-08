/**
 * Created by user on 24.12.2015.
 */

$(document).ready(function() {

    var curent_exhibition_id;
    var curent_question_id;
    var $curent_elem;
    var editor_calendar_ru, editor_calendar_en, editor_calendar_ukr;
    var editor_ticket_ru, editor_ticket_en, editor_ticket_ukr;    
    var curent_visible_status;
    var simple_list = [];
    var startDate,endDate;
    var q_type;

//--------------------------------------------------------------------------------------------------------------------
  /*  if (!editor_calendar_ru)
    {
        editor_calendar_ru = CKEDITOR.appendTo( 'editor_calendar_ru' );

    }

    if (!editor_calendar_en)
    {
        editor_calendar_en = CKEDITOR.appendTo( 'editor_calendar_en' );

    }

    if (!editor_calendar_ukr)
    {
        editor_calendar_ukr = CKEDITOR.appendTo( 'editor_calendar_ukr' );
    }
//--------------------------------------------------------------------------------------------------------------------
    if (!editor_ticket_ru)
    {
        editor_ticket_ru = CKEDITOR.appendTo( 'editor_ticket_ru' );

    }

    if (!editor_ticket_en)
    {
        editor_ticket_en = CKEDITOR.appendTo( 'editor_ticket_en' );

    }

    if (!editor_ticket_ukr)
    {
        editor_ticket_ukr = CKEDITOR.appendTo( 'editor_ticket_ukr' );
    }*/
//--------------------------------------------------------------------------------------------------------------------
//Date range picker
     $('#exhibition_data_range').daterangepicker({

        format: 'DD/MM/YYYY'

    },function(start,end){
         startDate = start;
         endDate = end;
     });

    $('#edit_exhibition1_data_range').daterangepicker({

       format: 'DD/MM/YYYY'

    },function(start,end){
        startDate = start;
        endDate = end;

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click','.exhibition_del',function() {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        swal({
            title: "Вы уверены?",
            text: "Вы действительно хотите удалить выставку?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "Да, удалить!",
            confirmButtonColor: "#ec6c62"
        }, function() {
            $.post('/admin/exhibition/'+curent_exhibition_id+'/delete')

                .done(function(data) {

                    if (data.status=='ok')
                    {
                        // показываем что все ок
                        $($curent_elem).parent().parent().remove();
                        swal({   title: "Успех!",   text: "Успешно удалено",   timer: 2000, type: "success",  showConfirmButton: false });
                    }


                })
                .error(function(data) {
                    if (data.status!='ok')
                    {
                        swal({   title: "Ошибка!",   text: "Ошибка удаления: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                    }

                });
        });

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click','.add_exhibition',function() {


        $('#exhibition_add_form').modal('show');

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click','.exhibition_visiable',function()
    {

        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
    //    console.log($tr);
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        if ($(this).hasClass('fa-check'))
        {
            curent_visible_status = '1';
        }
        else
        {
            curent_visible_status = '0';
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
            $.post('/admin/exhibition/'+curent_exhibition_id+'/visible',{curent_visible_status:curent_visible_status})
                .done(function(data) {

                    if (data.status=='ok')
                    {
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
                    if (data.status!='ok')
                    {

                        swal({title:"Oops", text:"Не получилось изменить видимость!",  type:"error",timer: 2000});
                    }

                });
        });
    });

//--------------------------------------------------------------------------------------------------------------------
      $('body').on('click', '.pro_question_del, .simple_question_del', function () {
        $curent_elem = this;
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();

          swal({
              title: "Вы уверены?",
              text: "Вы действительно хотите удалить вопрос? Вся статистика и все данные по нему будут удалены!!!",
              type: "warning",
              showCancelButton: true,
              closeOnConfirm: false,
              confirmButtonText: "Да, удалить!",
              confirmButtonColor: "#ec6c62"
          }, function() {
              $.post('/admin/exhibition/'+curent_exhibition_id+'/question/'+curent_question_id+'/delete')

                  .done(function(data) {

                      if (data.status=='ok')
                      {
                          $('.simple_question').load('/admin/exhibition/'+curent_exhibition_id+'/simple_question');
                          $('.pro_question').load('/admin/exhibition/'+curent_exhibition_id+'/pro_question');
                          swal({   title: "Успех!",   text: "Успешно удалено",   timer: 2000, type: "success",  showConfirmButton: false });
                      }


                  })
                  .error(function(data) {
                      if (data.status!='ok')
                      {
                          swal({   title: "Ошибка!",   text: "Ошибка удаления: "+data.err,   timer: 3000, type: "error",  showConfirmButton: false });
                      }

                  });
          });
    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.simple_question_edit, .pro_question_edit ', function () {
        $curent_elem = this;
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();

        $('#question_edit_form').modal('show');
    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.add_simple_question', function () {
        simple_list = [];

        $('#add_ru_simple_answer').val('');
        $('#add_en_simple_answer').val('');
        $('#add_ukr_simple_answer').val('');
        $('#add_simple_text').attr('checked',false);

        $('#add_ru_simple_question').val('');
        $('#add_en_simple_question').val('');
        $('#add_ukr_simple_question').val('');

        $('#add_simple_answer_list').html('');
        q_type = '0';


        $('#add_simple_question_form').modal('show');
    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.add_pro_question', function () {
        simple_list = [];

        $('#add_ru_simple_answer').val('');
        $('#add_en_simple_answer').val('');
        $('#add_ukr_simple_answer').val('');
        $('#add_simple_text').attr('checked',false);

        $('#add_ru_simple_question').val('');
        $('#add_en_simple_question').val('');
        $('#add_ukr_simple_question').val('');

        $('#add_simple_answer_list').html('');
        q_type = '1';

        $('#add_simple_question_form').modal('show');
    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.simple_question_sort_go_up', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();
        var curent_pos = $(this).parent().find('.question_span_sort').text();


        $.post('/admin/exhibition/'+parseInt(curent_exhibition_id)+'/question/'+parseInt(curent_question_id)+'/'+(parseInt(curent_pos)-1),function(){
            $('.simple_question').load('/admin/exhibition/'+curent_exhibition_id+'/simple_question');
        });

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.simple_question_sort_go_down', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();
        var curent_pos = $(this).parent().find('.question_span_sort').text();


        $.post('/admin/exhibition/'+parseInt(curent_exhibition_id)+'/question/'+parseInt(curent_question_id)+'/'+(parseInt(curent_pos)+1),function(){
            $('.simple_question').load('/admin/exhibition/'+curent_exhibition_id+'/simple_question');
        });

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.pro_question_sort_go_up', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();
        var curent_pos = $(this).parent().find('.question_span_sort').text();

        console.log('/admin/exhibition/'+curent_exhibition_id+'/question/'+curent_question_id+'/'+curent_pos-1);

        $.post('/admin/exhibition/'+parseInt(curent_exhibition_id)+'/question/'+parseInt(curent_question_id)+'/'+(parseInt(curent_pos)-1),function(){
            $('.pro_question').load('/admin/exhibition/'+curent_exhibition_id+'/pro_question');
        });

    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.pro_question_sort_go_down', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_question_id = $($tr).find('.question_id').text();
        var curent_pos = $(this).parent().find('.question_span_sort').text();


        $.post('/admin/exhibition/'+parseInt(curent_exhibition_id)+'/question/'+parseInt(curent_question_id)+'/'+(parseInt(curent_pos)+1),function(){
            $('.pro_question').load('/admin/exhibition/'+curent_exhibition_id+'/pro_question');
        });

    });



//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.exhibition_view_edit', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        $(".exhib_item_name").text($($tr).find('.exhib_id').next().text());
        $(".exhib_item_id").text(" ID = "+curent_exhibition_id);

        $('#exhibition_view_edit_form').modal('show');



        $.get('/admin/exhibition/' + curent_exhibition_id, function (data) {


            // календарь

             if (!editor_calendar_ru) {
             editor_calendar_ru = CKEDITOR.appendTo('editor_calendar_ru');
             }

             if (!editor_calendar_en) {
             editor_calendar_en = CKEDITOR.appendTo('editor_calendar_en');

             }

             if (!editor_calendar_ukr) {
             editor_calendar_ukr = CKEDITOR.appendTo('editor_calendar_ukr');
             }

             editor_calendar_ru.setData(data.content_ru);
             editor_calendar_en.setData(data.content_en);
             editor_calendar_ukr.setData(data.content_ukr);



        });

    });


//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click', '.exhibition_result_edit', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        $(".exhib_item_name").text($($tr).find('.exhib_id').next().text());
        $(".exhib_item_id").text(" ID = "+curent_exhibition_id);

        $('#exhibition_result_edit_form').modal('show');



        $.get('/admin/exhibition/' + curent_exhibition_id, function (data) {



             // тикет
             if (!editor_ticket_ru) {
             editor_ticket_ru = CKEDITOR.appendTo('editor_ticket_ru');

             }

             if (!editor_ticket_en) {
             editor_ticket_en = CKEDITOR.appendTo('editor_ticket_en');

             }

             if (!editor_ticket_ukr) {
             editor_ticket_ukr = CKEDITOR.appendTo('editor_ticket_ukr');
             }

             editor_ticket_ru.setData(data.content_res_ru);
             editor_ticket_en.setData(data.content_res_en);
             editor_ticket_ukr.setData(data.content_res_ukr);





        });

    });

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click', '.exhibition_question_edit', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        $(".exhib_item_name").text($($tr).find('.exhib_id').next().text());
        $(".exhib_item_id").text(" ID = "+curent_exhibition_id);

        $('.simple_question').load('/admin/exhibition/'+curent_exhibition_id+'/simple_question');
        $('.pro_question').load('/admin/exhibition/'+curent_exhibition_id+'/pro_question');

        $('#exhibition_question_edit_form').modal('show');

    });

//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click', '.exhibition_edit', function () {
        $curent_elem = this;
        // поиск userID
        var $tr = $(this).parent().parent();
        curent_exhibition_id = $($tr).find('.exhib_id').text();

        $(".exhib_item_name").text($($tr).find('.exhib_id').next().text());
        $(".exhib_item_id").text(" ID = "+curent_exhibition_id);



        $('#exhibition_edit_form').modal('show');



        $.get('/admin/exhibition/' + curent_exhibition_id, function (data) {

            // заполнить пункты для редактирования общие настройки



            $('#edit_exhib_item_input_ru').val(data.name_ru);
            $('#edit_exhib_item_input_en').val(data.name_en);
            $('#edit_exhib_item_input_ukr').val(data.name_ukr);




            var start_date = moment(data.date_begin).format('DD/MM/YYYY');
            var end_date = moment(data.date_end).format('DD/MM/YYYY');

            $('#edit_exhibition1_data_range').val(start_date+' - '+end_date);

            $('#edit_exhibition1_data_range').daterangepicker({
                format: 'DD/MM/YYYY',
                startDate: start_date,
                endDate:end_date
            },function(start,end){
                startDate = start;
                endDate = end;

            });



        });


    });

//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click',' #btn_modal_exhibition_view_edit',function() {

        var exhib_item={};
        exhib_item.content_ru = editor_calendar_ru.getData();
        exhib_item.content_en = editor_calendar_en.getData();
        exhib_item.content_ukr = editor_calendar_ukr.getData();



        $.post('/admin/exhibition/'+curent_exhibition_id+'/edit',exhib_item,function(data)
        {

            if (data.status=='ok')
            {

                // показываем что все ок

                $('.alert-success').find('div').text('Успешно изменено');
                $('.alert-success').toggleClass( "hidden");
                setTimeout(function(){
                    $('.alert-success').toggleClass( "hidden");
                   // location.reload();
                },1000);


            }
            else
            {
                // показываем ошибку
                // data.err
                $('.alert-danger').find('div').text('Ошибка изменения: '+data.err);
                $('.alert-danger').toggleClass( "hidden");
                setTimeout(function(){
                    $('.alert-danger').toggleClass( "hidden");
                },5000);


            }


        });
        $('#exhibition_view_edit_form').modal('hide');

    });


//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click',' #btn_modal_exhibition_result_edit',function() {

        var exhib_item={};
        exhib_item.content_res_ru = editor_ticket_ru.getData();
        exhib_item.content_res_en = editor_ticket_en.getData();
        exhib_item.content_res_ukr = editor_ticket_ukr.getData();



        $.post('/admin/exhibition/'+curent_exhibition_id+'/edit',exhib_item,function(data)
        {

            if (data.status=='ok')
            {

                // показываем что все ок

                $('.alert-success').find('div').text('Успешно изменено');
                $('.alert-success').toggleClass( "hidden");
                setTimeout(function(){
                    $('.alert-success').toggleClass( "hidden");
                  // location.reload();
                },1000);


            }
            else
            {
                // показываем ошибку
                // data.err
                $('.alert-danger').find('div').text('Ошибка изменения: '+data.err);
                $('.alert-danger').toggleClass( "hidden");
                setTimeout(function(){
                    $('.alert-danger').toggleClass( "hidden");
                },5000);


            }


        });
        $('#exhibition_result_edit_form').modal('hide');

    });



//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' #btn_modal_exhibition_edit',function() {

        var exhib_item={};
        exhib_item.name_ru = $.trim($("#edit_exhib_item_input_ru").val());
        exhib_item.name_en = $.trim($("#edit_exhib_item_input_en").val());
        exhib_item.name_ukr = $.trim($("#edit_exhib_item_input_ukr").val());


      //  alert($('#edit_exhibition_data_range').val());

        exhib_item.date_begin = startDate.format('YYYY-MM-DD');
        exhib_item.date_end = endDate.format('YYYY-MM-DD');



        //  alert(startDate);


        if ((exhib_item.name_ru =="") || (exhib_item.name_en =="") || (exhib_item.name_ukr == "") || (!startDate) || (!endDate) || (startDate==endDate))
        {


            $('#exhibition_edit_form').effect( "shake" );
            $('.alert-danger').find('div').text('Нудно ввести название выставки и дату проведения');
            $('.alert-danger').toggleClass( "hidden");
            setTimeout(function(){
                $('.alert-danger').toggleClass( "hidden");
            },3000);

        }
        else
        {
            $.post('/admin/exhibition/'+curent_exhibition_id+'/edit',exhib_item,function(data)
            {

                if (data.status=='ok')
                {

                    // показываем что все ок

                    $('.alert-success').find('div').text('Успешно добавлено');
                    $('.alert-success').toggleClass( "hidden");
                    setTimeout(function(){
                        $('.alert-success').toggleClass( "hidden");
                        location.reload();
                    },1000);


                }
                else
                {
                    // показываем ошибку
                    // data.err
                    $('.alert-danger').find('div').text('Ошибка удаления: '+data.err);
                    $('.alert-danger').toggleClass( "hidden");
                    setTimeout(function(){
                        $('.alert-danger').toggleClass( "hidden");
                    },5000);


                }


            });

            $('#exhibition_edit_form').modal('hide');
        }


    });

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' #btn_modal_exhibition_add',function() {

        var exhib_item={};
        exhib_item.name_ru = $.trim($("#add_exhib_item_input_ru").val());
        exhib_item.name_en = $.trim($("#add_exhib_item_input_en").val());
        exhib_item.name_ukr = $.trim($("#add_exhib_item_input_ukr").val());


        exhib_item.date_begin = startDate.format('YYYY-MM-DD');
        exhib_item.date_end = endDate.format('YYYY-MM-DD');


          //  alert(startDate);


        if ((exhib_item.name_ru =="") || (exhib_item.name_en =="") || (exhib_item.name_ukr == "") || (!startDate) || (!endDate) || (startDate==endDate))
        {


            $('#exhibition_add_form').effect( "shake" );
            $('.alert-danger').find('div').text('Нудно ввести название выставки и дату проведения');
            $('.alert-danger').toggleClass( "hidden");
            setTimeout(function(){
                $('.alert-danger').toggleClass( "hidden");
            },3000);

        }
        else
        {
            $.post('/admin/exhibition/add',exhib_item,function(data)
            {

                if (data.status=='ok')
                {

                    // показываем что все ок

                    $('.alert-success').find('div').text('Успешно добавлено');
                    $('.alert-success').toggleClass( "hidden");
                    setTimeout(function(){
                        $('.alert-success').toggleClass( "hidden");
                        location.reload();
                    },1000);


                }
                else
                {
                    // показываем ошибку
                    // data.err
                    $('.alert-danger').find('div').text('Ошибка удаления: '+data.err);
                    $('.alert-danger').toggleClass( "hidden");
                    setTimeout(function(){
                        $('.alert-danger').toggleClass( "hidden");
                    },5000);


                }


            });

            $('#exhibition_add_form').modal('hide');
        }


    });
//--------------------------------------------------------------------------------------------------------------------
    $('body').on('click',' #add_simple_btn',function() {
        var simple_item={};

        simple_item.name_ru = $('#add_ru_simple_answer').val();
        simple_item.name_en = $('#add_en_simple_answer').val();
        simple_item.name_ukr = $('#add_ukr_simple_answer').val();

        simple_item.can_save_text = $('#add_simple_text').prop('checked');

        simple_list.push(simple_item);
        ShowAnswerList('add_simple_answer_list',simple_list);

        $('#add_ru_simple_answer').val('');
        $('#add_en_simple_answer').val('');
        $('#add_ukr_simple_answer').val('');

        $('#add_simple_text').attr('checked',false);
    });
//--------------------------------------------------------------------------------------------------------------------
var ShowAnswerList = function(father_div,mas)
{
        $('#'+father_div).html('');
        mas.forEach(function(item){


            $('#'+father_div).append("<div>"+"<span id='name_span'>"+item.name_ru+"</span>&nbsp;&nbsp;&nbsp;&nbsp;"+"text_type&nbsp;&nbsp;"+item.can_save_text+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span  class = 'del_added_simple_answer'>Del</span></div>");

    });
};
//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click',' .del_added_simple_answer',function() {
        var item_todel;
      //  console.log(this);
        var some_div = $(this).parent();
        var div_name = $(some_div).find('#name_span').text();
        simple_list.forEach(function(item,i){

            if (item.ru===div_name)
            {
                item_todel = i;
                simple_list.splice(item_todel,1);
                ShowAnswerList('add_simple_answer_list',simple_list);

            }

        });


    });
//--------------------------------------------------------------------------------------------------------------------

    $('body').on('click',' #btn_add_simple_question',function() {


        var question = {};
        question.name_ru=$('#add_ru_simple_question').val();
        question.name_en=$('#add_en_simple_question').val();
        question.name_ukr=$('#add_ukr_simple_question').val();
        question.spec_or_not = 0;

        if ($('#radios-0').prop('checked'))
        {
            question.question_type = 'radio';
        }
        else
        {
            question.question_type = 'check';
        }


        question.answers = simple_list;
        var data_to_post ={};
        data_to_post.question = question;
        data_to_post.q_type = q_type;

        $.post('/admin/exhibition/'+curent_exhibition_id+'/question/add',{data_to_post:JSON.stringify(data_to_post)},function(data){
            if (data.status=='ok')
            {
                $('.simple_question').load('/admin/exhibition/'+curent_exhibition_id+'/simple_question');
                $('.pro_question').load('/admin/exhibition/'+curent_exhibition_id+'/pro_question');
                $('#add_simple_question_form').modal('hide');
            }
            else
            {
                swal('Error');
            }
        },"json")
    });






});

