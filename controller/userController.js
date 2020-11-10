module.exports = (app) => {
    const { createOne, deleteOne, updateOne, findOne } = app.service.user;

    const create = async (req, res) => {
        try {
            const result = await createOne(req.body);
            return res.status(200).json(result);
        } catch (e) {
            const { message } = e;
            return res.status(500).json(message);
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await deleteOne(id);
            return res.status(200).json({ message: "Deleted" });
        } catch (e) {
            const { message } = e;
            return res.status(500).json(message);
        }
    };

    const update = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await updateOne(id, req.body);
            return res.status(200).json({ message: "Updated" });
        } catch (e) {
            const { message } = e;
            return res.status(500).json(message);
        }
    };

    const findUser = async (req, res) => {
        try {
            const { id } = req.user.payload;
            const result = await findOne(id);
            return res.status(200).json(result);
        } catch (e) {
            const { message } = e;
            return res.status(500).json(message);
        }
    };

    return { create, deleteUser, findUser, update };
};
