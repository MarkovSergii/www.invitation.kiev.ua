/**
 * Created by user on 07.06.2016.
 */
var walk    = require('walk');
var read_file = require('fs-readfile-promise');
var fs = require('fs');
var path= require('path');

module.exports  = function(){

    var task = {

      getListOf:function(real_path,callback)
      {

        var walker  = walk.walk(real_path, { followLinks: false });
      //  console.log(path);
        var mas = [];
        walker.on("file",function(root, fileStats, next){
          mas.push(fileStats);
          next();
        });
        walker.on("errors",function(){
          next();
        });
        walker.on("end",function(){
          callback(mas)
        });

      },
      readFile:function(req,res)
      {
      //  console.log(req.query);
        var filename =  req.query.filename;
        var file_type = req.query.file_type;

        if (file_type == 'js')
        {
          read_file(path.join(__dirname,"/../public/js/")+filename)
              .then(function(buffer){
                res.send(buffer.toString());
              })
              .catch(function(err){
                res.send("no file");
              });
        }
        if (file_type == 'css')
        {
          read_file(path.join(__dirname,"/../public/css/")+filename)
              .then(function(buffer){
                res.send(buffer.toString());
              })
              .catch(function(err){
                res.send("no file");
              });
        }
        if (file_type == 'hbs')
        {
          read_file(path.join(__dirname,"/../views/")+filename)
              .then(function(buffer){
                res.send(buffer.toString());
              })
              .catch(function(err){
                res.send("no file");
              });
        }

      },
      saveFile:function(req,res)
      {
        var file_name = req.body.file_name;
        var file_context = req.body.file_context;
        var file_type = req.body.file_type;
        var real_path = "";
        if (file_type == 'hbs') real_path = path.join(__dirname,"/../views");
        if (file_type == 'css') real_path = path.join(__dirname,"/../public/css");
        if (file_type == 'js') real_path = path.join(__dirname,"/../public/js");

        fs.writeFile(real_path+'/'+file_name, file_context, 'utf8', function(err){
          if (err)
          {
            res.send({err:err});
          }
          else
          {
            res.send({err:null});
          }
        });
      },
      deleteFile:function(req,res)
      {
        var file_name = req.body.file_name;
        var file_type = req.body.file_type;
        var path = "";
        if (file_type == 'hbs') path = __dirname+"/../views";
        if (file_type == 'css') path = __dirname+"/../public/css";
        if (file_type == 'js') path = __dirname+"/../public/js";
        fs.unlink(path+'/'+file_name, function (err) {
          if (err)
          {
            res.send({err:err});
          }
          else
          {
            res.send({err:null});
          }
      });
      }


    };


    return task;
};