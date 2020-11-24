module.exports = (app) => {
    const {
        createFlight,
        list,
        updateFlight,
        removeFlight,
        availableFlights
    } = app.repository.flightRepository
    const { findAirline } = app.repository.airlineRepository

    const createOne = async (data) => {
        try {
            const airline = await findAirline(
                { id: data.airline_id },
                '*',
                true
            )
            if (!airline) throw new Error('Airline does not exist')

            const result = await createFlight(data)

            return result
        } catch (e) {
            throw e
        }
    }

    const listFlight = async (dest, ship) => {
        try {
            const result = await list(dest, ship)
            return result
        } catch (e) {
            throw e
        }
    }

    const listAvailableFlights = async () =>{
        try{
            const result = await availableFlights();
            const shipment = result.map(m => m.shipment);
            const destination = result.map(m => m.destination);

            return [...shipment, ...destination]
            
        }catch(e){
            throw e;
        }
    }

    const updateOne = async (id, data) => {
        try {
            const result = await updateFlight(id, data)
            if (!result) throw new Error('Flight not found')
            return result
        } catch (e) {
            throw e
        }
    }

    const deleteOne = async (id) => {
        try {
            const result = await removeFlight(id)
            if (!result) throw new Error('Flight not found')
            return result
        } catch (e) {
            throw e
        }
    }

    return { createOne, listFlight, updateOne, deleteOne, listAvailableFlights }
}
