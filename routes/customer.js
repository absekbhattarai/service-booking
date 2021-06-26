const path = require('path');
const express = require('express');

const customerController = require('../controllers/customer');
const isAuth= require('../middleware/is-auth');
const isCustomer= require('../middleware/is-customer');
const router= express.Router();

//Shows the homepage
router.get('/landing-page', customerController.getLandingPage)



// router.get('/', isAuth ,customerController.getIndex);
router.get('/',(req,res,next)=>{

    if(!req.session.isLoggedIn)
        next();
    if(req.session.user.role == 'admin')
        res.redirect('/admin/approved');
    else if(req.session.user.role == 'customer')
        res.redirect('/my-status');

} ,customerController.getIndex);

//Shows the form
router.get('/booking',isAuth,isCustomer,customerController.getAddBooking);

//Post the form
router.post('/booking',isAuth,isCustomer,customerController.postAddBooking);

//Shows My Status
router.get('/my-status',isAuth,isCustomer,customerController.getMyStatus);

//Delete the My status items
router.post('/my-status/deletemystatus',isAuth,isCustomer,customerController.postMystatusDelete);

//Shows the Edit page
router.get('/edit-booking/:bookingId',isAuth,isCustomer,customerController.getEdit);

//Post the edited version
router.post('/edit-booking',isAuth,isCustomer,customerController.postEditing);

module.exports = router;