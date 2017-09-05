module.exports = (app) => {
	app.get('/auth', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\APIController.js').AuthURL);
	app.get('/accepted', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\APIController.js').Accepted);
	app.get('/api/mysubreddits', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\endpoints.js').mysubreddits);
	app.get('/dashboard', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').dashboard);
	app.get('/redis', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').redis);
	app.get('/admin', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\admin.js').get);}