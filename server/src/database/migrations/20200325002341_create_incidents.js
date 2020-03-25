const {
  TABLES: { INCIDENTS }
} = require("../../config");

exports.up = function(knex) {
  return knex.schema.createTable(INCIDENTS, table => {
    table.increments();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("value").notNullable();

    // Relationship with NGO
    table.string("ngo_id").notNullable();
    table
      .foreign("ngo_id")
      .references("id")
      .inTable("ngos");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(INCIDENTS);
};
