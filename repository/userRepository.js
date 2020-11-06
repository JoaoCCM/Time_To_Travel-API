module.exports = app => {

    const createUser = (data) => {
        try {
            return 'User created'
        } catch (error) {
            throw error;
        }
    }

    return { createUser }
}