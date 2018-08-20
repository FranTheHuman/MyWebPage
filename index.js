const express=require('express'),app=express(),path=require('path'),bodyParser=require('body-parser'),nodemailer=require('nodemailer');app.set('view engine','ejs'),app.set('views',path.join(__dirname,'views')),app.use(express.static(path.join(__dirname,'public'))),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.get('/',(a,b)=>{b.render('index_en',{msg:''})}),app.get('/es',(a,b)=>{b.render('index_es',{msg:''})}),app.post('/send/:idioma',(a,b)=>{let c=a.params.idioma;const d=`
                  <p>You have a new contact request</p>
                  <h3>Contact Details</h3>
                  <ul>  
                    <li>Email: ${a.body.Email}</li>
                    <li>Nombre: ${a.body.Nombre}</li>
                    <li>Telefono: ${a.body.Phone}</li>
                  </ul>
                  <h3>Message</h3>
                  <p>${a.body.Message}</p>
                `;let e=nodemailer.createTransport({service:'gmail',port:587,secure:!1,auth:{user:'thefluxporter@gmail.com',pass:'1234567891011121314151617181920'},tls:{rejectUnauthorized:!1}}),f={from:`"Nodemailer Contact" <thefluxporter@gmail.com>`,to:'perrottafrancisco0@gmail.com',subject:'Node Contact Request',text:a.body.Message,html:d};e.sendMail(f,(g,h)=>{return g?console.log(g):void(console.log('Message sent: %s',h.messageId),console.log('Preview URL: %s',nodemailer.getTestMessageUrl(h)))}),'es'==c?b.render('index_es',{msg:'Email enviado !!!'}):'en'==c&&b.render('index_en',{msg:'Email has been sent !!!!'})});const PORT=process.env.PORT||3e3;app.listen(PORT,()=>{console.log(`
        # Server on port ${PORT},
        # http://localhost:${PORT}/
        `)});