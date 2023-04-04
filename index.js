const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TreeSchema = require("./schema/schema")


dotenv.config();
const app = express();
const DATABASEURL = process.env.DATABASEURL

mongoose.connect(DATABASEURL,{autoIndex:true}).then(()=>{console.log("DATABASE connected")});

app.get("/",(req,res)=>{
    res.send("ok");
})

app.get("/getAll",async (req,res)=>{
    const all = await TreeSchema.find();
    console.log(all);
    res.send("working")
})

app.get("/BFS",async (req,res)=>{
    const all = await TreeSchema.find();
    var dict = {};
    const root = "1";
    var ans = [root];
    var queue = [root];

    for(var i in all){
        dict[all[i].Node_Index] = {
            Left:all[i].Left,
            Right:all[i].Right
        }
    }

    while(queue.length >=1 ){
        if(queue[0] in dict){
            const left = dict[queue[0]].Left;
            const right = dict[queue[0]].Right;
            queue.push(left);
            queue.push(right);
            ans.push(left);
            ans.push(right);
        }
        queue.shift();
    }

    console.log(ans);
    res.json(dict);
})

// app.get("/insert",async (req,res)=>{
//     await TreeSchema.create({Node_Index:"4",Left:"8",Right:"9"});
//     await TreeSchema.create({Node_Index:"5",Left:"10",Right:"11"});
//     await TreeSchema.create({Node_Index:"6",Left:"12",Right:"13"});
//     await TreeSchema.create({Node_Index:"7",Left:"14",Right:"15"});
//     res.send("working")
// })

app.listen(5000,()=>{
    console.log("server running on %s","http://localhost:5000");
})