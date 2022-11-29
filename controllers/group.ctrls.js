const db = require("../models");

const seed = (req, res) => {
  db.Group.insertMany(
    [
      { name: "Group 1" },
      { name: "group2", members: ["1", "2"] },
      { name: "group3", events: ["13", "25"] },
    ],
    (err, createdGroups) => {
      if (err) return res.status(404).json({ error: err.message });
      return res
        .status(200)
        .json({ createdGroups, createdAt: new Date().toLocaleString() });
    }
  );
};

const index = (req, res) => {
  db.Group.find({}, (error, group) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      group,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const show = (req, res) => {
  db.Group.findById(req.params.id, (error, foundGroup) => {
    if (error) return res.status(400).json({ error: error });

    return res.status(200).json({
      foundGroup,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const create = (req, res) => {
  db.Group.create(req.body, (error, createdGroup) => {
    if (error) return res.status(404).json({ error });
    return res.status(200).json(createdGroup);
  });
};

const update = (req, res) => {
  db.Group.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, updatedGroup) => {
      if (err) return res.status(400).json({ error: err });
      return res.status(200).json(updatedGroup);
    }
  );
};

const destroy = (req, res) => {
  db.Group.findByIdAndDelete(req.params.id, (err, deletedGroup) => {
    if (!deletedGroup)
      return res.status(400).json({ error: "Group not found" });
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json({
      message: `Group ${deletedGroup.name} was successfully deleted `,
    });
  });
};

module.exports = { index, show, seed, create, update, destroy };
