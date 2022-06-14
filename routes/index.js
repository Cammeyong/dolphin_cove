var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.render('index', {
        page_title: 'Dolphin Cove',
        my_session: req.session
    });
});

module.exports = router;