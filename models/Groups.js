const mongoose = require("mongoose");

// CREATE SCHEMA

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  events: [{ type: String }],
  img: String,
  desc: { type: String, required: true },
});

// CREATE MODEL

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
