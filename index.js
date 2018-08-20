const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');

/**************
 SETTINGS
 **************/
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Static folder
app.use(express.static(path.join(__dirname, 'public')));
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**************
 ROUTES
 **************/

app.get('/', (req, res) => {
  res.render('index_en', { msg: ""});
});
app.get('/es', (req, res) => {
  res.render('index_es', { msg: ""});
});
       app.post('/send/:idioma', (req, res) => {
                let idioma = req.params.idioma;

                const output = `
                  <p>You have a new contact request</p>
                  <h3>Contact Details</h3>
                  <ul>  
                    <li>Email: ${req.body.Email}</li>
                  </ul>
                  <h3>Message</h3>
                  <p>${req.body.Message}</p>
                `;
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'thefluxporter@gmail.com', // generated ethereal user
                            pass: '1234567891011121314151617181920'  // generated ethereal password
                        },
                        tls:{
                          rejectUnauthorized:false
                        }
                });
                // setup email data with unicode symbols
              let mailOptions = {
                  from: `"Nodemailer Contact" <thefluxporter@gmail.com>`, // sender address
                  to: 'perrottafrancisco0@gmail.com', // list of receivers
                  subject: 'Node Contact Request', // Subject line
                  text: req.body.Message, // plain text body
                  html: output // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);   
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              }); 
              if(idioma == "es") {
                 res.render('index_es', {msg:'Email enviado'})  
               } else if(idioma == "en"){
                 res.render('index_en', { msg: "Email has been sent"}); 
               }   
      })      
/*************
SERVIDOR
*************/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`
        # Server on port ${PORT},
        # http://localhost:${PORT}/
        `)
})