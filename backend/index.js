
  const path = require('path');
  const express = require('express');
  const Session = require('express-session');
  const dotenv = require('dotenv');
  const MongoStore = require('connect-mongo');
  const connectDB = require('./config/db');
  const app = express();
  const cloudinary = require("cloudinary").v2;
  const cookieParser = require('cookie-parser');
  
  dotenv.config({ path: './config/config.env' })
  connectDB()
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json());
  app.use(cookieParser());

  try {
    app.use(
      Session({      
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI
        })
      })
    )
    console.log("Sessions successfully initialized!");
  } catch (err) {
    console.log(`Error setting up a mongo session store! `);
  }
  
  cloudinary.config({ 
    cloud_name: 'dedqid79f', 
    api_key: '671714944192486', 
    api_secret: 'faGPDeyU8-msjGCdk3gEs2ri4Ok',
    secure: true 
  });
  
  app.use('/Admin',require('./routes/Admin'))
  app.use('/Job',require('./routes/Job'))
  app.use('/Cab',require('./routes/Cab'))
  app.use('/Driver',require('./routes/Driver'))
  app.use('/User',require('./routes/User'))
  
  const PORT = process.env.PORT || 4000
  const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )
  
  // server.close(() => {
  //   process.exit(1);
  // });