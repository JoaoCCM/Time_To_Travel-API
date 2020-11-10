const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  const { findUser } = app.repository.userRepository;
  const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Missing info" });

      const user = await findUser({ email });
      if (!user) return res.status(500).json({ message: "User not found" });

      bcrypt.compare(password, user.password, (err, match) => {
        if (err || !match) return res.status(500).json({ message: "Wrong info" });

        const user_type = user.is_admin == 0 ? "regular" : "admin";

        const payload = { id: user.id, type: user_type };

        const token = jwt.sign({ payload }, secret);

        const data = { name: user.name, email: user.email, token };

        return res.status(200).json(data);
      });
    } catch (e) {
      throw e;
    }
  };

  return { signIn };
};
