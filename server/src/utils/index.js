const crypto = require("crypto");

const generateRandomId = () => crypto.randomBytes(4).toString("HEX");

const generateRoutes = (router, routes) => {
  routes.forEach(({ method, path, controller }) => {
    router[method](path, controller);
  });

  return router;
};

module.exports = {
  generateRandomId,
  generateRoutes
};
