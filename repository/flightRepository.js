module.exports = (app) => {
    const createFlight = async ({
        destination,
        shipment,
        ship_date,
        ship_time,
        estimated_time,
        limit,
        airline_id,
        status,
        ticket_price,
        image
    }) => {
        try {
            const query = await app.db('flight').insert({
                destination,
                shipment,
                ship_date,
                ship_time,
                estimated_time,
                limit,
                airline_id,
                status,
                ticket_price,
                image
            })

            return {
                id: query[0],
                destination,
                shipment,
                ship_date,
                ship_time,
                estimated_time,
                limit,
                airline_id,
                status,
                ticket_price,
                image
            }
        } catch (e) {
            throw e
        }
    }

    const list = async (dest, ship, date) => {
        try {
            let query = app.db('flight').select('*')

            if (dest != null && ship != null && date != null)
                query = query
                    .where('destination', 'LIKE', `%${dest}%`)
                    .where('shipment', 'LIKE', `%${ship}%`)
                    .where('ship_date', 'LIKE', `%${date}%`)

            if (dest != null)
                query = query.where('destination', 'LIKE', `%${dest}%`)

            if (ship != null)
                query = query.where('shipment', 'LIKE', `%${ship}%`)

            const result = await query
            return result
        } catch (e) {
            throw e
        }
    }

    const listOne = async(where={}, select='*') => {
        return await app.db('flight').where(where).select(select).first();
    }

    const availableFlights = async () => {
        try{
            return await app.db('flight').where('flight.limit', '>', 0).select('shipment', 'destination');
        }catch(e){
            throw e;
        }
    }

    const updateFlight = async (
        id,
        {
            destination,
            shipment,
            ship_date,
            ship_time,
            estimated_time,
            limit,
            airline_id,
            status,
            image
        }
    ) => {
        try {
            const query = await app
                .db('flight')
                .update({
                    destination,
                    shipment,
                    ship_date,
                    ship_time,
                    estimated_time,
                    limit,
                    airline_id,
                    status,
                    image
                })
                .where({ id })

            return query
        } catch (e) {
            throw e
        }
    }

    const removeFlight = async (id) => {
        try {
            return await app.db('flight').del().where({ id })
        } catch (error) {
            throw error
        }
    }

    return { createFlight, list, updateFlight, removeFlight, listOne, availableFlights }
}
