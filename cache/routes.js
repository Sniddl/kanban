module.exports = (app) => {
	app.get('/auth', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\oAuth.js').AuthURL);
	app.get('/accepted', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\oAuth.js').Accepted);
	app.get('/api/mysubreddits', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\endpoints.js').mysubreddits);
	app.get('/api/unmoderated/:type?/:name?', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\endpoints.js').unmoderated);
	app.get('/redis', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').redis);
	app.get('/admin', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\admin.js').get);
	app.get('/docs', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').docs);
	app.post('/changepermission', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\admin.js').change_permission);}