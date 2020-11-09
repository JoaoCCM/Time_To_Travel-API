const bcrypt = require("bcrypt");

module.exports = (app) => {
    const {
        createUser,
        findUser,
        updateUser,
        deleteUser,
    } = app.repository.userRepository;

    const genHash = async (password) => {
        const hash = await bcrypt.hash(password, 10);
        const newPass = hash;
        return newPass;
    };

    const createOne = async (data) => {
        try {
            const email = await findUser({ email: data.email });
            if (email) throw new Error("Email already registered.");

            const cpf = await findUser({ cpf: data.cpf });
            if (cpf) throw new Error("CPF already in use.");

            const passwordHashed = await genHash(data.password);

            const result = await createUser({
                ...data,
                password: passwordHashed,
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    const deleteOne = async (id) => {
        try {
            const result = await deleteUser(id);
            if (!result) throw new Error("User not found");
            return result;
        } catch (e) {
            throw e;
        }
    };

    const updateOne = async (id, data) => {
        try {
            const result = await updateUser(id, data);
            if (!result) throw new Error("User not found");
            return result;
        } catch (e) {
            throw e;
        }
    };

    const findOne = async (id) => {
        try {
            const result = await findUser({ id }, [
                "id",
                "name",
                "email",
                "cpf",
            ]);
            if (!result) throw new Error("User not found");
            return result;
        } catch (e) {
            throw e;
        }
    };

    return { createOne, deleteOne, updateOne, findOne };
};
