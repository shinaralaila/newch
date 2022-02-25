const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.set("view engine", "ejs");
const path = require('path');
const nodemailer=require('nodemailer');
const {google} =require('googleapis');
 require('dotenv').config();





app.engine('ejs', require('ejs').__express);
//app.use(express.static( "public"));
app.use(express.static(__dirname));


app.use( bodyParser.json() );  
     // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())
app.use( express.json() );       // to support JSON-encoded bodies

app.use(express.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors());

//const path = require('path');

app.set('views',path.join(__dirname,'views'));

app.set("views", __dirname + "/views");

app.get('/',(req,res)=>{
    res.send("Welcome to Coding Competition #2 by Shinara Laila ,FSD MEAN KKEM OCT")
});

app.get('/home',(req,res)=>{
    res.render("index")
});
/* 
const CLIENT_ID="341698564898-ol2vs5emv745obgscg62q51gogvp6jcn.apps.googleusercontent.com"
const CLIENT_SECRET="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"
const REDIRECT_URI="https://developers.google.com/oauthplayground/"
const REFRESH_TOKEN= "1//04ActCObIyKaoCgYIARAAGAQSNwF-L9IrikZscJmKq_su4V6lVSs7NnVTvF9bNkX3OceozVxtqGFNwiCq5kWrNNbpWCcAiJBfyeY"


const oAuth2Client=new google.auth.OAuth2( CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
const accessToken= oAuth2Client.getAccessToken()
 */

app.post('/mailer', (req, res) =>{
    console.log(req.body.email) ;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user:process.env.EMAIL, // 'chikkushinu29@gmail.com',
          pass: process.env.PASSWORD //'hello1hello2'
      }
  });
    
  let mailDetails = {
      from: 'chikkushinu29@gmail.com',
      to:`${req.body.email}`,
      subject: 'Code challenge 2',
      text: 'Node.js testing mail '
  };
    
  transporter.sendMail(mailDetails, function(err, data) {
      if(err) {
          console.log('something went wrong',err);
          res.send (req.body.email+" "   +'something went wrong ')
      } else {
          console.log('Email sent successfully');
          res.send (req.body.email+ " "  +"Email sent successfully")

      }
  });
   
    })
    app.listen(process.env.PORT ||4000, ()=>{
      console.log('Server is runing on port 4000')
  }) ;
   
