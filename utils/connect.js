import mongoose from "mongoose";
import dotenv from "dotenv"
const connect = () => {
  dotenv.config();
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;