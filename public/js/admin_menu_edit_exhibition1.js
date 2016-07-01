/**
 * Created by user on 24.12.2015.
 */

function Exhibition()
{
   var that = this;
   this.create_step = function()
   {
       $("#example-basic").steps({
           headerTag: "h3",
           bodyTag: "section",
           transitionEffect: "slideLeft",
           enableCancelButton:true,
           autoFocus: true,
           onCanceled: function (event) {
               that.hide_add_form();
           },
           onFinishing:function(event)
           {
               return that.validate_new_exhib();
           },
           onFinished:function(event,currentIndex){
               alert("kk");
               $("#example-basic-t-0").get(0).click();
               that.hide_add_form();
           }
       });

       $('a[href$="#cancel"]').css('background-color','red');
       $('a[href$="#finish"]').css('background-color','green');
   };
    this.remove_step = function()
    {
        $("#example-basic").steps("destroy");
    };

   this.show_add_form = function()
   {
      that.create_step();
      $('#exhibition_add_form').modal('show');
   };
   this.hide_add_form = function()
   {
       that.remove_step();
      $('#exhibition_add_form').modal('hide');
   };
   this.validate_new_exhib = function()
   {
      return true;
   };
   this.show_edit_form = function(id)
   {

   };
   this.hide_edit_form = function(id)
   {

   };
   this.add_exhib = function(new_exhib)
   {

   };
   this.save_exhib = function(edited_exhib)
   {

   };
    this.delete = function(id)
   {

   }
}

$(document).ready(function() {

    var exhib = new Exhibition();
    $('body').on('click','.add_exhibition',function() {
        exhib.show_add_form();
    });


});

