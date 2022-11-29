const mongoose = require("mongoose");

// CREATE SCHEMA

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  date: { type: Date, required: true },
  organizer: String,
  img: {
    type: String,
    default:
      "https://www.goldbergdevilliers.co.za/wp-content/uploads/2020/09/video-conference-5183312_640.png",
  },
  meetingCode: { type: String, required: true },
  meetingPswd: { type: String, required: true },
  meetingURL: { type: String, required: true },
});

// CREATE MODEL

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
