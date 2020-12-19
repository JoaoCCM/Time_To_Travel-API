module.exports = (app) => {
    const {
        create,
        deleteUser,
        findUser,
        update,
        userTickets,
    } = app.controller.userController;

    const { authenticateToken } = app.middleware.authMiddleware;

    app.post("/user", create);
    app.get("/user", authenticateToken, findUser);
    app.get("/user/tickets", authenticateToken, userTickets);
    app.delete("/user", authenticateToken, deleteUser);
    app.put("/user", authenticateToken, update);
};
