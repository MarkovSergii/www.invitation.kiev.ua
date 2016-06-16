/**
 * Created by user on 13.06.2016.
 */
var fs = require('fs');
var path = require ('path');


module.exports = (function Translate(){
    this.get_language = function(lang)
    {
           var data = fs.readFileSync(path.join(__dirname+'/../public/js/translations.js'),'utf8');
           var temp  = data.toString();
           var tr = temp.substr(temp.search('=')+1,temp.length);

           var translations =  JSON.parse(tr);
           var mas = {};
           translations.forEach(function(item) {
               if ((item['lang_' + lang]))
                   mas[item.id] = item['lang_' + lang]
            });
            return mas;
    };
    return this.get_language
})();


