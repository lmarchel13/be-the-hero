const {
  TABLES: { NGOS }
} = require("../../config");

exports.up = function(knex) {
  return knex.schema.createTable(NGOS, table => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(NGOS);
};
