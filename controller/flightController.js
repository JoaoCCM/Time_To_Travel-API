module.exports = (app) => {
    const { createOne, listFlight, updateOne, deleteOne } = app.service.flight

    const create = async (req, res) => {
        try {
            const flight = await createOne(req.body)
            return res.status(200).json(flight)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    const list = async (req, res) => {
        try {
            const { dest, ship } = req.query
            const flight = await listFlight(dest, ship)
            return res.status(200).json(flight)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    const update = async (req, res) => {
        try {
            const { id } = req.params
            const flight = await updateOne(id, req.body)
            return res.status(200).json({ message: 'Updated' })
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    const remove = async (req, res) => {
        try {
            const { id } = req.params
            const flight = await deleteOne(id)
            return res.status(200).json({ message: 'Deleted' })
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }
    return { create, list, update, remove }
}
