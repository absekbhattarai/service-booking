const Booking = require('../models/booking');


exports.getBooking = (req,res,next)=>{
    Booking
    .find()
    .populate('userId')
    .then(
      bookings=>{

        let pendings = bookings.filter(booking=> booking.status == 'Pending');
        let rejected = bookings.filter(booking=> booking.status == 'Rejected');
        let approved = bookings.filter(booking=> booking.status == 'Approved');
        bookings = [...pendings, ...approved, ...rejected];
        res.render('booking-list', {
          book:bookings,
          pageTitle: 'Booking lists',
          path: '/admin/booking-list',
          isCustomer: false
        });
      })
      .catch(err => console.log(err));
  };

  exports.getRejected =(req,res,next)=>{
    Booking.find()
    .populate('userId')
    .then(rejected=>{
      res.render('rejected',{
        pageTitle: 'Rejected',
        reject: rejected,
        path:'/admin/rejected',
        isCustomer: false,
        approved: false
      });
    })
    .catch(err=>{
      console.log(err);
    });
  };

  exports.getPending =(req,res,next)=>{
    
    var query = { status: "Pending" } ;
    let count = 0;
    Booking.count({status: "Pending"}, function( err, c){
      count = c ;
  });
    console.log(count);

    Booking.find(query)
    .populate('userId')
    .then(pending=>{
      
      
      res.render('pending',{
        pageTitle: 'Pending',
        pending: pending,
        path:'/admin/pending',
        isCustomer: false,
        approved: false,
        
      });
    })
    .catch(err=>{
      console.log(err);
    });
  };

  exports.postRejected =(req,res,next)=>{
    const rejectedId = req.body.delete;
    Booking
    .findByIdAndDelete(rejectedId)
    .populate('userId')
    .then(()=>{
      console.log('Deleted');
      res.redirect('/admin/rejected');
    })
    .catch(err=>{
      console.log(err);
    })
  };

  exports.getApproved = (req,res,next)=>{
    var query = { status: "Approved" };
    Booking
    .find(query)
    .populate('userId')
    .then(
        bookings=>{
            res.render('approved', {
            book:bookings,
            pageTitle: 'Approved List',
            path: '/admin/approved',
            isCustomer: false
          }); 
      }
      )
      .catch(err => console.log(err));
  };

  exports.postApproved =(req,res,next)=>{
    const done = req.body.doneId;
    Booking.findByIdAndDelete(done)
    .populate('userId')
    .then(()=>{
      console.log('Done');
      res.redirect('/admin/approved');
    })
    .catch(err=>{
      console.log(err);
    })
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
          isCustomer: false
        });
      })
      .catch(err => console.log(err));
  };




exports.getAction = (req,res,next)=>{
  const bookingID = req.params.bookingId;
  console.log(bookingID);
    Booking.findById(bookingID).
    populate('userId').
    then(
      booking => {
        res.render('action', {
          booking: booking,
          pageTitle: 'Action',
          path: '/admin/booking-list/action',
          isCustomer: false
      });
    }).catch(err => {
        console.log(err);});
};

exports.postActionApprove = (req,res,next)=>{
  Booking.findById(req.body.approveId).then(booking=>{
    booking.status = "Approved";
    if(req.body.message){
    booking.message = req.body.message;
    booking.time = req.body.time;
    booking.save().then(()=>{
      res.redirect('/admin/approved');
    })
    .catch(err=>{console.log(err);});
  }else{
    booking.save().then(()=>{
      res.redirect(`/admin/booking-list/action/${req.body.approveId}`);
    }).catch(err=>{
      console.log(err);
    });
  }
    
}).catch(err=>{console.log(err)});

};

exports.postActionReject = (req,res,next)=>{
  
  Booking.findById(req.body.rejectId).then(booking=>{
        booking.status = "Rejected";
        if(req.body.message){
        booking.message = req.body.message;
        booking.save().then(()=>{
          res.redirect('/admin/booking-list');
        })
        .catch();
      }else{
        booking.save().then(()=>{
          res.redirect(`/admin/booking-list/action/${req.body.rejectId}`);
        }).catch(err=>{
          console.log(err);
        });
      }
        
  }).catch(err=>{console.log(err)});

};
