module.exports = app => {
    const customers = require("../app/controllers/customer.controller.js");
    app.get("/nftlist", customers.findAll);
    app.get("/nftlist/:url", customers.findByUrl);
    app.delete("/nftlist", customers.deleteAll);
    app.delete("/customers/:customerId", customers.delete);
    // app.put("/customers/:customerId", customers.update);
    app.post("/nftlist", customers.createOrFindOne);
    app.post("/answer", customers.updateAnswer)
    app.get("/answer/:id", customers.getAnswerByWalletAddr)
  };