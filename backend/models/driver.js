
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const DriverSchema = new mongoose.Schema({
  ratings: {
    type: Number,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  image: {
    type: String
  },
  driverid: {
    type: String,
    require: [true, 'Enter your DC number.'],
    //unique: [true],
    // lowercase: true,
    // validate: [validator.isEmail, 'Enter a valid email address.']
  },
  pin: {
    type: String,
    require: [true, 'Enter your Pin number.'],
  },
  email: {
    type: String,
    unique: [true]
  },
  drivencab: [{
    type: String,
  }],

  role: {
    type: String,
    enum: ['User', 'Admin', 'Driver'],
    default: 'Driver'
  },
  phone: { type: String, },
  token: { type: String },
  address: {
    streetnumber: String,
    street: String,
    city: String,
    postalcode: String,
    state: String,
    country: String,
  },
},
  {
    timestamps: true,
  })

DriverSchema.plugin(uniqueValidator, { message: 'This {PATH} already existing.' });

DriverSchema.pre("save", function (next) {
  const driver = this 
  try{
  if (driver.isModified("pin") || driver.isNew) {
    bcrypt.genSalt(10, function ( saltError, salt ) {                   
        bcrypt.hash(driver.pin, salt, function (hashError, hash) {          
          driver.pin = hash
          next();
          if (hashError) {
            return next(hashError);
          }
        })
     if(saltError){
      return next(saltError);
     }
    })
  } else {
    return next();
  }
} catch (e) { console.log(e.message)}
});

// DriverSchema.methods.comparePin = function (pin, callback) {
//   bcrypt.compare(pin, this.pin, function (error, isMatch) {
//     if (error) {
//       return callback(error)
//     } else {
//       callback(null, isMatch)
//     }
//   })
// }

DriverSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// DriverSchema.methods.getResetPinToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPinToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPinExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };
module.exports = mongoose.model('Driver', DriverSchema);

