
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    require: [true, 'Enter an email address.'],
    unique: [true, 'That email address is taken.'],
    // lowercase: true,
    // validate: [validator.isEmail, 'Enter a valid email address.']
  },
  password: {
    type: String,
    // required: [true, 'Enter a password.'],
    // minLength: [4, 'Password should be at least four characters']
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Retype your password.'],
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   }, message: 'Passwords don\'t match.'
    // }
  },
  role: {
    type: String,
    enum: ['User', 'Admin', 'Driver'],
    default: 'User'
  },
},
{
    timestamps: true,
})

AdminSchema.plugin(uniqueValidator, { message: `This  already existing.` });

AdminSchema.pre("save", function (next) {
  const admin = this 
  try{
  if (admin.isModified("password") || admin.isNew) {
    bcrypt.genSalt(10, function ( saltError, salt ) {                   
        bcrypt.hash(admin.password, salt, function (hashError, hash) {          
          admin.password = hash
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

// AdminSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, function (error, isMatch) {
//     if (error) {
//       return callback(error)
//     } else {
//       callback(null, isMatch)
//     }
//   })
// }

AdminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// UserSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };
module.exports = mongoose.model('Admin', AdminSchema)

