// Update with your config settings.

module.exports = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "time_to_travel_db",
    },

    pool: {
        min: 1,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
};
