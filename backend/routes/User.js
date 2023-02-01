const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Job = require('../models/job');
var jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { isAuthenticatedUser } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, ('./public/img/db_img'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);

//   }
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WFProfileAvatar",
    allowedFormats: ["jpg", "png", "jpeg", "svg", "mov"]
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg' || file.mimetype === 'image/mov') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  // limits: {
  //   fieldSize: 25 * 1024 * 1024 
  // },
  fileFilter: fileFilter
})

router.post('/registerUser', async (req, res) => {
  const { username, email, password, firstname, lastname, dateofbirth, phone } = req.body;
  //console.log(username, email, password, firstname, lastname, dateofbirth);
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  const user = await User.findOne({ email });
  if (!user) {
    const user = await User.create({
      username,
      email,
      password,
      firstname, lastname, dateofbirth,
      address: {
        streetnumber: req.body.address.streetnumber,
        street: req.body.address.street,
        city: req.body.address.city,
        postalcode: req.body.address.postalcode,
        region: req.body.address.region,
        country: req.body.address.country,
      },
      phone,
      token,
    });
    console.log('user in registerUser===', user);
    return res.json({ status: 'ok', success: true });
  }
  sendToken(user, 201, res);
  return res.json({
    error: 1,
    msg: `User with this email ${req.body.email} already exists`
  });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email-=', email, 'password=', password);
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          sendToken(user, 200, res);
          return res.json({ status: "ok", success: true, user });
        }
        return res.json({
          error: 1,
          msg: "incorrect password"
        });
      });
      //let isPasswordMatch = user.comparePassword(password);
    }
  } catch (e) {
    console.log("error", e.message);
    return res.json({
      error: 1,
      msg: "This user does not exist"
    });
  };
});

router.post('/jobCreate', async (req, res, next) => {
  console.log('jobdetail==', req.body);
 const {callerid, accounttype, accountname, name, bookingtime, pickupaddress, dropoffaddress, vt, info, jobstatus } = req.body;
 await Job.create({
   callerid,
   accounttype,
   accountname,
   name,
   bookingtime,
   pickupaddress,
   dropoffaddress,
   vt,
   info,
   jobstatus,
 }).then((job) => {
   //console.log(job)
   return res.json({
     status: "ok",
     success: true,
     job,
   });
 }).catch((err) => {
   return res.json({
     error: 1,
     msg: "Job is not created"
   });
 })
});

router.get('/totalOrdersMade', isAuthenticatedUser, async (req, res, next) => {
  //console.log(' callerid in User===', req.user.id)
  try {
    let orders = await Job.find(
      {
        $and:
          [
            { callerid: req.user.id },
            {jobstatus: 'Done'}
          ]
      }
    );
    return res.json({
      status: 'ok',
      success: true,
      orders
    });
  } catch (e) {
    console.log("error", e.message);
    return res.json({
      error: 1,
      msg: "Something Wrong"
    });
  }
});

router.post('/profileImage', upload.single('file'), async (req, res, next) => {
  console.log('file====', req.file);
  if (req.file === "" || req.file === undefined || !req.file || req.file == null) {
    return res.json({
      error: 1,
      msg: "Please select image"
    });
  }
  try {
    await Cab.findOneAndUpdate(
      { email: req.body.email },
      { $set: { 'image': req.file.path } },
      { new: true },
      { upsert: false, multi: true }
    ).then(user => {
      return res.json({ status: 'ok', success: true, image: user.image })
    }).catch(err => {
      return res.json({
        error: 1,
        msg: "Image updation failed"
      });
    })
  } catch (e) { console.log(e); }
});

router.put('/postProfileData', async (req, res) => {
  //console.log(req.body);
  let { email, firstName, lastName, phone, country, city } = req.body;
  try {
    const user = await Cab.findOneAndUpdate(
      { email: email },
      {
        $set: {
          status: "Active",
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          country: country,
          city: city
        }
      },
      { new: true },
      { upsert: false, multi: true }
    )

    if (user) {
      console.log('userid==', user._id);
      return res.json({ status: "ok", success: true, userid: user._id });
    } else {
      return res.json({
        error: 1,
        msg: "Something wrong"
      });
    }
  } catch (e) { console.log(e); }
});

router.post("/userlocation", async (req, res) => {
  let location = req.body.location;
  let email = req.body.email;
  let suburb = req.body.suburb;
  console.log('current location', location, email, suburb);
  await Cab.findOneAndUpdate(
    { email: email },
    { $set: { 'vehicle.location': location, 'vehicle.suburb': suburb } },
    { new: true })
    .then((response) => {
      // console.log('response===', response);
      if (response.email === email) {
        return res.json({
          status: "ok",
          success: true,
          userid: response._id,
        });
      } else {
        return res.json({
          error: 1,
          msg: "User location is not being updated."
        });
      }
    }).catch((e) => { console.log(e) });
});

// Get User Detail
router.get('/getUser', async (req, res, next) => {
  //  console.log('userId===', req.query.id);
  const id = req.query.id;
  await Cab.findById(id)
    .then((user, err) => {
      if (user) {
        return res.json({
          status: "ok",
          success: true,
          user: user,
        });
      }
      if (err) {
        return res.json({
          error: 1,
          msg: "user not found",
        });
      }
    })
    .catch((err) => { console.log('error') })
});


// Get all Users
router.get('/getAllUsers', async (req, res, next) => {
  // console.log('userRole===', req.query.role);
  const role = req.query.role;
  try {
    const user = await Cab.find({ role: "User" })  //.lean().then((user, err) => {
    //console.log('user===', user)
    if (user) {
      return res.json({
        status: "ok",
        success: true,
        user: user,
      });
    } else {
      return res.json({
        error: 1,
        msg: "Please select image"
      });
    }
  } catch (e) { console.log(e) }
});

router.get('/logoutUser', catchAsyncErrors(async function (req, res) {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.json({
    success: true,
    message: "Logged Out",
  });
}));

module.exports = router;