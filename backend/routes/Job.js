
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Job = require('../models/job');
const Cab = require('../models/cab');
var jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const { CloudinaryStorage } = require("multer-storage-cloudinary");

router.put('/jobStatus', async (req, res) => {
  const { time, jobstatus, rego } = req.body;
  console.log('jobdetail==', req.query.id, time, jobstatus, rego);
  try {
    if (jobstatus === "Recieved") {
      const { jobrecievedby } = req.body;
      await Job.findByIdAndUpdate(
        { _id: req.query.id },
        { $push: { jobrecievedby: jobrecievedby }, jobstatus },
        { new: true }
      );
      await Cab.updateOne(
        { rego: rego },
        { $set: { status: 'Eng' } },
        { new: true }
      );
    }
    if (jobstatus === "Declined") {
      const { jobdeclinedby } = req.body;
      await Job.findByIdAndUpdate(
        { _id: req.query.id },
        { $push: { jobdeclinedby: jobdeclinedby }, jobstatus },
        { new: true }
      );
      await Cab.findOneAndUpdate(
        { rego: rego },
        { $set: { availability: 'Penalty' } },
        { new: true }
      );
    }
    if (jobstatus === "Recalled") {
      const { jobrecalledby } = req.body;
      await Job.findByIdAndUpdate(
        { _id: req.query.id },
        { $push: { jobrecalledby: jobrecalledby }, jobstatus },
        { new: true }
      );
      await Cab.updateOne(
        { rego: rego },
        { $set: { availability: 'Panalty', status: 'Panalty' } },
        { new: true }
      );
    }
    if (jobstatus === "Arrived") {
      await Job.findByIdAndUpdate({ _id: req.query.id },
        { $set: { arrivaltime: time, jobstatus } },
        { new: true });
    }
    if (jobstatus === "Picked-Up") {
      await Job.findByIdAndUpdate({ _id: req.query.id },
        { $set: { pickuptime: time, jobstatus } },
        { new: true });
      await Cab.updateOne(
        { rego: rego },
        { $set: { status: 'POB' } },
        { new: true }
      );
    }
    if (jobstatus === "Dropped-Off") {
      await Job.findByIdAndUpdate({ _id: req.query.id },
        { $set: { dropofftime: time, jobstatus } },
        { new: true });
    }
    if (jobstatus === "Done") {
      const { fare, people, jobdoneby } = req.body;
      console.log('jobdone==', req.query.id, fare, people, time, jobdoneby);
      await Job.findByIdAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            fare: fare,
            ppl: people,
            dropofftime: time
          },
          jobstatus: jobstatus,
          jobdoneby,
        },
        { new: true });
      await Cab.updateOne(
        { rego: rego },
        { $set: { status: 'P' } },
        { new: true }
      );
    }
    return res.json({
      status: "ok",
      success: true,
    });
  } catch (e) {
    res.json({
      error: 1,
      msg: "Updation failed"
    });
  }
});

router.get('/jobdetail', async (req, res, next) => {
  // console.log('job id==', req.query.id)
  try {
    const job = await Job.findById({ _id: req.query.id }).populate('callerid');
    return res.json({
      status: "ok",
      success: true,
      job,
      jobId: req.query.id,
    });
  } catch (e) {
    return res.json({
      error: 1,
      msg: "Job is not found"
    });
  }
});

router.get('/getjobsneedtobedone', async (req, res, next) => {
  let currenttime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  await Job.find(
    {
      $and:
        [
          {
            $or:
              [
                { jobstatus: 'Recalled' },
                { jobstatus: 'Declined' },
                { jobstatus: 'New Order' },
              ]
          },
          {
            $or:
              [
                { bookingtime: currenttime },
                { bookingtime: 'asap' },
              ]

          },
        ]
    }
  ).then((jobs) => {
   // console.log('all jobs ===', jobs.length);
    return res.json({
      status: "ok",
      success: true,
      jobs,
    });
  }).catch((err) => {
    console.log(err.message);
    return res.json({
      error: 1,
      msg: "Jobs are not found"
    });
  });
});

router.get('/getBookings', async(req, res) => {
  console.log('bookings in jobs==',);
  let currenttime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  try {
    const bookings = await Job.find({ bookingtime: { $gt: currenttime } });
    //console.log('bookings in jobs==',bookings.length);
    return res.json({
      status: "ok",
      success: true,
      bookings,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      error: 1,
      msg: "No Bookings"
    });
  }
});

router.get('/getalljobsdonebydriver', async (req, res, next) => {
   console.log('in jobs done by driver', req.query.driverid)
  await Job.find({ jobdoneby: req.query.driverid }).then((jobs) => {
      console.log('jobs in getalljpbsdonebydriver ===', jobs.length);
    return res.json({
      status: "ok",
      success: true,
      jobs,
    });
  }).catch((err) => {
    return res.json({
      error: 1,
      msg: "Jobs are not found"
    });
  })
});

router.get('/getalljobsbyuser', async (req, res, next) => {
  // console.log('id===', req.query.id)
  try {
    const jobs = await Job.find({ callerid: req.query.id });
    return res.json({
      status: "ok",
      success: true,
      jobs,
    });
  } catch (e) {
    return res.json({
      error: 1,
      msg: "Job is not found"
    });
  }
});

module.exports = router