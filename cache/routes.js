module.exports = (app) => {
	app.post('/api/example', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').example);
	app.get('/:amount?', require('C:\\xampp\\htdocs\\kanban\\app\\controllers\\home.js').index);}