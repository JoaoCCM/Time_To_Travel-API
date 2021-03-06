module.exports = (app) => {
    const { createOne, listFlight, updateOne, deleteOne, listAvailableFlights } = app.service.flight

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
            const { dest = null, ship = null, date = null } = req.query
            const flight = await listFlight(dest, ship, date)
            return res.status(200).json(flight)
        } catch (e) {
            const { message } = e
            return res.status(500).json(message)
        }
    }

    const listAvailable = async (req, res) => {
        try{
            const result = await listAvailableFlights();
            return res.status(200).json(result);
        }catch(e){
            const {message} = e;
            return res.status(500).json(message);
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
    return { create, list, update, remove, listAvailable }
}
