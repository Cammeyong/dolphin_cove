var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
// var bcrypt = require('bcrypt');

// function showElement() {
//     element = document.getElementById('container');
//     element.style.visibility = 'visible';
// }


router.get('/register_tour_com', function(req,res,next){

    if(req.session.loggedin == true) {
 
        conn.query ("SELECT * FROM tour_companies", function(err, rows) {
            if(err){
                console.log(err);
            } else {
                res.render('../views/register_tour_com', {
                    it: rows,
                    my_session:req.session
                    // myFunc: showElement()
                }); 

                next();
            }
        })
    }else{
        res.redirect('/login')
    }

});


router.post('/tour_com/add', async function(req,res,){
   
    if(req.session.loggedin == true) {
    
        // var password = req.body.password;
        // password = await bcrypt.hash(password, 10);

        let data = { tour_ref_num:   req.body.tour_ref_num,
            company_nm:     req.body.company_nm,
            address:      req.body.address,
            reg_date:       req.body.reg_date,
            tel_num:        req.body.tel_num,
            // email:        req.body.email,
            // password:     password,    
        };

        
        let sqlQuery = "INSERT INTO dolphin_cove.tour_companies SET ?";

        // let sqlQuery2 = "INSERT INTO dolphin_cove.auth_users (email, password)"
        // VALUES('?', '?');

    
        // let sqlQuery = "INSERT INTO dolphin_cove.tour_companies SET ?" 
        //     sqlQuery += "INSERT INTO dolphin_cove.auth_users ();
    
        conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
        // res.send(JSONResponse(results));
        });

        // let sqlQuery2 = "INSERT INTO dolphin_cove.auth_users SET ?";

        // conn.query(sqlQuery2, data,(err, results) => {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         res.redirect('/')
        //     }
        //     // res.send(JSONResponse(results));
        // });
    }else{
        res.redirect('/login')
    }
})

module.exports = router;