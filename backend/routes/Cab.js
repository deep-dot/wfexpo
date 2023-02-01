const express = require('express');
const router = express.Router();
const Cab = require('../models/cab');
const bcrypt = require('bcrypt')

//create cab 
router.post('/createCab', async (req, res) => {
  // console.log(req.body.driverId)
  let cab = await Cab.findOne({ rego: req.body.rego });
  if (cab) {
    return res.status(400).send('Car number already registered');
  } else {
    cab = new Cab({
      location: req.body.location,
      rego: req.body.rego,
      type: req.body.type,
      description: req.body.description,
      driverid: req.body.driverid,
      drivenby: req.body.driverId,
    });
    //const salt = await bcrypt.genSalt(10);
    // cab.pin = await bcrypt.hash(cab.pin, salt);
    await cab.save();
    res.send(cab);
  }
})

// currentlocation of cab
router.post("/cablocation", async (req, res) => {
  const { latitude, longitude } = req.body.locationdetail.location;
  const { streetnumber, street, city, postalcode } = req.body.locationdetail.description;
  //console.log('location detail in cablocation===', req.body)
  if (req.body.locationdetail) {
    let rego = req.body.locationdetail.rego;
    let location = {
      latitude,
      longitude
    }
    let description = {
      streetnumber,
      street,
      city,
      postalcode,
      // region: locationdetail.region[0].region,
      // country: locationdetail.region[0].country,
      // date: new Date().toUTCString()
      date: new Date().toUTCString()
    }
    try {
      const cab = await Cab.findOneAndUpdate(
        { rego },
        // { $set: { location, description, ready } },
        { location, description },
        { new: true }
      );
      // console.log('cab==', cab)
      return res.json({
        status: "ok",
        success: true,
        location: cab.description,
      });

    } catch (error) {
      return res.json({
        error: 1,
        msg: "Cab location is not being updated."
      });
    }
  }
});

//Get Cab Detail
router.get('/getCab', async (req, res) => {
  // console.log('cab rego===', req.query.rego);
  const { rego } = req.query;
  try {
    // let cab = await Cab.findOne({ rego }).populate("drivenby");
    let cab = await Cab.findOne({ rego });
    console.log('cab rego===', cab.availability);
    return res.json({
      status: "ok",
      success: true,
      cab,
    });
  } catch (error) {
    console.log('Cab does not exist');
    return res.json({
      success: false,
      msg: "Cab does not exist",
    });
  }
});


// Get all Cabs
router.get('/getAllCabs', async (req, res, next) => {
  try {
    const cabs = await Cab.find(
      {
        $and:
          [
            { status: 'P' },
            { availability: 'Avail' },
          ]
      }
    )
    // console.log('getAllCabs==', cabs[0].description.city, cabs[1].description.city);
    return res.json({
      status: "ok",
      success: true,
      cabs,
    });
  } catch (e) {
    return res.json({
      error: "Something wrong"
    });
  }
});

//cab status
router.post('/cabstatus', async (req, res, next) => {
  // console.log('cabstatus==', req.body)
  await Cab.updateOne({ 'vehicle.rego': req.body.rego },
    { $set: { 'vehicle.availability': req.body.availability } },
    { new: true })
    .then((response) => {
      // console.log('response===', response.vehicle.availability);
      //if (response.vehicle.availability === req.body.availability) {
      if (response) {
        return res.json({
          status: "ok",
          success: true,
          availability: response.vehicle.availability,
        });
      } else {
        return res.json({
          error: 1,
          msg: "Availability is not being updated."
        });
      }
    }).catch((e) => { console.log(e) });
});

router.get('/cabstatus', async (req, res, next) => {
  // console.log('cabstatus==', req.body)
});
router.put('/cabstatus', async (req, res, next) => {
  console.log('cabstatus==', req.body)
});
router.delete('/cabstatus', async (req, res, next) => {
  console.log('cabstatus==', req.body)
});

module.exports = router