module.exports = app => {
    const customers = require("../app/controllers/customer.controller.js");
    const quetions = require('../app/controllers/questions.controller.js')
    app.get("/nftlist", customers.findAll);
    app.get("/nftlist/:url", customers.findByUrl);
    app.delete("/nftlist", customers.deleteAll);
    app.delete("/customers/:customerId", customers.delete);
    // app.put("/customers/:customerId", customers.update);
    app.get("/url/:url", customers.getUrl);
    app.post("/nftlist", customers.createOrFindOne);
    app.post("/url", customers.setUrl);
    app.post("/answer", customers.updateAnswer, customers.getVotes)
    app.get("/answer/:id", customers.getAnswerByWalletAddr, customers.getVotes)
  };