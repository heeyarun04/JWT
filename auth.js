const { Pool } = require ("pg")

module.exports = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'JWT',
        password: 'h@lo123',
        post: 5432,
})

