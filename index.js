const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.get('/', ()=>{
    res.send('welcome to my forma');
})

app.post('/api/forma', (req,res)=>{

let data=req.body;

let smtpTransport = nodemailer.createTransport({
   service:'Gmail' ,
   port:465,
   auth:{
    user:'odkolas@gmail.com',
    pass:"galopoula@21@21"
   }
});


let mailOptions={
    from:data.email,
    to:'odkolas@gmail.com',
    subject:`Message from ${data.name}`,
    html:`
    
    <h3>Informations</h3>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Lastname: ${data.lastname}</li>
      <li>Email: ${data.email}</li>
    
    </ul> 
    <h3>Message</h3> 
    <p>${data.message}</p>  
    
    `

};

smtpTransport.sendMail(mailOptions, (error, response)=>{
  
    if(error){
        res.send(error)
    }
    else{
        res.send('Success')
    }

    smtpTransport.close();
})





})


const PORT = process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
    
})