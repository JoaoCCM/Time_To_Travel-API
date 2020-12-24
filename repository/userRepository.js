module.exports = (app) => {
    const createUser = async ({ name, email, password, cpf, is_admin }) => {
        try {
            const query = await app
                .db("user")
                .insert({ name, email, password, cpf, is_admin });
            return { id: query[0], name, email };
        } catch (error) {
            throw error;
        }
    };

    const findUser = async (where, select = "*") => {
        try {
            return await app.db("user").where(where).select(select).first();
        } catch (e) {
            throw e;
        }
    };

    const deleteUser = async (id) => {
        try {
            return await app.db("user").where({ id }).del();
        } catch (e) {
            throw e;
        }
    };

    const updateUser = async (id, { name, email, password, cpf, is_admin }) => {
        try {
            const query = await app
                .db("user")
                .update({ name, email, password, cpf, is_admin })
                .where({ id });

            return query;
        } catch (e) {
            throw e;
        }
    };

    const userTickets = async(id) => {
        try{
            return await app.db('ticket')
            .join('flight', 'flight.id', 'ticket.flight_id')
            .join('airline', 'airline.id', 'flight.airline_id')
            .where('ticket.status', 'ativo')
            .where('ticket.user_id', id)
            .select('flight.*', 'airline.name as airline', 'airline.logo as airline_logo', 'ticket.amount as amount_ticket', 'ticket.child_amount', 'ticket.id as ticket_id')
        }catch(e){
            throw e;
        }
    }


    return { createUser, findUser, updateUser, deleteUser, userTickets };
};
