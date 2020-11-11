module.exports = (app) => {
    const createAirline = async ({ name, logo }) => {
        try {
            const query = await app.db('airline').insert({ name, logo })
            return { id: query[0], name, logo }
        } catch (e) {
            throw e
        }
    }

    const findAirline = async (where = {}, select = '*', first = false) => {
        try {
            let query = app.db('airline').where(where).select(select)

            if (first == true) query = query.first()

            const result = await query
            return result
        } catch (e) {
            throw e
        }
    }

    const updateAirline = async (id, { name, logo }) => {
        try {
            return await app.db('airline').update({ name, logo }).where({ id })
        } catch (e) {
            throw e
        }
    }

    return { createAirline, findAirline, updateAirline }
}
