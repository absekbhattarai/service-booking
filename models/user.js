const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema=new Schema({
        name : {
        type: String,
        required: true
      },
        email: {
          type: String,
          required:true
      },
        phone: {
          type: Number,
          required: true
      },
        address: {
          type: String,
          required: true
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },

      role: {
        type: String,
        required: true,
        default: "customer"
      }
});
      

module.exports= mongoose.model('User',userSchema);

