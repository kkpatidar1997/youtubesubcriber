// Import required modules
import mongoose from "mongoose";

import { Subscriber } from "./models/subcribers.js";

import { data } from "./data.js ";

//dotenv.config();


// Cluster URI
const DATABASE_URL = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// If an error occurs during connection, handle and log the error
db.on("error", (err) => console.log(err));

// If the connection is successful, log a success message
db.once("open", () => {
  console.log("Database created...");
  refreshAll(); // Call the refreshAll function after successful connection
});

// Refresh all connections
const refreshAll = async () => {
  await Subscriber.deleteMany({}); 
  await Subscriber.insertMany(data); 
  await mongoose.disconnect();
};