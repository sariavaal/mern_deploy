const express = require("express");
const pirateController = require("../controllers/pirate.controller");
const { authenticate } = require("../config/jwt.config");

const PirateRouter = express.Router();

//api/pirate

PirateRouter.get("/", authenticate, pirateController.getAllPirates);
PirateRouter.get("/:id", authenticate, pirateController.getPirate);
PirateRouter.post("/", authenticate, pirateController.createPirate);
PirateRouter.put("/:id", authenticate, pirateController.updatePirate);
PirateRouter.delete("/:id", authenticate, pirateController.deletePirate);
PirateRouter.delete("/", authenticate, pirateController.deleteAllPirates);

module.exports = PirateRouter;
