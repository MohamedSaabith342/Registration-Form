
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saabith@5322",
  database: "exhibition",
  port: 3306
  
})

app.get("/",(req,res)=>{
  const sql = "SELECT * FROM visitors"
  db.query(sql,(err, data)=>{
    if(err) return res.json("Error");
    return res.json(data);
  })
})

// app.post('/register',(req,res)=>{
//   const sql = "INSERT INTO visitors (`name`,`mobile-number`) VALUES (?)";
//   const values = [
//     req.body.name,
//     req.body.mobileNumber
//   ]
//   db.query(sql,[values],(err, res)=>{
//     if(err) return res.json("Error")
//     return res.json(data);
//   })

// })
app.post("/register", (req, res) => {
  const sql = "INSERT INTO visitors (`name`, `mobile_number`) VALUES (?, ?)";
  const values = [req.body.name, req.body.mobileNumber];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Insert failed" });
    }
    return res.json({ message: "Visitor registered successfully!", id: result.insertId });
  });
});




app.listen(8081, ()=>{
  console.log("Server listening at port 8081")
})