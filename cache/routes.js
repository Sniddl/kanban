module.exports = (app) => {
	app.post('/api/example', require('C:\\Users\\zeb\\Documents\\kanban\\app\\controllers\\home.js').example);
	app.get('/:amount?', require('C:\\Users\\zeb\\Documents\\kanban\\app\\controllers\\home.js').index);}