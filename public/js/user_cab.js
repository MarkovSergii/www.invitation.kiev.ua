/**
 * Created by user on 13.06.2016.
 */
// console.log(user);
function Country()
{
    this.load = function(){

        $.get('/country', function(data){
            // $('#input_country').html("");

            data.forEach(function(item){
                $("#input_country").append( $('<option value="'+item.id+'">'+item['name_'+curent_language]+'</option>'));
            });
            // $('#input_country').prop('value', false);

        }).fail(function(err) {
           console.log(err);
        });
    }

}


function Oblast()
{

    this.load = function(){
        $.get('/oblast', function(data){
            // $('#input_oblast').html("");

            data.forEach(function(item){
                $("#input_oblast").append( $('<option value="'+item.id+'">'+item['name_'+curent_language]+'</option>'));
            });
            // $('#input_oblast').prop('value', false);

        }).fail(function(err) {
            console.log(err);
        });
    };
    this.show_input = function()
    {
        $('#input_oblast').parent().parent().show();
    };
    this.hide_input = function()
    {
        $('#input_oblast').parent().parent().hide();
    };


}

function City()
{
    this.load = function(oblast_id){
        $.get('/city/'+oblast_id, function(data){
            // $('#input_city_select').html("");

            data.forEach(function(item){
                $("#input_city_select").append( $('<option value="'+item.id+'">'+item['name_'+curent_language]+'</option>'));
            });
            // $('#input_city_select').prop('value', false);

        }).fail(function(err) {
            console.log(err);
        });
    };
    this.show_input = function()
    {
        $('#input_city').parent().parent().show();
    };
    this.hide_input = function()
    {
        $('#input_city').parent().parent().hide();
    };
    this.hide_select = function()
    {
        $('#input_city_select').parent().parent().hide();
    };
    this.show_select = function()
    {
        $('#input_city_select').parent().parent().show();
    }

}


function ShowChangePassword(){
    $('.changePassword .form-group').eq(1).toggle();
    $('.changePassword .form-group').eq(2).toggle();
}

