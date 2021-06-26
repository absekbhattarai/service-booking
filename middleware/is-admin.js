module.exports = (req,res,next)=>{
    if(req.session.user.role == 'admin'){
        next();   
    }
    else{
        return res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            path: '/404'
          });
    }
    
}