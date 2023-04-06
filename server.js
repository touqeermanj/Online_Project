

let tokenWali = require('jsonwebtoken');


// systemjs format
// import flana from flanPath;

// commonJS format
// let some = requre(flanPath)

let myExpress = require('express');

let multer = require('multer');

const meriFileSetting = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './server/my-uploads')
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname);
   }
 })
 
 const upload = multer({ storage: meriFileSetting })

// request-response system
// REST API

let meriApp = myExpress();

// POST, create data
// PUT, update data
// GET, receive data
// DELETE, delete data

meriApp.use(myExpress.json());
let users = [];


// route ki 2 types
// UI routes
// data routes

meriApp.post('/session-check', async (req, res)=>{


   tokenWali.verify(req.body.token, "apple sweet", function(err, dataObj){

   if(dataObj){

           let user = users.find(user=>user.id == dataObj.userKiId);

           res.json(user);
           console.log(true)
       }

   })


});

meriApp.post('/login', function(req, res){

   let userMilgya = users.find(user=>user.name == req.body.name && user.password ==  req.body.password);
  
   if(userMilgya){

       tokenWali.sign( {userKiId:userMilgya.id}, "apple sweet", {expiresIn:"2d"},function(err, myToken){

           res.json({
               userMilgya,
               myToken
           });
           

       });

   }
  

});

meriApp.put('/user-update', function(req, res){

   let userIndex = users.findIndex(user=>user.id == req.body.id);
   users[userIndex] = req.body;

   res.json({
       success:true
   })

})

meriApp.get('/user-lao', function(req, res){

  let userMilgya = users.find(user=> user.id == req.query.id);
  res.json(userMilgya);

});

meriApp.delete('/user-delete', function(req, res){

   users = users.filter(user=>user.id != req.query.anc);
   
   res.json({success:true})

   console.log(req.query.anc);

});

meriApp.post('/create-user', upload.array('pic',20), function(req, res){

   req.body.pic = req.files[0].originalname;

   users.push(req.body);
   console.log(req.body)
   res.end("data chal agya");

});

meriApp.get('/abc', function(req, res){

   res.json(users);

   // res.end("m5 is chaling")
})

meriApp.get('/abc', function(reqeust, response){
   response.json({
       name:"khurram",
       city:"FSD"
   });
   // response.sendfile('./server/data.jpg');
   // response.end("haha")
});

meriApp.use(myExpress.static('./server/build'))
meriApp.use(myExpress.static('./server/my-uploads'));

meriApp.listen(3002, function(){
   console.log("server chaling now");
})

// let data = require('./cooking');


// console.log("code is chaling");