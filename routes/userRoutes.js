module.exports = (app) => {
    const {
        create,
        deleteUser,
        findUser,
        update,
    } = app.controller.userController;

    app.post("/user", create);
    app.get("/user/:id", findUser);
    app.delete("/user/:id", deleteUser);
    app.put("/user/:id", update);
};
