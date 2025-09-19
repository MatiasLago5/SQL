const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const articleController = require("./controllers/articleController");
const { sequelize: orm } = require("./models");
const { requireRole, articleOwnerOrAdmin } = require("./middleware/authz");
const { Article } = require("./models");

app.use(express.json());

// User routes
app.get("/users", userController.index);
app.get("/users/:id", userController.show);
app.post("/users", userController.create);
app.put("/users/:id", userController.update);
app.delete("/users/:id", userController.delete);

// Article routes
app.get("/articles", articleController.index);
app.get("/articles/:id", articleController.show);
app.post("/articles", requireRole("admin"), articleController.create);
app.put("/articles/:id", articleOwnerOrAdmin(Article), articleController.update);
app.delete("/articles/:id", articleOwnerOrAdmin(Article), articleController.delete);

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
