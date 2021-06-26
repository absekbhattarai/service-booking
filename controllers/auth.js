const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req,res,next)=>{
    let message= req.flash('error');
    if(message.length>0){
    message = message[0];
    } else {
    message=null;
    }
    res.render('auth/login',{
      pageTitle:'Login',
      path: '/login',
      errorMessage: message
    });
  };

exports.getRegister = (req,res,next)=>{
let message= req.flash('error');
  if(message.length>0){
    message = message[0];
  } else {
    message=null;
  }
  res.render('auth/register', {
    path: '/register',
    pageTitle: 'Register',
    errorMessage:message
  });
  };

exports.postLogin=(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
    .then(user=>{
        if(!user){
            req.flash('error','Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(doMatch=>{
            if(doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err=>{
                res.redirect('/');
            });
        }else{
            req.flash('error','Invalid email or password');
            res.redirect('/login');
        }})
        
        .catch(err=>{
            req.flash('error','Invalid email or password');
            res.redirect('/login');
        })
    })
}

exports.postRegister = (req,res,next)=>{
    const name = req.body.registerName;
    const email = req.body.registerEmail;
    const phone = req.body.registerPhone;
    const address = req.body.registerAddress;
    const username = req.body.username;
    const password = req.body.registerPass;
    User.findOne({username: username})
    .then(userDoc=>{
        console.log(userDoc);
        if(userDoc){
            req.flash('error','Username exists already.');
            return res.redirect('/register');
        }
        return bcrypt
        .hash(password,12)
        .then(hashedPassword=>{
            const user = new User({
                name: name,
                email:email,
                phone: phone,
                address: address,
                username: username,
                password: hashedPassword
            });
            console.log(user);
            return user.save();
        }).then(result => {
            res.redirect('/login');           
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.postLogout = (req,res,next)=>{
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };


  exports.postAdminLogin=(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username})
    .then(user=>{
        if(!user){
            req.flash('error','Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(doMatch=>{
            if(doMatch){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err=>{
                res.redirect('/my-status');
            });
        }else{
            req.flash('error','Invalid email or password');
            res.redirect('/login');
        }})
        
        .catch(err=>{
            req.flash('error','Invalid email or password');
            res.redirect('/login');
        })
    })
}