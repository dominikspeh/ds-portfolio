var express = require('express');
var router = express.Router();



router.get('/:deviceType/:view', function(req, res) {
    
    var deviceType = req.params.deviceType;
    var view = req.params.view;
    res.render('partials/' + deviceType + '/' + view);

});

module.exports = router;
