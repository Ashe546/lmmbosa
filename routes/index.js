const express = require('express')
const router = express.Router()
const Platinum = require('../module/platinum')
var passport = require("passport");
const User = require("../module/users")
const Contact = require("../module/contact")

//root route
router.get('/' , function(req, res){
    res.redirect('/home')
})

router.get('/home' , function(req, res){
    console.log(req.user)
let query =   Contact.find() && Platinum.find().sort({unique_id:-1})

    query.exec({}, function(err, platinum , contact){
        if(err){
            console.log("error")
        }else{
            res.render("index", {platinum: platinum , contact: contact})
        }
    })
})
router.post("/home/property", function(req, res){
 console.log ("fuck u")
    console.log("req.body"); //form fields
    console.log(req.body);


    var contact = new Contact({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        subject:req.body.subject,
        garage:req.body.garage || "",
        description:req.body.description

      });

      contact.save( function(err, newContact){
        if(err){
            res.render("platinum/new")
        }else{
            res.redirect("/home")
        }


})
})



module.exports = router