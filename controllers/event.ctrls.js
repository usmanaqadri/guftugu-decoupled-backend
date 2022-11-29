const db = require("../models");

const index = (req, res) => {
  db.Event.find({}, (error, events) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      events,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const show = (req, res) => {
  db.Event.findById(req.params.id, (error, foundEvent) => {
    if (error) return res.status(400).json({ error: error });

    return res.status(200).json({
      foundEvent,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const create = (req, res) => {
  db.Event.create(req.body, (error, createdEvent) => {
    if (error) return res.status(404).json({ error });
    return res.status(200).json(createdEvent);
  });
};

const update = (req, res) => {
  db.Event.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, updatedEvent) => {
      if (err) return res.status(400).json({ error: err });
      return res.status(200).json(updatedEvent);
    }
  );
};

const destroy = (req, res) => {
  db.Event.findByIdAndDelete(req.params.id, (err, deletedEvent) => {
    if (!deletedEvent)
      return res.status(400).json({ error: "Event not found" });
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json({
      message: `Event ${deletedEvent.name} was successfully deleted `,
    });
  });
};

module.exports = { index, show, create, update, destroy };