function Registration (reg_type) //ref_type full or simple
{
    // console.log(reg_type);
    var that = this;
    var country = new Country();
    var oblast = new Oblast();
    var city = new City();

    this.registration_type = reg_type;

    this.clearfields = function()
    {
        $('#email_span').hide();
        $('#firstname_span1').hide();
        $('#lastname_span').hide();
        $('#password_span').hide();
        $('#repassword_span').hide();
        $('#mobile_span').hide();
        $('#country_span').hide();
        $('#oblast_span').hide();
        
        if (this.registration_type == 'full')
        {
            $('#postindex_span').hide();
            $('#city_select_span').hide();
            $('#city_span').hide();
            $('#street_num_span').hide();
            $('#street_span').hide();
            $('#office_span').hide();
        }
    };

   this.check = function()
   {
       this.clearfields();

       if ($('#input_firstname1').val().length==0)
       {
           $('#firstname_span1').show();
           return false
       }

       if ($('#input_lastname').val().length==0)
       {
           $('#lastname_span').show();
           return false
       }

       if ($("#input_country").val() == null)
       {
           $('#country_span').show();
           return false
       }
       if ($('#input_oblast').is(':visible') && ($("#input_oblast").val() == null))
       {
           $('#oblast_span').show();
           return false
       }
       if ($('#input_city_select').is(':visible') && ($("#input_city_select").val() == null))
       {
           $('#city_select_span').show();
           return false
       }


       if ( $('#input_city').is(':visible')  && ($("#input_city").val().length==0))
       {
           $('#city_span').show();
           return false
       }

       if (this.registration_type == 'full')
       {
           // индекс
           if ($('#input_postindex').val().length==0)
           {
               $('#postindex_span').show();
               return false
           }
           // улица
           if ($('#input_street').val().length==0)
           {
               $('#street_span').show();
               return false
           }
           // номер улицы
           if ($('#input_street_num').val().length==0)
           {
               $('#street_num_span').show();
               return false
           }

           // номер дома
           if ($('#input_office').val().length==0)
           {
               $('#office_span').show();
               return false
           }
       }


       if ($('#input_email').val().match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) == null)
       {
           $('#email_span').show();
           return false
       }

       if ($('#input_mobile').val().length==0)
       {
           $('#mobile_span').show();
           return false
       }

       // if ($('#input_password').val().match(/^[а-яА-ЯёЁa-zA-Z0-9]{6,}$/i)== null)
       // {
       //     $('#password_span').show();
       //     return false
       // }

       // if ($('#input_password').val()!=$('#input_re_password').val())
       // {
       //     $('#repassword_span').show();
       //     return false
       // }
       return true

   };

   this.init = function()
   {

      country.load();
      
      if($('#input_country option:selected').val() != 0 ){//country is not Ukraine
        oblast.hide_input();
        // city.load();
        city.show_input();
        city.hide_select();
      }else{
        oblast.load();
        // console.log($('#input_city_select option:selected').val());
      }
      
       if (this.registration_type == 'full')
       {

           // $('#input_city_select').val("");
           $('#input_city_select').parent().parent().hide();
           // $('#input_city').parent().parent().hide();

       }
   };

    this.country_select = function()
    {
       if ($(this).val() == 0)
       {
           // its ukraine
           oblast.load();
           oblast.show_input();
           city.hide_input();
           city.hide_select();
           // set mobile format
           $('#input_mobile').val('0');
           $('#input_mobile').mask('+38(000) 000-00-00');

       }
        else
       {
           // its foreign country
           oblast.hide_input();
           // oblast.hide();
           city.show_input();
           city.hide_select();
           // set mobile format
           $('#input_mobile').val('');
           $('#input_mobile').mask('0#');
           $('#input_city').empty();
           
       }
    };
    this.oblast_select = function()
    {
            $('#input_city_select').empty();
            city.load($(this).val());
            city.hide_input();
            city.show_select();
    };
    this.city_select = function()
    {

        if ($(this).val() == -1)
        {
            // other city
            city.show_input();
        }
        else
        {
            // selectted city
            city.hide_input();
        }
    };
   this.update_user = function() {

       if (that.check()) {
        

           var user = {
               first_name: $('#input_firstname1').val(),
               last_name: $('#input_lastname').val(),
               company: $('#input_company').val(),
               email: $('#input_email').val(),
               password: $('#input_password').val(),
               mobile: $('#input_mobile').val(),
               country_id: $('#input_country').val(),
               country_text: $('#input_country :selected').text(),
               oblast_id: $('#input_oblast').val(),
               oblast_text: $('#input_oblast :selected').text()

           };



           if  (that.registration_type == 'full' )
           {

               user.city_id =  $('#input_city_select').val() ;

               if ((user.city_id == '-1') ||  !$('#input_city_select').is(':visible'))
               {
                   user.city_text = $('#input_city').val();
               }
               else
               {
                   user.city_text = $('#input_city_select :selected').text();

               }






               user.postindex = $('#input_postindex').val();
               user.street = $('#input_street').val();
               user.street_num = $('#input_street_num').val();
               user.office = $('#input_office').val();
           }





           // console.log(window.location.protocol + '//' + location.host + '/user');
           $.post(window.location.protocol + '//' + location.host + '/update', user, function (data) {
               if (data.err) {
                   swal({
                       title: "Ошибка!" + data.msg,
                       text: 'Ошибка' + data.err,
                       timer: 1000,
                       type: "error",
                       showConfirmButton: false
                   });
               }
               else {
                   if (!data.status) {
                       console.log(data);
                       if (data.msg == 'no_user') {
                           swal({
                               title: "Ошибка!",
                               text: "Данный пользователь не существует обновление не произошло",
                               type: "error",
                               confirmButtonColor: "#DD6B55",
                               confirmButtonText: "ОК",
                               closeOnConfirm: true
                           }, function () {
                               // window.location = '/registration';
                           });
                       }                   }
                   else {
                       swal({
                           title: 'Успех',
                           text: 'Ваши данные изменены!',
                           type: "success",
                           showConfirmButton: true,
                           closeOnConfirm: true
                       });

                   }
               }
           });
       }
       else {
           swal({
               title: "Ошибка!",
               text: 'Ошибка',
               timer: 1000,
               type: "error",
               showConfirmButton: false
           });
       }
   }

}








$(document).ready(function() {


    var reg = ($('#input_postindex').length) ? new Registration('full') : new Registration('simple');
    reg.init();
    $('#btn_change_pass').on('click', ShowChangePassword);

    $('#input_country').change(reg.country_select);
    $('#input_oblast').change(reg.oblast_select);
    $('#input_city_select').change(reg.city_select);
    $('#btn_change_pass').click(reg.change_password);//пока не сделано
    $('#btn_register').click(reg.update_user);

});