const express = require('express')
const router = express.Router()
const Platinum = require('../module/platinum')
const Contact = require('../module/contact')

router.get('/:page' , async function(req, res){
    let perPage = 5;
    let page = req.params.page  || 1; 
    
    let query = Platinum.find().skip((perPage * page) - perPage).limit(perPage)
    
    let count = await Platinum.countDocuments()
    console.log(count)

   query.exec({}, function(err,  platinum){
        if(err){
            console.log("error")
        }else{
            res.render("admin/adminprop.ejs", 
            {platinum: platinum,
            current: page,
            count: count,
            pages: Math.ceil(count / perPage)
            })
}
    })
})


router.get('/contact/contact/:page' , async function(req, res){
    let perPage = 5;
    let page = req.params.page  || 1; 
    
    let query = Contact.find().skip((perPage * page) - perPage).limit(perPage)
    
    let count = await Contact.countDocuments()
    console.log(count)

   query.exec({}, function(err,  contact){
        if(err){
            console.log("error")
        }else{
            res.render("admin/adminContact.ejs", 
            {contact: contact,
            current: page,
            count: count,
            pages: Math.ceil(count / perPage)
            })
}
    })
})




module.exports = router