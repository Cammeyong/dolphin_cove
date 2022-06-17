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
                it: rows,
                my_session: req.session,
            }); 
             next();
        }
    })

});

router.post('/booking/add', function(req,res,){
   
    var ticket_num = Date.now().toString().slice(-7);

    let data = {tour_ref_num:   req.body.tour_ref_num,
        guest_nm:       req.body.guest_nm,
        package_id:     req.body.package_id,
        adult_num:      req.body.adult_num,
        child_num:      req.body.child_num,
        sche_date:      req.body.sche_date, 
        total_cost:     req.body.total_cost,
        hotel_staying:  req.body.hotel_staying,
        date_of_booking: req.body.date_of_booking,
        pay_id:         req.body.pay_id,
        ticket_num:     ticket_num,
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
router.get('/manBooking/edit/:id', function(req, res, next) {
    if(req.session.loggedin == true ) {
    conn.query('SELECT * FROM booking WHERE id='+ req.params.id, function(err,row)     {
    
        if(err){
            //req.flash('error', err); 
            res.render('../views/manage_booking',
            {
                page_title: "Edit Reservations",
                manBooking: ''
            });   
        }
        else{ 
            res.render('../views/manage_booking',
            {
                page_title: "Edit Reservations",
                manBooking: row,
                my_session: req.session
            });
        }
                            
        });
    }else {
        res.redirect('/login')
    }
           
    });

router.post('/tour_com/update/:id', function (req,res) {

    if(req.session.loggedin == true ) {
        let sqlQuery = "UPDATE dolphin_cove.tour_companies SET tour_ref_num ='" + req.body.tour_ref_num + 
        "', reg_date ='" + req.body.reg_date + 
        "', company_nm ='" +  req.body.company_nm + 
        "', address ='" + req.body.address + 
        "', tel_num ='" + req.body.tel_num +
        "' WHERE id = " + req.body.id;

        conn.query(sqlQuery,(err,rows) =>    {
            if(err) throw err;
            console.log(err)
            //req.flash('error', err); 
            res.redirect('/manage_tour_com');                  
        });
        
    }else {
        res.redirect('/login')
    } 
});

router.get('/manTour_com/delete/:id', function(req, res){
    if(req.session.loggedin == true ) {
        conn.query('DELETE FROM dolphin_cove.tour_companies WHERE id =' + req.params.id, function(err, row){
            if(err)  throw err;;

            res.redirect('/manage_tour_com');
            
        });
    }else {
        res.redirect('/login')
    } 
});


module.exports = router