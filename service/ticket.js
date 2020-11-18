module.exports = app => {

    const { createTicket, updateTicket, findOne } = app.repository.ticketRepository;
    const { listOne, updateFlight } = app.repository.flightRepository;

    const createOne = async (id, data) => {
        try{
            const flight = await listOne({id: data.flight_id});
            if(!flight) throw new Error('Flight not found');

            if(data.amount > flight.limit) throw new Error('Not enough tickets available');

            const ticket = await createTicket({...data, user_id: id, status: 'ativo'});

            await updateFlight(flight.id, { limit: flight.limit - ticket.amount })

            const total_price = Number(ticket.amount) * Number(ticket.price_ticket);

            const final_value = data.child_amount && data.child_amount > 0 ? handleChild(data.child_amount, total_price) : 0;

            return { ticket_id: ticket.id, total: final_value }


        }catch(e){
            throw e;
        }
    }

    const handleChild = (child_amount, total_price) => {
        const calc = (total_price * 0.3) * child_amount
        return calc;
    }

    const updateOne = async(id) => {
        try{
            const ticket = await findOne({id});
            if(!ticket) throw new Error('Ticket not found');
            const result = await updateTicket(id);

            const flight = await listOne({id: ticket.flight_id});
            await updateFlight(ticket.flight_id, { limit: flight.limit + ticket.amount })

            return result;
        }catch(e){
            throw e;
        }
    }

    return { createOne, updateOne }
}