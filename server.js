import express from 'express'; 
// import mongoose from 'mongoose'; 
import cors from "cors"; 
import { config } from "dotenv";
import bodyParser from "body-parser";
import { Mongoose } from './config/db.js';

import userRoute from './routes/userRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'; 
import apicache from 'apicache';
//import { ValidateToken } from './middleware/ValidateToken.js';


const app = express(); 

//increase the payload limit(e.g., 10mb)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json({}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    next(); 
}); 

// Initialize cache with default options
let cache = apicache.middleware;

// Apply cache to all routes
// You can specify the duration for which you want to cache the response
app.use(cache('5 minutes'));


app.get('/', cache('10 minutes'), (req, res) => {
    res.send('Welcome to Lemu Backend !!!'); 
});






// add errorhandler here 
app.use(errorHandler);

//routing 

app.use('/api/v1/user', /*cache('60 minutes')*/ userRoute);


config();


app.listen(process.env.PORT || 7000, (err) => {
    if(err){
        console.log(err); 
    }
    console.log(`server listening on port http://localhost:${process.env.PORT}`)
})