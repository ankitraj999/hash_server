const express=require('express')
const customerRouter=require('./customer.router')
const app=express()
const dotenv = require("dotenv");
const mongoose=require('mongoose')
dotenv.config();
const cors = require("cors");
// node doesnot allow to pass json in post request by default we have to add middle ware .
// Below is the middle ware we define
app.use(cors());
app.use(express.json());

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;
const databasename=process.env.MONGODB_DATABASE;
const clustercode=process.env.MONGODB_CODE;
let url=`mongodb+srv://${username}:${password}@${cluster}.${clustercode}.mongodb.net/${databasename}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(url)
.then(()=>{ console.log("connected to the database")
app.listen(8000,()=>{
    console.log("server is running on port 8000")
});
})
.catch(()=>{console.log("connection fail")})

//get request 
app.get('/',(req,res)=>{
     res.send("working success")
})

app.use('/api/customers',customerRouter)