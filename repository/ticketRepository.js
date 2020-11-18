module.exports = app => {

    const createTicket = async({flight_id, user_id, price_ticket, amount, child_amount, status}) => {
        try{
            const query = await app.db('ticket').insert({flight_id, user_id, price_ticket, amount, child_amount, status});

            return {id: query[0], flight_id, user_id, price_ticket, amount, child_amount, status}
        }catch(e){
            throw e;
        }
    }

    const findOne = async(where, select='*') => {
        return await app.db('ticket').where(where).select(select).first()
    }

    const updateTicket = async (id) => {
        try{
            return await app.db('ticket').where({id}).update({status: 'cancelada'})
        }catch(e){
            throw e;
        }
    }

        return { createTicket, updateTicket, findOne }
    }
