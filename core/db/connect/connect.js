
const { Pool } = require('pg')

var client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'VortCHat',
    password: 'Bubusmi463223737',
    port: 5432,
});



module.exports = client;

