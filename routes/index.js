var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

        res.render('index', {});

});
router.get('/:code', function(req, res) {
    var code = req.params.code;
    res.render('index', {});

});

router.get('/ds/about', function(req, res) {
    var code = req.params.code;
    res.render('index', {});
});
router.get('/ds/projects', function(req, res) {
    var code = req.params.code;
    res.render('index', {});
});
router.get('/ds/projects/:alias', function(req, res) {
    var code = req.params.code;
    res.render('index', {});
});
module.exports = router;
