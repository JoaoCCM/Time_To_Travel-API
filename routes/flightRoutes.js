module.exports = (app) => {
    const { create, list, update, remove, listAvailable } = app.controller.flightController

    const {
        authenticateToken,
        authenticateAdmin,
    } = app.middleware.authMiddleware

    app.post('/flight', authenticateToken, authenticateAdmin, create)
    app.get('/flight', list)
    app.get('/flight/available', listAvailable)
    app.put('/flight/:id', authenticateToken, authenticateAdmin, update)
    app.delete('/flight/:id', authenticateToken, authenticateAdmin, remove)
}
