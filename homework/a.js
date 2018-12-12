const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/myxy";

app.use(express.static("./"));
app.use(express.static("./js"));

const postparse =bodyParser.urlencoded({extended:false});

app.listen(80,function () {
    console.log("ok,80")
});
//用post方式传来接收的数据
app.post("/addPost",postparse,function (req,res) {

    MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) => {
        let dbase = db.db("myxy");
        let obj = req.body;
        dbase.collection("data").insertOne(obj, (err, data) => {
            res.send(data)
        })
    })
})
app.post("/loadPost",postparse,function (req,res) {
    MongoClient.connect(url,{ useNewUrlParser: true },(err,db) =>{
        var dbase = db.db("myxy");
        dbase.collection("data").find().toArray((err,data)=>{
            res.send(data);
        })
    })
})
app.post("/delPost",postparse,function (req,res) {
    MongoClient.connect(url,{ useNewUrlParser: true },(err,db) =>{
        var dbase = db.db("myxy");
        dbase.collection("data").deleteOne({
            _id: ObjectId(req.body._id)
        }, (err,data)=>{
            res.send(data);
        })
    })
})