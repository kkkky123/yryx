var koa = require('koa');
var server = require('koa-static');
var app = koa();
var router = require('koa-router')();

/*var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'movielen'
});

connection.connect();

connection.query('SELECT * FROM `movies` WHERE movieId = 1', function(err, rows, fields) {
	if (err) throw err;

	console.log('The solution is: ', rows[0]);
});

connection.end();*/

/*router.get('/', function(ctx, next) {
	console.log('aa');

});*/
//app.use(router.routes()).use(router.allowedMethods());
app.use(server('./static'));

app.listen(3000);
