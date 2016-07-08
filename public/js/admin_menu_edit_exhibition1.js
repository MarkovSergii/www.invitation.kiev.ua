/**
 * Created by user on 24.12.2015.
 */


function Question(params) {
    var that = this;
    this.id = params.old_num + 1;
    this.name = params.name_ru+this.id;
    this.oreder_by = params.oreder_by + 1;

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
                alert("kk");
                $("#example-basic-t-0").get(0).click();
                that.hide_add_form();
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
    this.validate_new_exhib = function () {
        return true;
    };
    this.show_edit_form = function (id) {

    };
    this.hide_edit_form = function (id) {

    };
    this.add_exhib = function (new_exhib) {

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
    this.add_question = function () {
        var params = {old_num:this.question_list.length,name_ru:"Вопрос № "};
        var quest = new Question(params);
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
        exhib.add_question();
        // else show error
    });

    $('body').on('click', '#del_new_question_btn', function () {
        exhib.discard_add_question();
    });



});

