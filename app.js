var express = require('express');
var nodemailer = require('nodemailer');
var validator = require('email-validator');
var bodyParser = require('body-parser');
var directTransport = require('nodemailer-direct-transport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/template');

app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res) {
  var checkEmail = validator.validate(req.body.email);
  if (!checkEmail) {
    res.render('index', {
      error: true,
      message: req.body.messsage,
      email: req.body.email,
      name: req.body.name
    });
  } else {
    if (!req.body.message || !req.body.email || !req.body.message) {
      res.render('index', {
        error: true,
        message: req.body.messsage,
        email: req.body.email,
        name: req.body.name
      });
    }
    var options = {};
    var smtpMailer = nodemailer.createTransport(directTransport(options));
    smtpMailer.sendMail({
      from: req.body.email,
      to: 'dakotalraymond@gmail.com',
      subject: 'New message from' + req.body.name,
      html: req.body.message
    }, function (error, response) {
     if (error) {
       console.log("ERROR");
       res.render('index', {
         error: true,
         message: req.body.messsage,
         email: req.body.email,
         name: req.body.name
       });
     } else {
       res.render('index');
     }
    });
  }
})

app.listen(3000, function(){
  console.log("The server is running on localhost:3000")
})
