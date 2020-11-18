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
                image
            }
        } catch (e) {
            throw e
        }
    }

    const list = async (dest, ship) => {
        try {
            let query = app.db('flight').select('*')

            if (dest != null && ship != null)
                query = query
                    .where('destination', 'LIKE', `%${dest}%`)
                    .where('shipment', 'LIKE', `%${ship}%`)

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

    return { createFlight, list, updateFlight, removeFlight, listOne }
}
