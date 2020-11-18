
exports.up = function(knex) {

    return knex.schema.alterTable('flight', f => {
        f.text('image').nullable();
    })
  
};

exports.down = function(knex) {
    return knex.schema.alterTable('flight', f => {
        f.dropColumn('image');
    })
};
