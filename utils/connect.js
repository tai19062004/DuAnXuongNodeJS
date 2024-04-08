import mongoose from "mongoose";
import dotenv from "dotenv"
const connect = () => {
  mongoose
    .connect(dotenv.config().parsed.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;