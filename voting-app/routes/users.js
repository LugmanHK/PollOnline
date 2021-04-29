const express = require("express");
const Candidate = require("../models/candidate");
const router = express.Router();

const User = require("../models/User");
let currentName;
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register",(req, res) =>  
  res.render("register")
);

// Register
router.post("/register",(req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        newUser
              .save()
              .then((user) => {
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
      }
    });
  }
});

// Login
router.post("/login",(req, res) => {
  const {email, password, admin} = req.body;
  let errors = [];
  if(!password || !email){
    errors.push({msg: "Please enter all fields"});
  }
  if(errors.length > 0){
    res.render("login", {
      errors,
      email
    });
  }
  else{
    User.findOne({email : email}).then((user) => {
      if(!user){
        errors.push({msg:"Email or Password do not match"});
        res.render("login", {
          errors,
          email
        });
      }
      else{
        if(user.password == password){
          if(user.admin == true){
            currentName = user.name;
            res.redirect("/admindashboard");
          }
          else{
            if(user.voteStatus){
              currentName = user.name;
              console.log(user.admin);
              res.redirect("/voteddashboard");
            }
            else
            {
              currentName = user.name;
              console.log(user.admin);
              res.redirect("/dashboard");
            }
          }
        }
        else{
          errors.push({msg:"Email or Password do not match"});
          res.render("login", {
          errors,
          email
        });
        }
      }
    })
  }
});

router.get("/logout", (req, res) => {
  res.redirect("/users/login");
});

module.exports = router;
