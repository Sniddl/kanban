module.exports = (app) => {
	app.get('/auth', require('/Volumes/Storage/Code/kanban/app/controllers/APIController.js').AuthURL);
	app.get('/accepted', require('/Volumes/Storage/Code/kanban/app/controllers/APIController.js').Accepted);
	app.get('/api/mysubreddits', require('/Volumes/Storage/Code/kanban/app/controllers/endpoints.js').mysubreddits);
	app.get('/dashboard', require('/Volumes/Storage/Code/kanban/app/controllers/home.js').dashboard);
	app.get('/redis', require('/Volumes/Storage/Code/kanban/app/controllers/home.js').redis);}