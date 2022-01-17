const token = require('../../models/token')
const Token = token

// Create and Save a new Customer
exports.createOrFindOne = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Customer

  console.log("body",req.body.walletAddr)
  Token.findOne({ walletAddr: req.body.walletAddr })
    .then(async(data) => {
      console.log("data",data)
      if (data) res.send(data)    //when succeed to find out that this user wallet address already exist, return data.
      else {                      // when empty user wallet info, create new one.
        const count = await Token.count({});
        console.error("data is null")
        console.log("bountyhunter-"+(count+1))
        const customer = new Token({
          email: req.body.email,
          walletAddr: req.body.walletAddr,
          tokenInfo: req.body.tokenInfo ? JSON.parse(req.body.tokenInfo) : [],
          tokenCount: req.body.tokenCount,
          defaultTokenAddress: req.body.defaultTokenAddress,
          // url: "bountyhunter-"+(count+1)
          url: req.body.url
        })
        console.warn(customer);
        Token.create(customer)
          .then((data) => {
            console.warn("created successfully",data)
            res.send(data)
          })
          .catch((err) =>
            {
              console.log('create fail', err)
              res.status(500).send({
                  message: err || 'Some error occureed while creating the data',
              })
            }
          )
      }
    })
    .catch((e) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

exports.updateAnswer = (req, res) => {
  console.log("updateAnswer", req.body)
  Token.findOneAndUpdate({walletAddr: req.body.walletAddr}, {answer: req.body.answer},{new: true, upsert: true}).then(data=>{
    console.log("res",data)
    res.status(200)
  }).catch(
    e=>{
      console.log(e)
      res.status(500)
    })
}

exports.getAnswerByWalletAddr = (req, res) => {
  console.log("getAnswerByWalletAddr", req.params.id)
  Token.findOne({walletAddr: req.params.id}).then(data=>{
    console.log("res",data)
    res.send(data.answer)
  })
}

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const offset = req.query.offset || 0
  const limit = req.query.limit || 10
  Token.find({})
    .sort({ tokenCount: -1 })
    .skip(offset)
    .limit(limit)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      })
    })
}
// Find a single Customer with a customerId
exports.findById = (req, res) => {
  Token.findOne({ where: { email: req.params.email } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving by email.',
      })
    })
}

exports.findByUrl = (req, res) => {
  console.warn("FindByUrl  ---params---", req.params.url)
  Token.findOne({ url: req.params.url })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving by tokenAddress.',
      })
    })
}

exports.delete = (req, res) => {
  // Token.destroy({where:{email: req.params.email}})
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Could not delete Customer."
  //     });
  // });
}
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  console.log('deletAll')
  Token.remove({})
    .then((data) => {
      res.sendStatus(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Could not delete Customer.',
      })
    })
}
