const User = require("./models/User");

module.exports = {
  async index(req, res) {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  },
  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  },
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res
        .status(201)
        .json({
          id: user.id,
          name: user.name,
          last_name: user.last_name,
          age: user.age,
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update(req.body);
      res.json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).send();
  },
};
