const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyparser.json());

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud",
}); 

conn.connect((err)=>{
    if(err) throw err
    console.log("mysql connected");
});

app.post("/api/create",(req,res)=>{
    let data = {name : req.body.name, age : req.body.age};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql,data,(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({status:200 , error : null, response :"New record added"}));
    });
});

app.get("/api/view",(req,res)=>{
    let sql ="SELECT * FROM users";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status:200, error : null, response:result }));
    });
});

app.get("/api/view/:id",(req,res)=>{
    let sql = "SELECT * FROM users WHERE id="+req.params.id;
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status:200,error:null,response:result}));
    });
});

app.put("/api/update",(req,res)=>{
    let sql = "UPDATE users SET name='"+req.body.name+"', age='"+req.body.age+"' WHERE id="+req.body.id;
    let query = conn.query(sql,(err)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response:"updated"}));
    });
});

app.delete("/api/delete/:id",(req,res)=>{
    let sql = "DELETE FROM users WHERE id="+req.params.id+"";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error: null, response:"deleted"}));
    });
});

app.listen(3002,()=>{
    console.log("server run port 3000");
});