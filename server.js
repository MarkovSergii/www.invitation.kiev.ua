/**
 * Created by user on 15.06.2016.
 */
var app = require('./app');
console.log("Hello!");


console.log("555");

app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function() {
    console.log('Server started at 127.0.0.1:3000 try to work!!!');
});

