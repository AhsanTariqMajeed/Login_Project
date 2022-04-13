const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};


const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
    window.alert("Password must match");

  }
 
  if (password !== confirm) {
    console.log("Password must match");
    window.alert("Password must match");
  } else {

    //Validation
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("email exists");
        window.alert("email exists");

        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {

        //Validation
        const newUser = new User({
          name,
          email,
          location,
          password,
        });

        
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};
// For View
const loginView = (req, res) => {
  res.render("login", {});
};
//Logging in Function
const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    window.alert("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};
module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};