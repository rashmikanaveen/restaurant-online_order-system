const mongoose = require('mongoose');
const Category = require('../../backend/models/CategoryModel');

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

exports.handler = async (event, context) => {
  try {
    await connectToDatabase();
    const categories = await Category.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(categories),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};