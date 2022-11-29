const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

// GET route to show INDEX of all events
router.get("/event", ctrls.event.index);

// GET route to SHOW an event's info
router.get("/event/:id", ctrls.event.show);

// POST route to CREATE a new event
router.post("/event", ctrls.event.create);

// PUT route to UPDATE an existing event
router.put("/event/:id", ctrls.event.update);

// DELETE route to destroy a event
router.delete("/event/:id", ctrls.event.destroy);

module.exports = router;
