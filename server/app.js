const express = require('express')
const app = express()
// blog post routes
const conn = require('./db/conn')
const bodyParser = require('body-parser');
const cors = require('cors')
// blog category routes
const dashboard_routes = require('./Routes/Dashboard/Dashboard');

// Middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));


// dashboard routes
app.use('/', dashboard_routes)



app.listen(8000, () => {
    console.log('SERVER CREATED');
})