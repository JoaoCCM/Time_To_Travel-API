module.exports = (app) => {
  const { signIn } = app.service.auth;

  app.post("/signin", signIn);
};
