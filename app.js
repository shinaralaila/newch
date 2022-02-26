const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.set("view engine", "ejs");
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

app.engine('ejs', require('ejs').__express);
//app.use(express.static( "public"));
app.use(express.static(__dirname));

app.use(bodyParser.json());
// to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())
app.use(express.json());       // to support JSON-encoded bodies

app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors());

//const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set("views", __dirname + "/views");

app.get('/', (req, res) => {
    res.send("Welcome to Coding Competition #2 by Shinara Laila, FSD MEAN KKEM OCT")
});

app.get('/home', (req, res) => {
    res.render("index")
});

// const REDIRECT_URI = "https://www.googleapis.com/oauth2/v4/token"
// const oAuth2Client = new google.auth.OAuth2(process.env.OAUTH_CLIENTID, process.env.OAUTH_CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN })
// const accessToken = oAuth2Client.getAccessToken()


app.post('/mailer', (req, res) => {
    console.log(req.body.email);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "login",
            user: process.env.USEREMAIL,
            pass: process.env.USERPWD
        }
        // auth: {
        //     type: "OAuth2",
        //     clientId: process.env.OAUTH_CLIENTID,
        //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
        //     // accessToken: accessToken
        // }

    });

    let mailDetails = {
        from: process.env.USEREMAIL,
        to: `${req.body.email}`,
        subject: 'Code Challenge 2',
        text: 'Nodemailer testing mail ',

    };

    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Something went wrong.', err);
            res.send('Something went wrong. '+req.body.email)
        } else {
            console.log('Email sent successfully.');
            res.send("Email sent successfully to "+req.body.email )

        }
    });

})
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port 4000.')
});

