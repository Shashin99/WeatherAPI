const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Connect to MongoDB 
mongoose.connect(URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once ("open" , () => {
    console.log("Mongodb Connection success!");
})

const weatherRouter = require("./routes/api.js");
app.use("/api",weatherRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});