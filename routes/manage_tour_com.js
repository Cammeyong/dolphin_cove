var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/manage_tour_com', function(req, res, next) {
    
  
    conn.query('SELECT * FROM tour_companies', function(err,row)     {
        console.log(err);
            
    
        if(err){ 
            res.render('../views/manage_tour_com',
            {
                page_title: "Manage Tour Company",
                manTour: ''
            });   
        }
        else{ 
            res.render('../views/manage_tour_com',
            {
                page_title: "Manage Tour Company",
                manTour: row,
                my_session: req.session,
            });
        }
                            
    });
    
    
});



router.get('/manTour_com/edit/:id', function(req, res, next) {
    // if(req.session.loggedin == true ) {
    conn.query('SELECT * FROM tour_companies WHERE id='+ req.params.id, function(err,row)     {
    
        if(err){
            //req.flash('error', err); 
            res.render('../views/tour_com_update',
            {
                page_title: "Edit Tour Company",
                data: ''
            });   
        }
        else{ 
            res.render('../views/tour_com_update',
            {
                page_title: "Edit Tour Company",
                data: row,
                my_session: req.session
            });
        }
                            
        });
    // }else {
    //     res.redirect('/login')
    // }
           
    });

router.post('/tour_com/update/:id', function (req,res) {

    // if(req.session.loggedin == true ) {
    let sqlQuery = "UPDATE dolphin_cove.tour_companies SET tour_ref_num ='" + req.body.tour_ref_num + 
    "', reg_date ='" + req.body.reg_date + 
    "', company_nm ='" +  req.body.company_nm + 
    "', address ='" + req.body.address + 
    "', tel_num ='" + req.body.tel_num +
    "' WHERE id = " + req.body.id;

   conn.query(sqlQuery,(err,rows) => 

   {
        if(err) throw err;
        console.log(err)
        //req.flash('error', err); 
        res.redirect('/manage_tour_com');                  
    });
    
// }else {
//     res.redirect('/login')
// } 
});

router.get('/manTour_com/delete/:id', function(req, res){
    // if(req.session.loggedin == true ) {
    conn.query('DELETE FROM dolphin_cove.tour_companies WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
        //req.flash('error', err); //must install additionals 'flash messages and others from to do list for these to work;

       //req.flash('success', 'Deleted Successfully') 
            // alert('Delete Successful');
            res.redirect('/manage_tour_com');
           
    });
//         }else {
//             res.redirect('/login')
//         } 
});


module.exports = router;