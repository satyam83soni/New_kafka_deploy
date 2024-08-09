import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect("mongodb+srv://satyam:ZjevYfDzzUqCH1Qj@cluster0.k7sgg2s.mongodb.net/dice-roll?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error: ', err);
    process.exit(1);
  });
};



export {connectDB}