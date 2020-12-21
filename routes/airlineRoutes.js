module.exports = (app) => {
    const {
        create,
        listAll,
        update,
        listOne,
        listAirlineByName
    } = app.controller.airlineController

    const {
        authenticateToken,
        authenticateAdmin,
    } = app.middleware.authMiddleware

    app.post('/airline', authenticateToken, authenticateAdmin, create)
    app.get('/airlines', authenticateToken, authenticateAdmin, listAll)
    app.get('/airline/name', listAirlineByName)
    app.put('/airline/:id', authenticateToken, authenticateAdmin, update)
    app.get('/airline/:id', authenticateToken, authenticateAdmin, listOne)
}
