const mongoose= require("mongoose");

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
            type:String,
            required: true,
            default:false
          },
          


    },
    {
        timestamps: true, // valid way to enable timestamps
      }
)


module.exports =mongoose.model('user', userSchema);