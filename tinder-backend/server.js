import express from "express";
import mongoose from "mongoose";
import Cards from './dbCards.js'
import Cors from 'cors'
//App config
const app=express();
const port =process.env.PORT || 8001;
const connection_url= "";
app.use(express.json());
app.use(Cors());
//Db config
mongoose.connect(connection_url,{
    useNewUrlParser: true, 
   useUnifiedTopology: true 
});
//Api endpoints
app.get("/", (req , res) => res.status(200).send("Hello cyka blyat jebani"));
app.post('/tinder/cards',(req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err);//internal error
        }
        else{
            res.status(201).send(data); // creation success
        }
    });
});

app.get('/tinder/cards', (req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);//internal error
        }
        else{
            res.status(200).send(data); // find success
        }
    });
});

//Listeners
app.listen(port,()=>console.log("listening to port: ",port));