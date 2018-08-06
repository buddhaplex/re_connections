const express = require("express");
const mongoose = require("mongoose");

users = require("./routes/api/users");
profile = require("./routes/api/profile");
posts = require("./routes/api/posts");

const app = express();

// db config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(
    db)
  .then(res => console.log("MongoDB is connected!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hi! Working for you!"));

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
