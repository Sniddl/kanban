module.exports = (app) => {
	app.get('/', require('/Volumes/Storage/Code/kanban/app/controllers/APIController.js').AuthURL);
	app.get('/verified', require('/Volumes/Storage/Code/kanban/app/controllers/APIController.js').Verified);}