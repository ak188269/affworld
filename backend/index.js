const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const startDatabase = require('./database/database.js');


const { PORT } = process.env;


const app = express();
startDatabase(process.env.DB_URL);
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(cookieParser());
app.use(cors({withcredentials: true}));



app.use('/', require('./routes/router.js'));



// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})


app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);