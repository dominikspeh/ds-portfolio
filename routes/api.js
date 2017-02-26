const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Projects = require('../models/projects');



router.get('/json/get/projects', function(req, res) {

        Projects.find().sort().exec().then(function (results, err) {

            if(!err){}
                res.send(results)


        });

});
router.get('/json/get/project/detail', function(req, res) {

   var alias = req.query.alias;


    Projects.findOne({alias: alias}).exec(function (err, result) {
        if (!err) {
            res.json(result);
        }
    });

});

router.post('/post/contact', function (req,res) {

    console.log(req.body);

    let transporter = nodemailer.createTransport({
        host: process.env.mailHost,
        port: process.env.mailPort,
        secure: true,
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPW
        },
        tls: {
            rejectUnauthorized: false
        }

    });

    let mailOptions = {
        from: req.body.mail ,
        to: 'mail@domi-speh.de', // list of receivers
        subject: 'Contact request ✔', // Subject line
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            return console.log(error);
        }
        res.send('Message %s sent: %s', info.messageId, info.response)
    });

});

module.exports = router;
