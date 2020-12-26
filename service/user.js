const bcrypt = require("bcrypt");
const moment = require('moment');

module.exports = (app) => {
    const {
        createUser,
        findUser,
        updateUser,
        deleteUser,
        userTickets
    } = app.repository.userRepository;

    const { listOne } = app.repository.flightRepository;

    const genHash = async (password) => {
        const hash = await bcrypt.hash(password, 10);
        const newPass = hash;
        return newPass;
    };

    const createOne = async (data) => {
        try {
            const email = await findUser({ email: data.email });
            if (email) throw new Error("Email already registered.");

            const cpf = await findUser({ cpf: data.cpf });
            if (cpf) throw new Error("CPF already in use.");

            const passwordHashed = await genHash(data.password);

            const result = await createUser({
                ...data,
                password: passwordHashed,
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    const deleteOne = async (id) => {
        try {
            const result = await deleteUser(id);
            if (!result) throw new Error("User not found");
            return result;
        } catch (e) {
            throw e;
        }
    };

    const updateOne = async (id, data) => {
        try {
            const result = await updateUser(id, data);
            const passwordHashed = await genHash(data.password);
            if (!result) throw new Error("User not found");
            return { ...result, password: passwordHashed };
        } catch (e) {
            throw e;
        }
    };

    const findOne = async (id) => {
        try {
            const result = await findUser({ id }, [
                "id",
                "name",
                "email",
                "cpf",
            ]);
            if (!result) throw new Error("User not found");
            return result;
        } catch (e) {
            throw e;
        }
    };

    const allTicketsOfUser = async (id) => {
        try{
            const result = await userTickets(id);
            const data = await Promise.all(result.map(async m => {
                const flight = await listOne({id: m.id});
                
                let total_price = Number(m.amount_ticket) * Number(flight.ticket_price);

                let final_value = m.child_amount && m.child_amount > 0 ? handleChild(m.child_amount, total_price) : total_price;
              
                const newDate = moment(m.ship_date).format('DD/MM/YYYY')
                const newTime = moment(m.ship_time, 'HH:mm:ss').format('HH:mm')

                return { ...m, ship_date: newDate, ship_time: newTime, total_paid: final_value };
            }))
            return data;
        }catch(e){
            throw e;
        }
    }

    const handleChild = (child_amount, total_price) => {
        const descount = (total_price * 0.3) * child_amount;
        const calc = total_price - descount;
        return calc;
    }


    return { createOne, deleteOne, updateOne, findOne, allTicketsOfUser };
};
