const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');
const isAuth= require('../middleware/is-auth');
const isAdmin= require('../middleware/is-admin');

const router = express.Router();

//shows bookings
router.get('/booking-list',isAuth, isAdmin,adminController.getBooking);

//shows booking details
router.get('/booking-list/:bookingId', isAuth, isAdmin,adminController.getbookingDetails);

//shows the services that were rejected
router.get('/rejected',isAuth, isAdmin,adminController.getRejected);

//shows the services that were approved
router.get('/approved',isAuth, isAdmin,adminController.getApproved);

//shows the services that were approved
router.get('/pending',isAuth, isAdmin,adminController.getPending);

//gets the action page 
router.get('/booking-list/action/:bookingId',isAuth, isAdmin,adminController.getAction);

//AFTER clicking approve 
router.post('/booking-list/action/approve',isAuth, isAdmin,adminController.postActionApprove);
//AFTER clicking reject
router.post('/booking-list/action/reject',isAuth, isAdmin, adminController.postActionReject);

//Delete the rejected services from rejected page
router.post('/rejected/delete',isAuth, isAdmin,adminController.postRejected);

//Delete the finished services from approved page
router.post('/approved/done',isAuth, isAdmin,adminController.postApproved);

module.exports = router;