exports.up = function (knex) {
    return knex.schema
        .createTable("user", (u) => {
            u.increments("id").primary();
            u.string("name").notNullable();
            u.string("email").notNullable();
            u.string("password").notNullable();
            u.string("cpf").notNullable();
            u.boolean("is_admin").defaultTo("false");
        })
        .createTable("airline", (a) => {
            a.increments("id").primary();
            a.string("name").notNullable();
            a.text("logo").nullable();
        })
        .createTable("flight", (f) => {
            f.increments("id").primary();
            f.string("destination").notNullable();
            f.string("shipment").notNullable();
            f.timestamp("ship_date").notNullable();
            f.time("ship_time").notNullable();
            f.time("estimated_time").notNullable();
            f.integer("limit").notNullable();
            f.integer("airline_id")
                .unsigned()
                .references("id")
                .inTable("airline");
            f.string("status").notNullable();
        })
        .createTable("ticket", (t) => {
            t.increments("id").primary();
            t.integer("flight_id")
                .unsigned()
                .references("id")
                .inTable("flight");
            t.integer("user_id").unsigned().references("id").inTable("user");
            t.double("price_ticket").notNullable();
            t.integer("amount").notNullable();
            t.integer("child_amount").nullable();
            t.string("status").notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("user")
        .dropTable("flight")
        .dropTable("airline")
        .dropTable("ticket");
};
