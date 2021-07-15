const knex=require('./database/db');
const express=require('express')
const app=express();
app.use('/',require('./routes/login')) 
app.use('/',require('./routes/singup')) 
app.listen(8000,()=>{
    console.log('servar is running');
});
