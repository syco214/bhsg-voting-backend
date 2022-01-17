const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    
    const app = express();
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to bezkoder application." });
    });

    require("./routes/customer.routes.js")(app);
    require("./routes/questions.routes.js")(app);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }).catch((e)=>{
    console.log(e)
    process.exit(0);
  });


// simple route



// set port, listen for requests
