/**
 * Created by user on 01.06.2016.
 */
/**
 * Created by user on 01.06.2016.
 */

module.exports  = function(){


    var task = {
        logout:function(req,res){
            req.logout();

            res.redirect('/admin');

        },

        upload:function(req,res){
            // send result to server

            var CKEditorFuncNum = req.query.CKEditorFuncNum;
            res.send("<script>window.parent.CKEDITOR.tools.callFunction( "+CKEditorFuncNum+", '/images/"+req.file.filename+"' );</script>");
        }


    };




    return task;
};