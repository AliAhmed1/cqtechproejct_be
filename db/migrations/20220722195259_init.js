/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema
    .createTable('students', function (table) {
        table.increments('studentid').primary();
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
        table.timestamp(true,true)
    })
    .createTable('books', function (table) {
        table.increments('bookid').primary();
        table.integer('studentid').unsigned().notNullable().references('studentid').inTable('students');
        table.string('book_name',1000).notNullable();
        table.string('author', 1000).notNullable();
        table.date('date_of_borrow').notNullable();
        table.date('date_of_return').notNullable();
        table.timestamp(true,true)

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
