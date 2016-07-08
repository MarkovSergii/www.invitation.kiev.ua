/**
 * Created by user on 15.06.2016.
 */
var app = require('./app');


app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function() {
    console.log('Server started at 127.0.0.1:3000');
});

app.listen(process.env.PORT || 3000, process.env.IP || '10.1.1.62', function() {
    console.log('Server started at 10.1.1.62:3000');
});