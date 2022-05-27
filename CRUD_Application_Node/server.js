const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const session = require('express-session');

const connectDB = require('./database/connection');

const app = express();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);


//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.use("/", require("./routes/router"));


dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});