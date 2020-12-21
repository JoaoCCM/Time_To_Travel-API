module.exports = (app) => {
    const {
        createAirline,
        findAirline,
        updateAirline,
    } = app.repository.airlineRepository

    const createOneAirline = async (data) => {
        try {
            const airline = await findAirline({ name: data.name }, 'name', true)
            if (airline) throw new Error('Airline already registered')

            const result = await createAirline(data)
            return result
        } catch (e) {
            throw e
        }
    }
    const listAllAirlines = async () => {
        try {
            const airlines = await findAirline({}, '*', false)

            return airlines
        } catch (e) {
            throw e
        }
    }

    const listOneAirline = async (id) => {
        try {
            const airlines = await findAirline({ id }, '*', true)
            if (!airlines) throw new Error('Airline not found')
            return airlines
        } catch (e) {
            throw e
        }
    }

    const listByName = async(name) => {
        try{
            return await findAirline({ name }, '*', true)
        }catch(e){
            throw e;
        }
    }

    const updateOneAirline = async (id, data) => {
        try {
            const airline = await findAirline({ name: data.name }, 'name', true)
            if (airline) throw new Error('Airline already registered')

            const result = await updateAirline(id, data)
            if (!result) throw new Error('Airline not found')
            return result
        } catch (e) {
            throw e
        }
    }

    return {
        createOneAirline,
        listAllAirlines,
        updateOneAirline,
        listOneAirline,
        listByName
    }
}
