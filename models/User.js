const mongoose = require('mongoose');
const cryptojs = require('crypto-js')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

userSchema.pre('save', async function () {
  const user = this;
  if(user.isModified('password') || user.isNew){
    try {
      const hash = await cryptojs.AES.encrypt(user.password, process.env.PASS_SEC).toString();
      user.password = hash;
    } catch (error) {
      console.error(error);
    }
  }
})

module.exports = mongoose.model('User', userSchema);