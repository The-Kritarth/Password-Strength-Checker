const express = require("express");
const bodyParser = require("body-parser");
const {createPool} = require("mysql2");
// const path = require('path');
// const db = require("./util/db");

const app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.listen(3000,function(){
    console.log("Server started on port 3000");
});



const pool= createPool({
    host : "localhost",
    user : "root",
    password : "KRITARTHsoni@12345",
    database : "common_slangs",
    connectionLimit : 10
});


app.get("/",(req,res)=>{
    res.render("home",{sc:-1});

});

pool.query('select * from slang_table',(err,result,fields)=>{
    if(err)
        return console.log(err);
    // for(var i=0;i<result.length;i++)
    //     console.log(result[i].Slangs);

    // document.getElementById("strength").innerHTML="<h1>The first record is"+result[0].Slangs+"</h1>";
});

app.post("/home",(req,res)=>{
    var score=0;
    const pass = req.body.pass;
    if(pass.length < 8){
        return res.render("home",{sc:score});
    }
        
    const inp = pass.split(" ");
    var cut=100/inp.length,n=0,s=0,cap=0,sm=0;

    pool.query('select * from slang_table',(err,result,fields)=>{
        if(err)
            return console.log(err);
        
        for(var i=0;i<inp.length;i++){
            var f=0;
            for(var j=0;j<result.length;j++){
                // console.log(inp[i].lower);
                if(inp[i].toLowerCase()==result[j].Slangs){
                    f=1;
                    break;
                }
            }
            if(f==0){
                score+=cut;
                console.log(score);
                for(var j=0;j<inp[i].length;j++){
                    if(inp[i][j]>='0' && inp[i][j]<='9')
                        n=1;
                    if(inp[i][j]>=0 && inp[i][j]<=31)
                        s=1;
                    if(inp[i][j]>='a' && inp[i][j]<='z')
                        sm=1;
                    if(inp[i][j]>='A' && inp[i][j]<='Z')
                        cap=1;
    
                }
            }
                
        }
        
        console.log(n);
        console.log(s);
        console.log(cap);
        console.log(sm);
        
        if(score != 0 && n==0)
            score/=2;
        if(score !=0 && s==0)
            score/=2;
        if(score != 0 && cap==0)
            score/=2;
        if(score != 0 && sm==0)
            score/=2;
            
            
        return res.render("home",{sc:score});
        
        
    });
    
    
});