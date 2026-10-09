const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const dns =require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);


dotenv.config();

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://glowing-alpaca-2d3943.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // only needed if you use cookies
  })
);

// Parse JSON
app.use(express.json());

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the MERN Auth API",
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Atlas is connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });



//   mongoose.connection.once("open", () => {
//   console.log("DB name:", JSON.stringify(mongoose.connection.name));
//   console.log("User collection:", JSON.stringify(User.collection.name));
// });
