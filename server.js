const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");

const {User} = require("./model/user.js");
const {Order} = require("./model/order.js");
const {Warehouse} = require("./model/warehouse.js");
const {Sugg} = require("./model/suggestion.js");
const {Driver} = require("./model/driver.js");


const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/JBToyBalloons", {
    useNewUrlParser : true
})

const urlencoder = bodyparser.urlencoded({
    extended: false
})

app.use(cookieparser())
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret : "secret name",
    resave : true,
    saveUninitialized : true,
    name : "cookie monster",
    cookie : {
        maxAge : 1000*60*60*24*365*2
    }
}))

app.get(["/","/home"], function(req,res){
    res.render("homepage.hbs")
})


app.get("/Services", function(req,res){
    res.render("services.hbs")
})

app.get("/aboutUs", function(req,res){
    res.render("about.hbs")
})

app.get("/contactUs", function(req,res){
    res.render("contact.hbs")
})

app.get("/login", function(req,res){
    res.render("login.hbs")
})

app.post("/login", urlencoder, function(req,res){
    let username = req.body.un
    let password = req.body.pw
    
    User.findOne({
        username, password
    }, 
    (err, doc)=>{
        if(err){
            res.send(err)
        }
        else if(!doc){
            res.send("User does not exist!")
        }
        else{
            req.session.username = doc.username
            if(doc.userType == 1){
                res.redirect("/admin") 
            }
            else if(doc.userType == 2){
                res.redirect("/office")
            }
            else if(doc.userType == 3){
                res.redirect("/warehouse")
            }
        }
    })
})

app.get("/admin", function(req,res){
    console.log("GET ADMIN")
    res.render("admin.hbs")
})

app.get("/office", function(req,res){
    console.log("GET office")
    res.render("office.hbs")
})

app.get("/warehouse", function(req,res){
    console.log("GET LOGINPAGE")
    res.render("warehouse.hbs")
})

app.get("/register", function(req,res){
    console.log("GET REGISTER")
    res.render("register.hbs")
})

app.post("/register", urlencoder, function(req,res){
    let firstname = req.body.fn
    let lastname = req.body.ln
    let username = req.body.un
    
    if(req.body.pw1 == req.body.pw2){
        let password = req.body.pw1
    }
    else{
        alert("Password does not match")
    }
    
    let user = new User({
        firstname, lastname,username,password
    })
    
    user.save().then((doc)=>{
        //not error
        console.log(doc)
        req.session.username = doc.username
        res.redirect("/")
    }, 
    (err)=>{
        //error
        res.send(err)
    })
})

app.get("/order", function(req,res){
    Order.findOne({
        _id
    }, 
    (err, doc)=>{
        if(err){
            res.send(err)
        }
        else if(!doc){
            res.send("Order does not exist")
        }
        else{
            res.render("order.hbs",{
                order:doc
            })
        }
    }) 
})


app.get("/admin", function(req,res){
   
})

app.post("/addDriver", urlencoder, function(req,res){

})

app.post("/updateDriver", urlencoder, function(req,res){
    
})

app.post("/deleteDriver", urlencoder, function(req,res){
    
})


app.listen(3001, function(){
    console.log("Live at port 3001");
})