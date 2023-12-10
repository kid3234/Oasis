const express = require("express")
const mysql = require("mysql")
const cors = require('cors')
const jwt = require('jsonwebtoken');


const app = express()
app.use(cors())
app.use(express.json())
const db = mysql.createConnection(
    {
        host: 'db4free.net',
        user: 'kidus_bi20',
        password: "Kid12@1993",
        database: "database_user"
    }

)
app.post("/signup", (req, res) => {
    const sql = "INSERT INTO customer (username,password) VALUES(?,?)";
    const values = [
        req.body.username,
        req.body.password
    ]
    const csql = `SELECT * FROM customer WHERE username='${req.body.username}'`;
    db.query(csql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err)
        } else {
            console.log("this is the data",data.length);
            if(data.length > 0){
                return res.status(409).json("The username is taken tray another one")
            }else{
                db.query(sql, values, (err, data) => {

                    if (err) {
                        // console.log(err)
                        return res.status(501).json("Server Error")
                    } else {
                        console.log(res)
                        // return res.json(data)
                        return res.status(200).json(data)
                    }
    
                })
            }
            
        }
    })

})



app.post("/Login", (req, res) => {
    const sql = "SELECT * FROM customer WHERE username=? AND password=?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length > 0) {
            // User found, generate a token
            const token = jwt.sign({ userId: data[0].id }, 'your-secret-key', { expiresIn: '1h' });
console.log(data);
            return res.json({
                status: "Success",
                id: data[0].ID,
                token: token
            });
        } else {
            return res.status(404).json("User Not Found");
        }
    });
});

app.get("/:id", (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM customer WHERE ID='${id}'`;
    db.query(sql, (err, data) => {
        // console.log(data)
        if (err) {
            // console.log(err)
            return res.json("Error")
        } else if (data.length > 0) {
            // console.log(data)
            return res.json({
                user: data
            })
        } else {
            return res.status(404).json("User Not Found")
        }

    })
})
app.listen(8081, () => {
    console.log("listening")
})