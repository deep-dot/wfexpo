const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Driver = require('../models/driver');
const Cab = require('../models/cab');
var jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

router.post('/registerDriver', async (req, res) => {
   // console.log(req.body.city);    
    const {driverid, pin, firstname, lastname, email, dateofbirth, phone, streetnumber, street, city, postalcode, state, country} = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const driver = await Driver.findOne({ driverid })
    if (!driver) {
        await Driver.create({
            driverid,  
            pin,          
            firstname,
            lastname,    
            email,        
            dateofbirth,
            phone,
            address: {
                streetnumber,
                street,
                city,
                postalcode,
                state,
                country,
            },            
            token,
        });
        return res.json({ status: 'ok', success: true });
    }
    if (driver) {
        return res.json({
            error: `User with this id ${req.body.driverid} already exists`
        });
    }
});

router.post('/login', async (req, res, next) => {
    const { driverid, pin, rego } = req.body;
    const token = jwt.sign({ driverid }, process.env.JWT_SECRET);
    try {
        let driver = await Driver.findOne({ driverid });
        let cab = await Cab.findOne({ rego, ready: 'Ready' });
        if (!driver) {
            return res.json({
                error: "This driverid does not exist"
            });
        }
        if (!cab) {
            return res.json({
                error: "Car is already taken"
            });
        }        
        bcrypt.compare(pin, driver.pin, async (err, same) => {            
            if (same) {
               // console.log(' driver role and cab drivenby', driver.role, cab.rego);
                cab.ready = 'Ready';
                // cab.driverid.push(driver.driverid);
                cab.drivenby.push(driver._id);
                await cab.save();
                driver.drivencab.push(rego);
                driver.token = token;
                await driver.save();
                return res.json({
                    status: "ok",
                    success: true,
                    driver,
                    cab,
                });                
            }
            return res.json({
                error: "incorrect pin"
            });
        });       
    } catch (err) {
        console.log(`Incorrect driverid or pin.${err.message}`);
    };
});

router.post('/logout', function (req, res) {
    console.log(`Logout${req.query.Rego}`)
});

// Get Driver Detail
router.get('/getDriver', async (req, res, next) => {
   // console.log('userId===', req.query.id);
    const id = req.query.id;
    try {
        const driver = await Driver.findById(id);
        //const iid = await Driver.find().sort({ _id : -1 }).limit(1)
        // console.log(iid)
        // console.log(driver.drivencab.slice(-1)[0]);
        return res.json({
            status: "ok",
            success: true,
            driver: driver,
        });
    } catch (e) {
        console.log(e);
        return res.json({
            error: "Driver not found",
        });
    }
});


// Get all Drivers
router.get('/getAllDrivers', async (req, res, next) => {
    try {
        let drivers = await Driver.find();
        return res.json({
            status: "ok",
            success: true,
            drivers,
        });
    } catch (e) {
        console.log(e.message);
        return res.json({
            error: "No driver exist."
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
        await Driver.updateOne(
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
        const user = await Driver.updateOne(
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

router.put('/logout', async (req, res) => {
    console.log('logout', req.query.Rego);
    var cab = await Cab.updateOne({ rego: req.query.Rego },
        { $set: { ready: 'Ready' } },
        { new: true }
    );
});

module.exports = router;