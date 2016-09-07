exports.up = (knex) => {
  return knex.schema.createTable('people', (table) => {
    table.increments();
    table.string('username').unique().notNullable();
    table.string('hobby').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('people');
};
