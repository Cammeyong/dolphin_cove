var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/manage_booking', function(req, res, next) {
    
    if (req.session.tour_ref_num == 1) {
        conn.query('SELECT * FROM bookings', function(err,row)  {
            // console.log(req.session); 
            if(err){ 
                // res.render('../views/manage_booking');   
                console.log(req.session); 
            }
            else{ 
                res.render('../views/manage_booking',
                {
                    page_title: "Manage Booking",
                    manBooking: row,
                    my_session: req.session,
                });
            }                    
        });
    }else if (req.session.tour_ref_num !== 1) { 
        conn.query('SELECT * FROM bookings WHERE tour_ref_num =' + req.session.tour_ref_num, function(err,row)  {
            if(err){ 
            // console.log(req.session); 
            // res.render('../views/manage_booking');   
            }
            else{ 
                res.render('../views/manage_booking',
                {
                    page_title: "Manage Booking",
                    manBooking: row,
                    my_session: req.session,
                });
            }
                                
        });
    }
});

router.get('/man_booking/edit/:id', function(req, res, next) {
    if(req.session.loggedin == true ) {
        conn.query('SELECT * FROM bookings WHERE id='+ req.params.id, function(err,row)     {
    
        if(err){
            //req.flash('error', err); 
            res.render('../views/booking_update',
            {
                page_title: "Edit Booking",
                data: ''
            });   
        }
        else{ 
            res.render('../views/booking_update',
            {
                page_title: "Edit Booking",
                data: row,
                my_session: req.session
            });
        }
                            
        });
    }else {
        res.redirect('/login')
    }
           
    });

router.post('/bookingInfo/update/:id', function (req,res) {

    if(req.session.loggedin == true ) {
    let sqlQuery = "UPDATE dolphin_cove.bookings SET tour_ref_num ='" + req.body.tour_ref_num + 
    "', guest_nm ='" + req.body.guest_nm + 
    "', package_id ='" +  req.body.package_id + 
    "', adult_num ='" + req.body.adult_num + 
    "', child_num ='" + req.body.child_num +
    "', sche_date ='" + req.body.sche_date +
    "', total_cost ='" + req.body.total_cost +
    "', hotel_staying ='" + req.body.hotel_staying +
    "', date_of_booking ='" + req.body.date_of_booking+
    "', ticket_num ='" + req.body.ticket_num +
    "' WHERE id = " + req.body.id;

   conn.query(sqlQuery,(err,rows) => 

   {
        if(err) throw err;
        console.log(err)
        //req.flash('error', err); 
        res.redirect('/manage_booking');                  
    });
    
}else {
    res.redirect('/login')
} 
});

router.get('/man_booking/delete/:id', function(req, res){
    if(req.session.loggedin == true ) {
        conn.query('DELETE FROM dolphin_cove.bookings WHERE id =' + req.params.id, function(err, row){
            if(err)  throw err;

                // alert('Delete Successful');
                res.redirect('/manage_booking');
            
        });
    }else {
        res.redirect('/login')
    } 
});


module.exports = router;