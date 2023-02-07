const express = require("express");
const router = express.Router();
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const fs = require('fs');
var http = require('http');
var url = require('url');
const mysql = require('mysql2');
const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs',
    dateStrings: "date",
});

connection.connect(function(err){
    if (err) throw err;
    console.log("You are connected");
});

router.get("/board", function (req, res, next) {
    Urlnumber = req.query.number;
    const qry = "SELECT * FROM Board WHERE NUMBER=" + [Urlnumber];
    const params = "UPDATE Board SET view_point = view_point + 1 WHERE NUMBER=" + [Urlnumber];
    connection.query(params,function(err, rows) {
    });
    connection.query(qry,function(err, rows) {
        if(err) {
            console.error("query error" + err);
            res.status(500).send("Internal Server Error");
        } else {
            
            res.render("board.ejs", {rows});
        }
    });
});

router.get("/", function (req, res, next) {
    const qry = "select * from board"; 
   
    connection.query(qry, function(err, rows) {
        if(err) {
            console.error("query error" + err);
            res.status(500).send("Internal Server Error");
        } else {
         
            res.render('index', {rows:rows});
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.get("/register", (req, res) => {
    res.render("register.ejs");
});

router.get("/notice_board", (req, res) => {
    res.render("notice_board.ejs");
});

router.post("/send", function(req, res) {
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;
    const email = req.body.email; 
    const params = [name, id, password, email];
    bcrypt.hash(params[2], saltRounds, (error, hash)=>{
        params[2] = hash
    
        const sql = 'INSERT IGNORE INTO User(name, id, password, email) VALUES(?,?,?,?)';
   
        connection.query(sql, params, function(err, rows){
            if(err)console.log(err);
         
        });
        res.end();
    });
    //res.redirect('/');
    res.send("<script>alert('회원가입되셨습니다');location.href='/';</script>");

});

router.post("/login", function(req, res) {
  
   
   
    const param = [req.body.id, req.body.password];
    connection.query('select *from user where id=?',param[0],function(error, row) {
        if (error) throw error;
        console.log(row[0]);
        if (row.length > 0) {
            bcrypt.compare(param[1],row[0].password,(error, result)=>{
                if(result) {
                    console.log(row);
                    res.send("<script>alert('로그인 성공');location.href='/';</script>");
                } else {
                    res.send("<script>alert('로그인 실패');location.href='/login';</script>");
                }
                });
             } else {
                res.send("<script>alert('id가 존재하지 않습니다');location.href='/login';</script>");
            }
        });
     
});

router.post("/board", (req, res) => {
    const title = req.body.title;
    const writer = req.body.writer;
    const content = req.body.content;
    //const view_point = 0;
    //console.log(typeof(view_point));
    const sql = 'INSERT IGNORE INTO Board(title, writer, content) VALUES(?,?,?)';
    const params = [title, writer, content];
    connection.query(sql, params, function(err, rows, fields){
        if(err){
            console.log(err);
        } else{
            console.log(rows.name);
        }
    });
   
    console.log(req.body);
    res.send("<script>alert('글이 작성되었습니다.');location.href='/';</script>");
    
});

router.get("/graph", (req, res) => {
    res.render("graph.ejs");
});


module.exports = router;