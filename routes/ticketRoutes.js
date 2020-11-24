module.exports = app => {

    const { create, update } = app.controller.ticketController;

    const { authenticateToken } = app.middleware.authMiddleware;

    app.post('/ticket', authenticateToken, create);
    app.put('/ticket/cancel/:id', authenticateToken, update);
}