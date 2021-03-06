/**
 * Created by user on 21.06.2016.
 */



var ListModel = require('../models/listModel');

module.exports  = function() {

    var task = {
        getCountries : function(req,res)
        {
            var curent_lang = req.cookies.lang || 'en';
            ListModel.getCountries(curent_lang,function(err,data)
            {
                if (err)
                {
                    res.send({err:err,status:false});
                }

                res.send(data);

            });
        },
        getOblasts : function(req,res)
        {
            ListModel.getOblasts(function(err,data)
            {
                if (err)
                {
                    res.send({err:err,status:false});
                }

                res.send(data);
            });
        },
        getCities : function(req,res)
        {
            var oblast_id = req.params.id ? req.params.id : 0;
            ListModel.getCities(oblast_id,function(err,data)
            {
                if (err)
                {
                    res.send({err:err,status:false});
                }

                data.push({id:-1,name_ru:"Другой",name_ukr:"Інший",name_en:"Other"});
                res.send(data);
            });
        }

    };

    return task;

};