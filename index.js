require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


async function connectToDB() {
  try {
    await connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
connectToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const { users } = require('./routes/userRoute');
app.use('/users', users);