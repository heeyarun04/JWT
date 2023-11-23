const { Pool } = require ("pg")
require('dotenv').config()

const pool = new Pool({
        // user: 'postgres',
        // host: 'localhost',
        // database: 'JWT',
        // password: 'h@lo123',
        // post: 5432,
connectionString: process.env.POSTGRES_URL + "?sslmode=require"      
})

pool.connect((err)=> {
        if(err) throw err
        console.log("Connection to pg database in vercel succesfully")
})

module.exports = pool