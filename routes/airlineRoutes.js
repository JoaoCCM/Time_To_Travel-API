module.exports = (app) => {
    const {
        create,
        listAll,
        update,
        listOne,
    } = app.controller.airlineController

    const {
        authenticateToken,
        authenticateAdmin,
    } = app.middleware.authMiddleware

    app.post('/airline', authenticateToken, authenticateAdmin, create)
    app.get('/airlines', authenticateToken, authenticateAdmin, listAll)
    app.put('/airline/:id', authenticateToken, authenticateAdmin, update)
    app.get('/airline/:id', authenticateToken, authenticateAdmin, listOne)
}
