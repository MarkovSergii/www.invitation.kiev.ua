/**
 * Created by user on 24.12.2015.
 */


function Question(params) {
   // var that = this;
    this.id = params.old_num + 1;
    this.name = params.ru;
    this.oreder_by = params.old_num + 1;
    this.ru = params.ru;
    this.en = params.en;
    this.ukr = params.ukr;


    this.answers = [];

    for (var t = 0;t<params.answer_ru.length;t++)
    {
        var one_a = {};
        one_a.ru = params.answer_ru[t];
        one_a.en = params.answer_en[t];
        one_a.ukr = params.answer_ukr[t];
        this.answers.push(one_a);
    }

    this.required =  params.required;
    this.pro =  params.pro;
    this.other =  params.other;
    this.type = params.type;
}


function Exhibition() {
    var that = this;
    var startDate, endDate;
    var editor_calendar_ru, editor_calendar_en, editor_calendar_ukr;
    var editor_ticket_ru, editor_ticket_en, editor_ticket_ukr;

    this.question_list = [];

    this.editor_calendar_init = function () {
        if (!editor_calendar_ru) {
            editor_calendar_ru = CKEDITOR.appendTo('editor_calendar_ru');
        }

        if (!editor_calendar_en) {
            editor_calendar_en = CKEDITOR.appendTo('editor_calendar_en');
        }

        if (!editor_calendar_ukr) {
            editor_calendar_ukr = CKEDITOR.appendTo('editor_calendar_ukr');
        }
    };
    this.editor_calendar_destroy = function () {
        editor_calendar_ru = undefined;
        editor_calendar_en = undefined;
        editor_calendar_ukr = undefined;

        $('#editor_calendar_ru').html('');
        $('#editor_calendar_en').html('');
        $('#editor_calendar_ukr').html('');

    };
    this.clear_all = function () {
        that.question_list = [];
        that.remove_step();
        that.editor_ticket_destroy();
        that.editor_calendar_destroy();
        $('.question_list').html('');

    };
    this.change_visibility = function (elem,ex_id,curent_status) {

        $.post('/admin/exhibition/'+ex_id+'/visibility',{curent_status:curent_status},function(data){
            if (data.err)
            {
                swal({
                    title: "Error",
                    text: "",
                    type: "error",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    confirmButtonText: "ОК",
                    confirmButtonColor: "#ec6c62"
                });
            }
            else
            {
                if (curent_status == true) // isvible
                {
                   // set to unvisible
                    $(elem).removeClass('fa-check');
                    $(elem).addClass('fa-ban');
                }
                else
                {
                   // set visible
                    $(elem).removeClass('fa-ban');
                    $(elem).addClass('fa-check');
                }

                swal({
                    title: "OK",
                    text: "",
                    type: "success",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    confirmButtonText: "ОК",
                    confirmButtonColor: "#ec6c62"
                });
            }
        });

    };
    this.editor_ticket_init = function () {
        if (!editor_ticket_ru) {
            editor_ticket_ru = CKEDITOR.appendTo('editor_ticket_ru');
        }

        if (!editor_ticket_en) {
            editor_ticket_en = CKEDITOR.appendTo('editor_ticket_en');
        }

        if (!editor_ticket_ukr) {
            editor_ticket_ukr = CKEDITOR.appendTo('editor_ticket_ukr');
        }
    };
    this.editor_ticket_destroy = function () {
        editor_ticket_ru = undefined;
        editor_ticket_en = undefined;
        editor_ticket_ukr = undefined;

        $('#editor_ticket_ru').html('');
        $('#editor_ticket_en').html('');
        $('#editor_ticket_ukr').html('');

    };
    this.date_picker_add_init = function () {
        // initialize datapicker

        $('#exhibition_data_range').daterangepicker({

            format: 'DD/MM/YYYY'

        }, function (start, end) {
            startDate = start;
            endDate = end;
        });


    };
    this.create_step = function () {
        $("#example-basic").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            enableCancelButton: true,
            autoFocus: true,
            onCanceled: function (event) {
                that.hide_add_form();
            },
            onFinishing: function (event) {
                return that.validate_new_exhib();
            },
            onFinished: function (event, currentIndex) {

                that.add_exhib();

            //    $("#example-basic-t-0").get(0).click();
            //    that.hide_add_form();
            }
        });

        $('a[href$="#cancel"]').css('background-color', 'red');
        $('a[href$="#finish"]').css('background-color', 'green');
    };
    this.remove_step = function () {
        $("#example-basic").steps("destroy");
    };

    this.show_add_form = function () {
        that.create_step();
        that.date_picker_add_init();
        that.editor_calendar_init();
        that.editor_ticket_init();
        $('#exhibition_add_form').modal('show');
    };
    this.hide_add_form = function () {
        this.clear_all();
        $('#exhibition_add_form').modal('hide');
    };
    this.combine_question = function(){
        var cq = {};
        cq.error = false;
        if (($('#add_simple_q_ru').val()=="") || ($('#add_simple_q_en').val()=="") || ($('#add_simple_q_ukr').val()==""))
        {
            cq.error = true;
        }
        else
        {
            // сборка обьекта
        }

        return cq
    };
    this.validate_new_exhib = function () {
        var err = false;
        var msg = "";
        // validate first page
        if (($('#add_exhib_item_input_ru').val() == "") || ($('#add_exhib_item_input_en').val() == "") || ($('#add_exhib_item_input_ukr').val() == ""))
        {
            msg = "Необходимо ввести название выставки на всех языках";
            err = true;
        }
        if (!err)
        {
            if ((!startDate) || (!endDate) || (startDate==endDate))
            {
                msg = "Необходимо ввести дату проведения выставки";
                err = true;
            }
        }
        // validate second page
        if (!err)
        {
            if ((editor_calendar_ru.getData() == "") || (editor_calendar_en.getData() == "") || (editor_calendar_ukr.getData() == ""))
            {
                msg = "Необходимо ввести блок для календаря";
                err = true;
            }
        }
        // validate third page
        if (!err)
        {
            var tmp = this.combine_question();
            if (tmp.error)
            {
                msg = "Необходимо ввести хоть один вопрос";
                err = true;
            }
        }
        // validate fouth page
        if (!err)
        {
            if ((editor_ticket_ru.getData() == "") || (editor_ticket_en.getData() == "") || (editor_ticket_ukr.getData() == ""))
            {
                msg = "Необходимо ввести блок для билетов";
                err = true;
            }
        }

        //
        if (err)
        {
            swal({
                title: "Ошибка",
                text: msg,
                type: "error",
                showCancelButton: false,
                closeOnConfirm: false,
                confirmButtonText: "ОК",
                confirmButtonColor: "#ec6c62"
            });
        }
        return !err;
    };
    this.show_edit_form = function (id) {

    };
    this.hide_edit_form = function (id) {

    };
    this.add_exhib = function () {


        var new_exhib = {};
        new_exhib.name_ru = $('#add_exhib_item_input_ru').val();
        new_exhib.name_en = $('#add_exhib_item_input_en').val();
        new_exhib.name_ukr = $('#add_exhib_item_input_ukr').val();

        new_exhib.date_begin = startDate.format('YYYY-MM-DD');
        new_exhib.date_end = endDate.format('YYYY-MM-DD');

        new_exhib.content_ru = editor_calendar_ru.getData();
        new_exhib.content_en = editor_calendar_en.getData();
        new_exhib.content_ukr = editor_calendar_ukr.getData();

        new_exhib.first_question_ru =  $('#add_simple_q_ru').val();
        new_exhib.first_question_en =  $('#add_simple_q_en').val();
        new_exhib.first_question_ukr = $('#add_simple_q_ukr').val();

        new_exhib.questions = that.question_list;

        new_exhib.content_res_ru = editor_ticket_ru.getData();
        new_exhib.content_res_en = editor_ticket_en.getData();
        new_exhib.content_res_ukr = editor_ticket_ukr.getData();


        $.post('/admin/exhibition/add',{new_exhib:JSON.stringify(new_exhib)},function(data){
            if (data.err)
            {
                swal({
                    title: "Error",
                    text: "post error",
                    type: "error",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    confirmButtonText: "ОК",
                    confirmButtonColor: "#ec6c62"
                });
            }
            else
            {
                swal({
                    title: "OK",
                    text: "post error",
                    type: "success",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    confirmButtonText: "ОК",
                    confirmButtonColor: "#ec6c62"
                });
            }
        },"json");


    };
    this.save_exhib = function (edited_exhib) {

    };
    this.delete = function (id) {

    };
    this.try_add_question = function () {
        // clear fields

        // show mega panel
        $('#save_new_question_btn').show();
        $('#del_new_question_btn').show();
        $('.question_add_panel').show();
    };
    this.discard_add_question = function () {
        // hide mega panel
        $('#save_new_question_btn').hide();
        $('#del_new_question_btn').hide();
        $('.question_add_panel').hide();
    };
    this.render_all_question = function () {
       //show all questions
        $('.question_list').html('');
        this.question_list.forEach(function(item){
            var elem = $('<div></div>').text(item.name);
            $('.question_list').append(elem);
        });

    };
    this.add_question = function (question) {

        question.old_num = this.question_list.length;


        var quest = new Question(question);
        this.question_list.push(quest);
        $('#save_new_question_btn').hide();
        $('#del_new_question_btn').hide();
        $('.question_add_panel').hide();
        this.render_all_question();

    };

}

