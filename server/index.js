const express = require("express");
const pizzas = require("./routes/pizzas");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);
app.use(express.json());
app.use(logging);
app.use("/pizzas", pizzas);

app
  .route("/status")
  .get((request, response) => {
    response.status(200).json({ message: "Service healthy" });
  })
  .post((request, response) => {
    response.json({ requestBody: request.body });
  });

app.route("/users/:id").get((request, response) => {
  // express adds a "params" Object to requests
  const id = request.params.id;
  // handle GET request for post with an id of "id"
  response.send(JSON.stringify({ user_id: id }));
});

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));