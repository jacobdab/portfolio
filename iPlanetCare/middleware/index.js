User = require('../schema/Users');

const middlewareObject = {};



middlewareObject.checkIsLogged = function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','Zaloguj się najpierw');
    res.redirect('/login');
}

middlewareObject.checkPermission = function checkOwnerShip(req,res,next){
    if(req.isAuthenticated()){
        User.findById(req.user,(err,user)=>{
            if(err || !user) {
                console.log(req.params.id);
                req.flash('error', 'Nie masz uprawnień');
                res.redirect('/login');
            }else if(req.user.isAdmin){
                next();
            }else{
                req.flash('error', "You aren't creator of that page!");
                res.redirect('/login');
            }
        })
    }else{

        req.flash('error','Please Login First!');
        res.redirect('/login');
    }
};

module.exports = middlewareObject;