$(document).ready(function () {

    var exhib = new Exhibition();

    $('body').on('click', '.add_exhibition', function () {

        exhib.show_add_form();
    });

    $('body').on('click', '.close', function () {
        exhib.hide_add_form();
    });

    $('body').on('click', '#add_modal_new_question_btn', function () {
        exhib.try_add_question();
    });

    $('body').on('click', '#save_new_question_btn', function () {
        // check if all fields are full then
        var ru_lines =  $('#answer_area_ru').val().split(/\r*\n/);
        var en_lines =  $('#answer_area_en').val().split(/\r*\n/);
        var ukr_lines =  $('#answer_area_ukr').val().split(/\r*\n/);


        if (($('#add_answer_ru').val()=="") || ($('#add_answer_en').val()=="") || ($('#add_answer_ukr').val()=="") || (ru_lines.length==1) || (ru_lines.length != en_lines.length) || (ru_lines.length != ukr_lines.length) || (ukr_lines.length != en_lines.length))
        {
            swal({
                title: "Ошибка",
                text: "Ошибка при вводе",
                type: "error",
                showCancelButton: false,
                closeOnConfirm: false,
                confirmButtonText: "ОК",
                confirmButtonColor: "#ec6c62"
            });
        }
        else
        {
            var question = {};
            question.ru = $('#add_answer_ru').val();
            question.en = $('#add_answer_en').val();
            question.ukr = $('#add_answer_ukr').val();
            question.answer_ru = ru_lines;
            question.answer_en = en_lines;
            question.answer_ukr = ukr_lines;
            question.required =  ($('#add_answer_req').prop("checked")) ? true : false;
            question.pro =  ($('#add_answer_pro').prop("checked")) ? true : false;
            question.other =  ($('#add_answer_other').prop("checked")) ? true : false;
            question.type = $('#question_type').val();
         //   console.log(question);


            exhib.add_question(question);
        }

    });

    $('body').on('click', '#del_new_question_btn', function () {
        exhib.discard_add_question();
    });

    $('body').on('click', '.exhibition_visiable', function () {
        var ex_id = $(this).attr('ex_id');
        var curent_status = $(this).hasClass('fa-ban') ? false : true;

        exhib.change_visibility(this,ex_id,curent_status);
    });



});

