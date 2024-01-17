const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const startDatabase = require('./database/database.js');
const globalErrorHandler = require('./controllers/globalErrorHandler.js');


const { PORT } = process.env;


const app = express();
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    // Perform cleanup or other necessary actions
    process.exit(1); // Exit the process with a non-zero code
  });
startDatabase(process.env.DB_URL);
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(cookieParser());
app.use(cors({origin : ["http://localhost:3000",'https://affworld.vercel.app'],credentials: true}));



app.use('/', require('./routes/router.js'));



// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'No such api found'} );
})

app.use(globalErrorHandler)
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);