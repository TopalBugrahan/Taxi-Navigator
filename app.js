const express = require("express");
var flash = require("connect-flash");
let mongoose = require("mongoose");
const session=require("express-session")
const MongoStore = require('connect-mongo');
const PageRouter = require("./router/PageRouter");
const DashBoard = require("./router/DashboardRouter");
const Produser = require("./zeromq/produser");
const Consumer = require("./zeromq/consumer");

mongoose.connect("mongodb://localhost/yaz2proje", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

//Taplete Engine

app.set("view engine", "ejs");

//Midlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/yaz2proje' })
  })
);

global.userIN=null

global.login_number = 0;
global.login_time = null;
global.time=30
global.time1=30
//Consumer();
//Produser();
app.use("*",(req,res,next)=>{
  
  userIN=req.session.userID
  
  next()
})


app.use("/", PageRouter);
app.use("/dashboard", DashBoard);

const port = 3000;
app.listen(port, () => {
  console.log("Port Açıldı");
});
