const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// GET route to SEED some junk data
router.get("/groupSeed", ctrls.groups.seed);

// GET route to show INDEX of all groups
router.get("/group", ctrls.groups.index);

// GET route to SHOW a group's info
router.get("/group/:id", ctrls.groups.show);

// POST route to CREATE a new group
router.post("/group", ctrls.groups.create);

// PUT route to UPDATE an existing group
router.put("/group/:id", ctrls.groups.update);

// DELETE route to destroy a group
router.delete("/group/:id", ctrls.groups.destroy);

module.exports = router;
