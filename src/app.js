// Import required modules
import express from "express";
import path from "path";
import { Subscriber } from "./models/subcribers.js";
import { cwd } from "process";

// Create an instance of the Express application
const app = express(); 
// To serve static files, give permission to the 'public' folder
app.use(express.static(path.join(cwd(), "public")));

// Routes
// API 
app.get("/subscribers", async (req, res) => {
  try {
    let subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(404).send(); // Send a response with status 404 (Not Found) in case of error
  }
});

// API to get all subscribers by name and subscribedChannel
app.get("/subscribers/names", async (req, res) => {
  try {
    let subscribers = await Subscriber.find({}, { name: 1, subscribedChannel: 1, _id: 0 });
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(404).send({ Error_message: "No Subscriber name." }); // Send an error message along with status 404
  }
});

// API to get subscribers by id
app.get("/subscribers/:id", async (req, res) => {
  try {
    let subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) { // Check if subscriber is not found
      res.status(404).send({ Error_message: "No Subscriber found related to this id." });
      return;
    }
    res.status(200).send(subscriber);
  } catch (error) {
    res.status(400).send({ Error_message: "Invalid Subscriber ID." });
  }
}); 
 
// Handles all the unwanted requests
app.use((req, res) => {
    res.status(404).json({ message: "Error - Route not found" });
});

export { app }; // Export the Express app using named export

