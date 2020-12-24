module.exports = (app) => {
    const {
        create,
        deleteUser,
        findUser,
        update,
        userTickets,
        createAdmin
    } = app.controller.userController;

    const { authenticateToken, authenticateAdmin } = app.middleware.authMiddleware;

    app.post("/user", create);
    app.post("/admin/user", authenticateToken, authenticateAdmin, createAdmin);
    app.get("/user", authenticateToken, findUser);
    app.get("/user/tickets", authenticateToken, userTickets);
    app.delete("/user", authenticateToken, deleteUser);
    app.put("/user", authenticateToken, update);
};
