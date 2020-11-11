module.exports = (app) => {
    const {
        createOneAirline,
        listAllAirlines,
        updateOneAirline,
        listOneAirline,
    } = app.service.airline

    const create = async (req, res) => {
        try {
            const airline = await createOneAirline(req.body)
            return res.status(200).json(airline)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    const listAll = async (req, res) => {
        try {
            const airline = await listAllAirlines()
            return res.status(200).json(airline)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }
    const update = async (req, res) => {
        try {
            const { id } = req.params
            const airline = await updateOneAirline(id, req.body)
            return res.status(200).json({ message: 'Updated' })
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }
    const listOne = async (req, res) => {
        try {
            const { id } = req.params
            const airline = await listOneAirline(id)
            return res.status(200).json(airline)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    return { create, listAll, update, listOne }
}
