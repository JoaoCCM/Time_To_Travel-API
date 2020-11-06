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

    const findUser = async (where) => {
        try {
            return await app.db("user").where(where).first();
        } catch (e) {
            throw e;
        }
    };

    return { createUser, findUser };
};
