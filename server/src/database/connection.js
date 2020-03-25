const knex = require("knex");
const knexCfg = require("../../knexfile");

const connection = knex(knexCfg.development);

module.exports = connection;
