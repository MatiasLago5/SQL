const express = require("express");
const sequelize = require("./db");
const app = express();
const userController = require("./controllers/userController");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", userController.index);
app.get("/users/:id", userController.show);
app.post("/users", userController.create);
app.put("/users/:id", userController.update);
app.delete("/users/:id", userController.delete);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
