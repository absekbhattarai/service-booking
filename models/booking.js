const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema=new Schema({
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
        model: {
          type: String,
          required: true
      },
        serviceType: {
          type: String,
          required:true
      },
        problems: {
        type: String,
        required:true
      },
      date: {
        type: String,
        required: true
      },
      status:{
        type : String,
        default:'Pending'
      },
      message:{
        type:String,
        default: 'No message'
    },
      time: {
        type: String,
        default: 'No time yet'
    }
      
});

module.exports= mongoose.model('Booking',bookingSchema);