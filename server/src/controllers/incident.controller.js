const router = require("express").Router();
const { IncidentService } = require("../services");
const { generateRoutes } = require("../utils");

const routes = [
  { method: "post", path: "/", controller: IncidentService.create },
  { method: "get", path: "/", controller: IncidentService.findAll },
  { method: "get", path: "/:id", controller: IncidentService.findByNgoId },
  { method: "delete", path: "/:id", controller: IncidentService.delete }
];

module.exports = generateRoutes(router, routes);
