const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Admin = require('../models/admin');
const Job = require('../models/job');
var jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");

router.post('/register', async (req, res) => {
  const { name, email, password, } = req.body;
  console.log(name, email, password);
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  const admin = await Admin.findOne({ email });
  if (!admin) {
    const admin = await Admin.create({
      name,
      email,
      password,
      token,
    });
    console.log('admin in registerAdmin===', admin);
    return res.json({ success: true });
  }
  sendToken(admin, 201, res);
  return res.json({
    error: 1,
    msg: `Admin with this email ${req.body.email} already exists`
  });
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;  
  try {
    const admin = await Admin.findOne({ email });
    //console.log('admin in sign in=', admin);
    if (admin) {
      bcrypt.compare(password, admin.password, (err, same) => {
        if (same) {
          sendToken(admin, 200, res);
          return res.json({ success: true, admin });
        }
        return res.json({
          error: 1,
          msg: "incorrect password"
        });
      });
      //let isPasswordMatch = admin.comparePassword(password);
    }
  } catch (e) {
    console.log("error", e.message);
    return res.json({
      error: 1,
      msg: "This admin does not exist"
    });
  };
});

module.exports = router