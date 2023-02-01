
const mongoose = require('mongoose');

//const Cab = mongoose.model('Cab', new mongoose.Schema({
const CabSchema = new mongoose.Schema({
  driverid: [{
    type: String,
  }],
  drivenby: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  }],
  status: {
    type: String,
    enum: ['Eng', 'STC', 'P', 'POB'],
    default: 'P'
  },
  location: {
    latitude: String,
    longitude: String,
  },
  description: {
    streetnumber: String,
    street: String,
    city: String,
    postalcode: String,
    region: String,
    country: String,
    date: String,
  },
  rego: {
    type: String,
   // unique: true,
  },
  position: {
    type: Number,
  },
  type: {
    type: String,
  },
  suburb: {
    type: String,
  },
  availability: {
    type: String,
    // enum: ['Avail', 'Penalty'],
    // default: 'Avail'
  },
  arrivalstatus: {
    type: String,
  },
  ready: {
    type: String,
  }
},
  {
    timestamps: true,
  }
);

//   function validateDriver(driver) {
//     const schema = {
//         // name: Joi.string().min(5).max(50).required(),
//         driverid: Joi.string().min(5).max(255).required().email(),
//         pin: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(driver, schema);
// }

// exports.validate = validateDriver;
//exports.Cab = Cab;
module.exports = mongoose.model('Cab', CabSchema)

