const Booking = require('../models/booking');



exports.getIndex = (req,res,next)=>{
  res.render('index',{
    pageTitle:'Homepage',
    path: '/index',
    onlineStatus: req.session.isLoggedIn
  });
};


exports.getLandingPage = (rq,res,next)=>{
  res.render('landing',{
    pageTitle: 'Landing Page',
    path: '/landing-page',
  });
}

exports.getMyStatus = (req,res,next)=>{
  Booking
  
  .find()
  .populate('userId')
  .then(
    bookings=>{
      res.render('my-status', {
        book:bookings,
        pageTitle: 'My Status',
        path: '/my-status',
        isCustomer: true
      });
    })
    .catch(err => console.log(err));
};


exports.getAddBooking=(req,res,next)=>{
    res.render('booking',{
        pageTitle: 'Book A Service',
        path: '/booking',
        isCustomer: true,
        editing: false
    }
    )};

exports.postAddBooking=(req,res,next)=>{
    const name= req.body.name;
    const email= req.body.email;
    const phone= req.body.phone;
    const address= req.body.address;
    const model= req.body.model;
    const serviceType= req.body.serviceType;
    const problems= req.body.problems;
    const date = req.body.date;
    const booking = new Booking({
        name: name,
        email: email,
        phone: phone,
        address: address,
        model:model,
        serviceType:serviceType,
        problems:problems,
        date: date,
          userId: req.session.user._id
      });
      booking
      .save()
    .then(result => {
      console.log('Booked');
      res.redirect('/my-status');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEdit=(req,res,next)=>{
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/index');
  }
  const bookId = req.params.bookingId;
  Booking.findById(bookId)
    .then(booking => {
      if (!booking) {
        return res.redirect('/my-status');
      }
      res.render('booking', {
        pageTitle: 'Edit Booking',
        path: '/edit-booking',
        editing: editMode,
        booking: booking,
        isCustomer: true
      });
    })
    .catch(err => console.log(err));
};

exports.postEditing=(req,res,next)=>{
  const bookId = req.body.bookingId;
  
  const Umodel= req.body.model;
  const UserviceType= req.body.serviceType;
  const Uproblems= req.body.problems;
  const Udate = req.body.date;

  Booking.findById(bookId)

    .then(booking => {
     
      booking.model = Umodel;
      booking.serviceType=UserviceType;
      booking.problems=Uproblems;
      booking.date =Udate;
      return booking.save();
    })
    .then(result => {
      console.log('UPDATED BOOKING!');
      res.redirect('/my-status');
    })
    .catch(err => console.log(err));
};




exports.getbookingDetails = (req,res,next)=>{
  const bookId = req.params.bookingId;
  Booking.findById(bookId)
  .populate('userId')
    .then(bookings => {
      res.render('booking-details', {
        booking: bookings,
        pageTitle: 'Details',
        path: '/admin/booking-list',
        isCustomer: true
      });
    })
    .catch(err => console.log(err));
};

exports.postMystatusDelete = (req,res,next)=>{
  const deleteId = req.body.myStatusId;
  Booking
  .findByIdAndDelete(deleteId)
  .populate('userId')
  .then(()=>{
    res.redirect('/my-status');
  })
  .catch();
};




