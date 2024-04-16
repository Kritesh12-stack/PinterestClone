const express = require('express')
const expressSession = require('express-session');
const passport = require('passport');
const users = require('./users.js')
const app = express()
const localStrategy = require('passport-local')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : "Kritesh"
}));
passport.use(new localStrategy(users.authenticate()))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser())
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/register',(req,res)=>{
    res.render("register")
})
app.post('/register',(req,res)=>{
    console.log(req.body)
    const data = new users({
        username : req.body.username,
        email : req.body.email,
        contact : req.body.contact
    })

    users.register(data,req.body.password)
    .then(function(){
        passport.authenticate("local")(req,res,function(){
            res.redirect("/profile")
        })
    })
})
app.post('/login', passport.authenticate("local", {
    failureRedirect : "/",
    successRedirect : "/profile",
}) ,(req,res)=>{
})
app.post('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect('/')
    })
})
app.get('/profile', isLoggedIn ,(req,res)=>{
    res.render("profile")
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

app.listen(3000)