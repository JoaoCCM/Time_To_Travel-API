const moment = require('moment');

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

            const formattedDate = moment(data.ship_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

            const result = await createFlight({...data, ship_date: formattedDate})

            return result
        } catch (e) {
            throw e
        }
    }

    const listFlight = async (dest, ship, date) => {
        try {
            const newDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const result = await list(dest, ship, newDate);
            
            const data = result.map(m => {
                const newDate = moment(m.ship_date).format('DD/MM/YYYY')
                const newTime = moment(m.ship_time, 'HH:mm:ss').format('HH:mm')

                return { ...m, ship_date: newDate, ship_time: newTime }
            });

            return data;
        } catch (e) {
            throw e
        }
    }

    const listAvailableFlights = async () =>{
        try{
            const result = await availableFlights();
            const shipment = result.map(m => m.shipment);
            const destination = result.map(m => m.destination);

            const listOfCities = [...shipment, ...destination]

            return listOfCities.filter((city, index) => listOfCities.indexOf(city) === index)
            
        }catch(e){
            throw e;
        }
    }

    const updateOne = async (id, data) => {
        try {
            const formattedDate = moment(data.ship_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const result = await updateFlight(id, {...data, ship_date: formattedDate})
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
