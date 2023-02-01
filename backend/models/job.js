
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    callerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    jobid: { type: String },
    info: { type: String },
    bookingtime: { type: String },
    arrivaltime: { type: String },
    pickuptime: { type: String },
    dropofftime: { type: String },
    accounttype: { type: String },
    accountname: { type: String },
    name: { type: String },
    pickupaddress: {
        location: {
            lat: {
                type: String,
            },
            lng: {
                type: String,
            }
        },
        description: {
            type: String,
        },
    },
    dropoffaddress: {
        location: {
            lat: {
                type: String,
            },
            lng: {
                type: String,
            }
        },
        description: {
            type: String,
        },
    },
    vt: {
        type: String,
    },
    phone: {
        type: Number,
    },
    fare: {
        type: Number,
    },
    meterstatus: {
        type: String,
        enum: ['Active', 'Vacant'],
        default: 'Vacant'
    },

    jobstatus: { 
        type: String,
        // enum: [ 'New Job', 'Recieved', 'Arrived', 'Picked-Up', 'Dropped-Off', 'Done', 'Recalled', 'No-Show', 'Cancelled' ],
        // default: 'New Job'
    },

    jobrecalledby: [{
        rego: { type: String },
        time: { type: String },
        driverId: { type: String },
    }],
    jobrecievedby: [{
        rego: { type: String },
        time: { type: String },
        driverId: { type: String },
    }],
    jobdeclinedby: [{
        rego: { type: String },
        time: { type: String },
        driverId: { type: String },
    }],
    jobdoneby: {
        rego: { type: String },
        time: { type: String },
        driverId: { type: String },
    },

    ppl: { type: String },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Job', JobSchema)