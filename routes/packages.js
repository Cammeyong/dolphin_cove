var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/packages', function(req, res, next) {
    
  
    conn.query('SELECT * FROM packages', function(err,row)     {
        console.log(err);
            
    
        if(err){ 
            res.render('../views/packages',
            {
                page_title: "Packages",
                package: ''
            });   
        }
        else{ 
            res.render('../views/packages',
            {
                page_title: "Packages",
                package: row,
                my_session: req.session,
            });
        }
                            
    });
    
    
});

module.exports = router;