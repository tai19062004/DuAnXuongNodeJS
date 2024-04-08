import mongoose from "mongoose";
import dotenv from "dotenv"
const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017/Xuong-NodeJs')
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;