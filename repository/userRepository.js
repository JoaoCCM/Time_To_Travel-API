module.exports = (app) => {
    const createUser = async ({ name, email, password, cpf, is_admin }) => {
        try {
            const query = await app
                .db("user")
                .insert({ name, email, password, cpf, is_admin });
            return { id: query[0], name, email };
        } catch (error) {
            throw error;
        }
    };

    const findUser = async (where, select = "*") => {
        try {
            return await app.db("user").where(where).select(select).first();
        } catch (e) {
            throw e;
        }
    };

    const deleteUser = async (id) => {
        try {
            return await app.db("user").del().where({ id });
        } catch (e) {
            throw e;
        }
    };

    const updateUser = async (id, { name, email, password, cpf, is_admin }) => {
        try {
            const query = await app
                .db("user")
                .update({ name, email, password, cpf, is_admin })
                .where({ id });

            return query;
        } catch (e) {
            throw e;
        }
    };

    return { createUser, findUser, updateUser, deleteUser };
};
