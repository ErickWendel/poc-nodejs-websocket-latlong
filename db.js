const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/maps');
// const motionCollection = db.collection('coordinates');

db.on('connect', () => console.log('Database Connected'));

module.exports = db;