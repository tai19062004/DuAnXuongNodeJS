import cors from "cors";
import express from "express";
import router from "./routes/index.js";
import connect from "./utils/connect.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

// Connect MongoDB to MongoDB 
connect();

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:${8000}`);
});
