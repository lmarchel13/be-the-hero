const router = require("express").Router();
const { NgoService } = require("../services");
const { generateRoutes } = require("../utils");

const routes = [
  { method: "post", path: "/", controller: NgoService.create },
  { method: "get", path: "/", controller: NgoService.findAll },
  { method: "get", path: "/:id", controller: NgoService.findById }
];

module.exports = generateRoutes(router, routes);
