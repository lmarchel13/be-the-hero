const ngoController = require("./ngo.controller");
const incidentController = require("./incident.controller");
const sessionController = require("./session.controller");

module.exports = app => {
  app.use("/ngos", ngoController);
  app.use("/incidents", incidentController);
  app.use("/sessions", sessionController);
};
