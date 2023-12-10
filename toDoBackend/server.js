const express = require("express")
const mysql = require("mysql")
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
const db= mysql.createConnection(
    {
        host: 'db4free.net',
        user: 'kidus_bi20',
        password:"Kid12@1993",
        database: "database_user" 
    }
   
)
app.post("/Task",(req,res)=>{
    const sql="INSERT INTO myTask (Title,Description) VALUES(?,?)";
    const values =[
        req.body.Title,
        req.body.Description,
    ]
    console.log(values);
    db.query(sql,values,(err,data)=>{
        
        if(err){
            console.log(err)
            return res.json("Error")
        }else{
            console.log(data)
            return res.json(data)
        }
           
    })
})
app.put("/:id",(req,res)=>{
    const tid=req.params.id
    const sql=`UPDATE myTask SET title=?,description=? WHERE ID = ${tid}`;
    // console.log(req.body) 
   
    const values =[
        req.body.Title,
        req.body.Description,
    ]

    db.query(sql,values,(err,data)=>{
        // console.log(data)
        if(err){
            // console.log(err)
            return res.json("Error")
        }else{
            // console.log(data)
            return res.json(data)
        }
           
    })
})

app.put("/item/:id",(req,res)=>{
    const tid=req.params.id
    const ischecked= req.body.ischecked;
    console.log(req.body.tstatus) 
    const sql=`UPDATE myTask SET isCompleted=? WHERE id = ${tid}`;
    
    db.query(sql,ischecked,(err,data)=>{
        // console.log(data)
        if(err){
            // console.log(err)
            return res.json("Error")
        }else{
            // console.log(data)
            return res.json(data)
        }
           
    })
})
app.delete("/:id",(req,res)=>{
    const tid=req.params.id
    const sql=`DELETE  from myTask WHERE id = ${tid}`;
    // console.log(req.body) 
    db.query(sql,(err,data)=>{
        // console.log(data)
        if(err){
            // console.log(err)
            return res.json("Error")
        }else{
            // console.log(data)
            return res.json(data)
        }
           
    })
})

app.get("/", (req, res) => {
    const sql = `SELECT * FROM myTask WHERE isCompleted = false`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        } else if (data.length > 0) {
            return res.json({
                tasks: data
            });
        } else {
            return res.json("Failed");
        }
    });
});
app.get("/complated", (req, res) => {
    const sql = `SELECT * FROM myTask WHERE isCompleted = true `;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        } else if (data.length > 0) {
            return res.json({
                tasks: data 
            });
        } else {
            return res.json("Failed");
        }
    });
});
app.listen(5000,()=>{
    console.log("listening")
})