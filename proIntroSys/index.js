var koa = require('koa');
var server =  require('koa-static');
var app = koa();

app.use(server('./static'));

app.listen(3000);