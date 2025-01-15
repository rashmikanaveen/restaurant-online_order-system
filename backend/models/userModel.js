const mongoose= require("mongoose");
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
          isAdmin:{
            type:Boolean,
            required: true,
            default:false
          },
          


    },
    {
        timestamps: true, // valid way to enable timestamps
      }
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports =mongoose.model('user', userSchema);