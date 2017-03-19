const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ig = require('instagram-node').instagram();
const GitHubApi = require("github");
var github = new GitHubApi();

github.authenticate({
    type: "oauth",
    key: process.env.gitHubKey,
    secret: process.env.gitHubSecret,
})

const Projects = require('../models/Projects');


router.get('/json/instagram', function(req, res) {

    ig.use({ access_token: process.env.instagramSecret });

    ig.user_media_recent(process.env.instagramUserId, {count: 6}, function(err, medias) {
        if(!err) {
            res.json(medias)
        }
        else {
            res.json('')
        }

    })
});

router.get('/json/github', function(req, res) {

    github.activity.getEventsForUser({
        username: "dominikspeh",
        per_page: 2,
    }, function (err, result) {
        res.json(result.data)
    });


});
router.get('/json/get/projects', function(req, res) {

        Projects.find().sort({number : -1}).exec().then(function (results, err) {

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


router.post('/post/madden', function (req,res) {

    res.json(req.body);


});
module.exports = router;
