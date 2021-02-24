const express = require('express');
const mongoose = require('mongoose');
const Register = require('./models/register');
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');

//Creating express app
const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//connect to mongodb and listen to requests on port 3000
const dbURI = 'mongodb+srv://simransindhwani:University12@node-project.f3ila.mongodb.net/node-project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(app.listen(3000))
    .catch((err) => console.log(err));

//Register my Email and password
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sendingemails732@gmail.com',
      pass: 'Univer$ity12'
    }
  });

//api to register user 
app.post('/register-user', (req, res) => {
    const register = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    register.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})

//api to login user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        let user = Register.findOne({
            email: email
        })
            .then((result) => {
                if (result.password != password) {
                    res.send("Password Mismatch");
                    var mailOptions = {
                        from: 'sendingemails732@gmail.com',
                        to: result.email,
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy! Your default password is \'Univer$ity12\''
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });

                      Register.findOneAndUpdate(password, 'Univer$ity12');
                      
                }
                else
                    res.send("Password Matches");
            })
            .catch((err) => {
                console.log("User doesn't exist - For now");
            });
    }
    catch (e) {
        console.error(e);
    }
});

