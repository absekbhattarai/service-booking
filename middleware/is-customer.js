module.exports = (req,res,next)=>{
    if(req.session.user.role == 'customer'){
        next();   
    }
    else{
        return res.status(404).render('404', {
            pageTitle: 'Page Not Found',
            path: '/404'
          });
    }
    
}