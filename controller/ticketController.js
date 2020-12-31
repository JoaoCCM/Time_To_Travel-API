module.exports = app => {

    const { createOne, updateOne } = app.service.ticket;

    const create = async (req, res) => {
        try{
            const { id } = req.user.payload;
            const result = await createOne(id, req.body);
            return res.status(200).json(result);
        }catch(e){
            const {message} = e;
            return res.status(500).json(message);
        }
    }

    const update = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await updateOne(id);
            return res.status(200).json({message: 'Canceled'});
        }catch(e){
            const {message} = e;
            return res.status(500).json(message);
        }
    }

    return { create, update }
}