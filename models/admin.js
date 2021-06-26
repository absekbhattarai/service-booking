const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema=new Schema({
      username: {
        type:String,
        default: 'absek'
      },
      password: {
        type:String,
        default: '12345'
      }
});
      

module.exports= mongoose.model('Admin',adminSchema);

