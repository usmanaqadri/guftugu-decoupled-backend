const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connected", () => console.log("DB connected... 🎉🎉🎉"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("disconnected", () => console.log("mongoose disconnected"));
