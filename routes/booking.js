var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt');

router.get('/booking', function(req,res,next){
 
    conn.query ("SELECT * FROM bookings", function(err, rows) {
        if(err){
            console.log(err);
        } else {
            res.render('../views/booking', {
                it: rows
            }); 
             next();
        }
    })

});

router.post('/booking/add', function(req,res,){
   

    let data = {tour_ref_num:   req.body.tour_ref_num,
        package_nm:     req.body.package_nm,
        adult_num:      req.body.adult_num,
        child_num:      req.body.child_num,
        sche_date:      req.body.sche_date, 
        sche_time:      req.body.sche_time,
        total_cost:     req.body.total_cost,
        hotel_staying:  req.body.hotel_staying,
        date_of_booking: req.body.date_of_booking,
    };

    let sqlQuery = "INSERT INTO dolphin_cove.bookings SET ?";

    conn.query(sqlQuery, data,(err, results) => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/')
    }
    // res.send(JSONResponse(results));
    });

   
   
})

module.exports = router