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
    window.alert("Fill empty fields");

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
    window.alert("Please fill in all the fields");
    console.log("Please fill in all the fields");

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


const forgetpassword = (req, res) => {
	res.render("forget", {});
};

const forgetpassword__ = (req, res) => {
	const { email, password } = req.body.email
  {
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save((err, Person) => {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	};



module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  forgetpassword,
  forgetpassword__,

}};