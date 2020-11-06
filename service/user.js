module.exports = app => {
    const { createUser } = app.repository.userRepository;

    const createOne = async (data) => {
        try {
            const result = await createUser(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    return { createOne }
}