const { Router } = require("express");
const pizza = require("../models/Pizza");
const router = Router();
router.route("/").get((request, response) => {
  // handle GET request
  response.send(JSON.stringify({ message: "All pizzas" }));
});
router.post("/", (request, response) => {
  const newPizza = new pizza.model(request.body);
  newPizza.save((err, pizza) => {
    return err ? response.sendStatus(500).json(err) : response.json(pizza);
  });
});
module.exports = router;
