/**
 * Created by Markoff on 12.07.2016.
 */
// var html2canvas = require('html2canvas');

function Order_invit (ex_id)
{
    var that = this;
    this.ex_id = ex_id;
    this.user_type='simple';
    this.user_type_answer;
    this.all_questions = [];


    this.transform_questionst = function(data)
    {
        return data.map(function(item){
            var new_item = {};

            new_item.questionClass = "question_class";
            new_item.answerClass = "answer_class";
            new_item.questionType = item.q_type;
            new_item.is_first = item.is_first;
            new_item.is_pro = item.is_pro;
            new_item.required = "question_class";
            new_item.text = item['name_'+curent_language];
            new_item.id = item.id;

            var new_answers = item.answers.map(function(ans){
                var new_answer = {};
                new_answer.id = ans.id;
                new_answer.text = ans['name_'+curent_language];
                if (ans.name_ru=='Другое')
                {
                    new_answer.other = true
                }



                return new_answer;


            });

            new_item.question = {
                id:item.id,
                text:item['name_'+curent_language],
                answers:new_answers
            };


            return new_item

        });
    };
    this.get_all_questions = function()
    {
        $.get('/user/exhibition/'+that.ex_id+'/questions',function(data){
            that.all_questions = that.transform_questionst(data.data);

            that.show_first_question();
        });



    };
    this.show_first_question = function()
    {



        var go_next_after_first = function()
        {
            var first_result = q1.FirstTextVal();
            that.user_type_answer = q1.getValues();

            if (first_result.error)
            {

            }
            else
            {
                if (first_result.data == find_translation('no',curent_language))
                {
                    that.user_type='simple';
                    that.show_only_basic_question();
                }
                else
                {
                    that.user_type='pro';
                    that.show_basic_and_pro_question();
                }
            }

        };

        var first = that.all_questions.filter(function(obj){
            if (obj.is_first) return true
        });

        var q1 = $('#query_block').createQuiz({
            data:first,
            submitButton:true,
            submitFunction:go_next_after_first,
            submitButtonClass:"next_button_class",
            submitButtonText: find_translation('question_btn_next',curent_language),
            showRequireError:true


        });



    };
    this.show_only_basic_question = function()
    {
        var pro = that.all_questions.filter(function(obj){
            if ((!obj.is_pro) && (!obj.is_first)) return true
        });

        var q1 = $('#query_block').createQuiz({
            data:pro,
            submitButton:true,
            submitFunction:that.send_result,
            submitButtonClass:"next_button_class",
            submitButtonText: find_translation('question_btn_next',curent_language),
            showRequireError:true


        });
    };
    this.show_basic_and_pro_question = function()
    {
        var all = that.all_questions.filter(function(obj){
            if (!obj.is_first) return true
        });

        $('#query_block').createQuiz({
            data:all,
            submitButton:true,
            submitFunction:that.send_result,
            submitButtonClass:"next_button_class",
            submitButtonText: find_translation('question_btn_next',curent_language),
            showRequireError:true


        });
    };
    this.send_result = function()
    {
        if (this.getValues().error == false)
        {
            var user_answer = this.getValues().data.concat(that.user_type_answer.data);
            $.post('/user/exhibitions/get_ticket',{answers:JSON.stringify(user_answer),exhibition_id:that.ex_id},function(data){
                that.show_ticket(data);
            });
        }
    };
    this.show_ticket = function(data)
    {
        
        html2canvas(data, {
                allowTaint: true,
            onrendered: function(canvas) {
                    $('#query_block').prepend(canvas);
            var dataURL = canvas.toDataURL();
                console.log(dataURL);
            }
        });
            // $('#query_block').html(data);
          
    };
}



$(document).ready(function(){


    var invit = new Order_invit($('#query_block').attr('ex_id'));
    invit.get_all_questions();





});