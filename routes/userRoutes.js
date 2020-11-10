module.exports = (app) => {
    const {
        create,
        deleteUser,
        findUser,
        update,
    } = app.controller.userController;

    const { authenticateToken } = app.middleware.authMiddleware;

    app.post("/user", create);
    app.get("/user", authenticateToken, findUser);
    app.delete("/user/:id", deleteUser);
    app.put("/user/:id", update);
};
