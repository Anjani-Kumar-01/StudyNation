const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  if (!process.env.MONGODB_URL) {
    console.error("❌ MONGODB_URL is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((error) => {
      console.error("❌ MongoDB connection failed:");
      console.error(error.message);
      process.exit(1);
    });
};
