if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



const express = require("express")
const app = express()
const ejs = require("ejs")
const indexRoutes = require('./routes/index')
const platinumRoutes = require('./routes/platinum')
const propertyRoutes = require('./routes/property')
const adminRoutes = require('./routes/admin')

const bodyParser = require('body-parser')
const passport  = require('passport')
const LocalStrategy = require('passport-local')
const User = require("./module/users")
const escapeRegex = require('./regex-escape')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: false}))
app.set("view engine", "ejs")
app.set('views', __dirname + '/views')


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/jQuery', express.static(__dirname + '/node_modules/jQuery/tmp/'));
app.use('/style', express.static(__dirname + '/views/css'));
app.use('/vendor', express.static(__dirname + '/views/css/admincss'));
app.use('/img', express.static(__dirname + '/views/img'));
app.use('/javascript', express.static(__dirname + '/views/js'));
app.use('/vendorjs', express.static(__dirname + '/views/js/adminjs'));
app.use('/fonts', express.static(__dirname + '/views/fonts'));
app.use('/plugins', express.static(__dirname + '/views/plugins'));
app.use('/uploads', express.static(__dirname + '/uploads/'))




const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , 


     { 
        useUnifiedTopology: true,
        useNewUrlParser: true })
       const db = mongoose.connection
       db.on('error', error => Console.error(error))
        db.on('open', () => console.log('Connected to Mongoose'))


// passport configeration 
app.use(require("express-session")({
    secret: "it me mario",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
  
app.use(function(req, res, next){
    res.locals.currentUser = req.user
next()
})

function isLoggedIN(req, res , next){
    if(req.isAuthenticated( )){
        return next()
    }
    res.redirect("/login")
}


    
 app.use('/', indexRoutes)
 app.use('/home', platinumRoutes)  
 app.use('/home/property', propertyRoutes)
 app.use('/admin', adminRoutes)

 // Auth Routes 

 app.get("/register", function(req, res){
     res.render('register')
 })
 //handle sign up logic
 app.post("/register", function(req, res){
     var newUser = new User({username: req.body.username , phonenumber: req.body.phonenumber})
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err)
             return res.render("register")
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/home")
         })
     })
 })
 // show login form 
 app.get("/login", function(req, res){
     res.render("login");
 })
 //handeling login logic
 app.post("/login", passport.authenticate("local", 
 {successRedirect : "/home",
failureRedirect: "/login"
}), function(req, res){
    })
// log out logic
app.get("/logout", function(req, res){
    req.logout()
    res.redirect("/home")
})      


  
app.listen(process.env.PORT  || 3000, function(req, res){
    console.log("server started")
})