const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const articleController = require("./controllers/articleController");
const { sequelize: orm } = require("./models");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", userController.index);
app.get("/users/:id", userController.show);
app.post("/users", userController.create);
app.put("/users/:id", userController.update);
app.delete("/users/:id", userController.delete);

// Article routes
app.get("/articles", articleController.index);
app.get("/articles/:id", articleController.show);
app.post("/articles", articleController.create);
app.put("/articles/:id", articleController.update);
app.delete("/articles/:id", articleController.delete);

async function start() {
  try {
    await orm.authenticate();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
