const express = require('express')
const router = express.Router()
const Platinum = require('../module/platinum')
var dir = './uploads/property'
var upload = require('../multer/upload')
const multer = require('multer')
const path = require('path')
var fs = require('fs')




router.get('/:page', async (req, res) => {
   
  let perPage = 3;
  let page = req.params.page  || 1; 


  let query = Platinum.find().skip((perPage * page) - perPage).limit(perPage)
  if (req.query.catagory != null && req.query.catagory != '') {
    query = query.regex('catagory', new RegExp(req.query.catagory, 'i'))
  }
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.bedroom != null && req.query.bedroom != '') {
    query = query.regex('bedroom', new RegExp(req.query.bedroom, 'i'))
  }
  if (req.query.bathroom != null && req.query.bathroom != '') {
    query = query.regex('bathroom', new RegExp(req.query.bathroom, 'i'))
  }
 
 
  
 let count = await Platinum.countDocuments()
  
 
 console.log(count)
 

 
  const platinum = await query.exec()
  try {
    res.render('property/index', {
      platinum: platinum,
      query: req.query,
      current: page,
      pages: Math.ceil(count / perPage)
    
    })
    console.log(req.query)
  } catch {
    res.redirect('/')
  }
})








    router.get("/:id", function(req, res){
       Platinum.findById(req.params.id, function(err, foundplatinum){
            if(err){
                res.redirect('/home')
            }else{
                res.render("property/show", {platinum: foundplatinum})
            }
            
        })
    })

module.exports = router