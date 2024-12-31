const User = require("../models/User");
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    const newUser = new User({username, email, password});
  
    await newUser.save();
  return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const inputPassword = req.body.password;

    const user = await User.findOne({username});

    if (!user){
      return res.status(401).json("Incorrect username");
    }

    const hashedPassword = cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);
    
    if (inputPassword !== originalPassword){
      return res.status(401).json("Incorrect password");
    }

    const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
          {expiresIn:"3d"}
      );

    const {password, ...others} = user._doc // json every user info except password;
    return res.status(200).json({others, accessToken});

  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser }