const express = require('express');
const router = express.Router();

const Projects = require('../models/projects');



router.get('/json/get/projects', function(req, res) {

        Projects.find().sort().exec(function (err, results) {

            if (!err) {
                res.send(results)

            }
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

module.exports = router;
