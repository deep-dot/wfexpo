// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();  
    console.log('token in utils jwtToken==', token);
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.cookie('token',token, options);
     //res.status(statusCode).cookie("token", token, options)
    // res.status(statusCode).cookie("token", token, options).json({    
    //   success: true,
    //   msg:`Password updated successfully`,
    //   user,
    //   token,
    // });
  };
  
  module.exports = sendToken;