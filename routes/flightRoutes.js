module.exports = (app) => {
    const { create, list, update, remove } = app.controller.flightController

    const {
        authenticateToken,
        authenticateAdmin,
    } = app.middleware.authMiddleware

    app.post('/flight', authenticateToken, authenticateAdmin, create)
    app.get('/flight', authenticateToken, list)
    app.put('/flight/:id', authenticateToken, authenticateAdmin, update)
    app.delete('/flight/:id', authenticateToken, authenticateAdmin, remove)
}
