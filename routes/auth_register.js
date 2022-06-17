var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt');

router.get('/auth_register', function(req,res,next){
 
    if (req.session.loggedin == true) {
        conn.query ("SELECT * FROM auth_users", function(err, rows) {
            if(err){
                console.log(err);
            } else {
                res.render('../views/auth_register', {
                    it: rows,
                    my_session:req.session,
                }); 
                next();
            }
        })
    }else{
        res.redirect('/login')
    }

});

router.post('/auth_register/add', async function(req,res,){
   
    if (req.seesion.loggedin == true) {
        try {
            var password = req.body.password;
            password = await bcrypt.hash(password, 10);

            let data = {tour_ref_num:   req.body.tour_ref_num,
                        type:           req.body.type,
                        authorised:     req.body.authorised,
                        email:          req.body.email,
                        password:       password,    
            };
        
            let sqlQuery = "INSERT INTO dolphin_cove.auth_users SET ?";
        
            conn.query(sqlQuery, data,(err, results) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/login')
            }
            // res.send(JSONResponse(results));
            });

        }catch(err) {
            console.log(err)
            res.status(500).send('Something went wrong')
        }
    }else{
        res.redirect('/login')
    }
   
})

module.exports = router;