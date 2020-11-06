module.exports = app => {
    const { create } = app.controller.userController;

    app.post('/user', create);
}