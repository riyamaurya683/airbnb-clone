const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
     res.render("users/signup.ejs");
};

module.exports.signup =  async(req, res, rext) => {
    try{
        console.log("Signup route hit");
        console.log(req.body);
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log("User saved:", registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to wanderlust!");
     return res.redirect("/listings");

    });
}catch (e) {
    console.log("ERROR:", e);
    req.flash("error", e.message);
    return res.redirect("/signup");
}
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
            req.flash("success", "Welcome to Wanderlust! ");
            let redirectUrl = res.locals.redirectUrl || "/listings";
            delete req.session.redirectUrl;
            console.log("LOGIN USER:", req.user);
           return  res.redirect("/listings");
        
};

module.exports.logout = (req, res, next) => {
        req.logout(function(err) {
            if(err) {
                return next(err);
        }
        req.flash("success", "you are logged out!");
       return  res.redirect("/login");
    });
};