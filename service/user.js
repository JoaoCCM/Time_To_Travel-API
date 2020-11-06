const bcrypt = require("bcrypt");

module.exports = (app) => {
    const { createUser, findUser } = app.repository.userRepository;

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

    return { createOne };
};
