const router = require("express").Router();
const { SessionService } = require("../services");
const { generateRoutes } = require("../utils");

const routes = [{ method: "post", path: "/", controller: SessionService.create }];

module.exports = generateRoutes(router, routes);
