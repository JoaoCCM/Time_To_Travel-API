
exports.up = function(knex) {
    return knex.schema.alterTable('ticket', t => {
        t.dropColumn('price_ticket')
    })
    .alterTable('flight', f => {
        f.double('ticket_price').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.alterTable('ticket', t => {
      t.double('price_ticket').notNullable();
  })
  .alterTable('flight', f => {
      f.dropColumn('ticket_price')
  })
};
