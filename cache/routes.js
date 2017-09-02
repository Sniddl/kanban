module.exports = (app) => {
	app.post('/api/example', require('/Volumes/Storage/Code/kanban/app/controllers/home.js').example);
	app.get('/:amount?', require('/Volumes/Storage/Code/kanban/app/controllers/home.js').index);
}