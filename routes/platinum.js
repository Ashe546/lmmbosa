const express = require('express')
const router = express.Router()
const Platinum = require('../module/platinum')
var dir = './uploads'
var upload = require('../multer/upload')
const multer = require('multer')
const path = require('path')
var fs = require('fs')
const user = require('../module/users')

function isLoggedIN(req, res , next){
    if(req.isAuthenticated( )){
        return next()
    }
    res.redirect("/login")
}




router.get('/platinum/new'  , function(req, res){
    Platinum.find({}, function(err, platinum){
        if(err){
            console.log("error")
        }else{
            res.render("platinum/new", {platinum: platinum})
        }
    })
})



router.post("/", upload.any(), function(req, res){
  
  user.find()

  
  console.log("req.body"); //form fields
  console.log(req.body);
  console.log("req.file");
  console.log(req.files); //form files
  console.log(req.user)
  
   

    if(!req.body && !req.files){
        res.json({success: false});
      } else {    
        Platinum.findOne({},function(err, platinum){
          console.log("into detail");
    
          if (platinum) {
            console.log("if");
            c = platinum.unique_id + 1;
          }else{
            c=1;
          }


           

          var platinum = new Platinum({
            unique_id:c,
            users: req.user,
            rent: req.body.rent,
            catagory: req.body.catagory,
            title: req.body.title,
            price: req.body.price,
            size: req.body.size,
            location: req.body.location,
            bedroom: req.body.bedroom,
            bathroom: req.body.bathroom,
            phonenumber: req.body.phonenumber,
            image:  req.files[0] && req.files[0].filename ? req.files[0].filename : '',
            image2: req.files[1] && req.files[1].filename ? req.files[1].filename : '',
            image3: req.files[2] && req.files[2].filename ? req.files[2].filename : '',
            image4:  req.files[3] && req.files[3].filename ? req.files[3].filename : '',
            image5: req.files[4] && req.files[4].filename ? req.files[4].filename : '',
            image6: req.files[5] && req.files[5].filename ? req.files[5].filename : '',
            image7:  req.files[6] && req.files[6].filename ? req.files[6].filename : '',
            image8: req.files[7] && req.files[7].filename ? req.files[7].filename : '',
            image9: req.files[8] && req.files[8].filename ? req.files[8].filename : '',  
            carparking: req.body.carparking,
            watertank: req.body.watertank,
            fireplace: req.body.fireplace,
            fence: req.body.fence,
            wifi: req.body.wifi,
            garden: req.body.garden,
            discription: req.body.discription,

        
        });

          
platinum.save( function(err, newPlatinum){
    if(err){
        res.render("platinum/new")
    }else{
        res.redirect("/home")
    }
})

    
}).sort({_id: -1}).limit(1);
      }
    })




    router.get("/platinum/:id", function(req, res){
        Platinum.findById(req.params.id, function(err, foundPlatinum){
            if(err){
                res.redirect('/home')
            }else{
                res.render("platinum/show", {platinum: foundPlatinum})
            }
        })
    })

module.exports = router
