 
 
 
 
 
 
 import mongoose from "mongoose";

 const { Schema } = mongoose; // Import Schema from mongoose
 
 const subscriptionSchema = new Schema({
     name: {
         type: String,
         required: true,
     },
     subscribedChannel:{
         type: String,
         required: true,
     },
     subscribedDate: {
         type: Date,
         required: true,
         default: Date.now
     }
 });
 
 export const Subscriber = mongoose.model("Subscriber", subscriptionSchema);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
