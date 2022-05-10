const token = require('../../models/token')
const Token = token
const Quetions = require('../../models/questions')
const _ = require('lodash');
var mongoose = require('mongoose');

// Create and Save a new Customer
exports.createOrFindOne = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Customer

  console.log("body",req.body.tokenInfo)
  Token.findOne({ walletAddr: req.body.walletAddr })
    .then(async(data) => {
      console.log("data",data)
      if (data) res.send(data)    //when succeed to find out that this user wallet address already exist, return data.
      else {                      // when empty user wallet info, create new one.
        const count = await Token.count({});
        console.error("data is null")
        console.log("spaceship-"+(count+1))
        const customer = new Token({
          email: req.body.email,
          walletAddr: req.body.walletAddr,
          tokenInfo: req.body.tokenInfo ? req.body.tokenInfo : [],
          tokenCount: req.body.tokenCount,
          defaultTokenAddress: req.body.defaultTokenAddress,
          url: "spaceship-"+(count+1)
          // url: req.body.url
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

exports.getVotes = async(req, res) => {
  console.log("getVotes");
  const quests = await Quetions.find({}, "answerVal");
  const list = [];
  _.each(quests, i=>{
    _.each(i.answerVal, val=>{
      const tmp = {id: val._id, votes: 0}
      list.push(tmp);
    })
  })
  const answer = await Token.find({"answer.0": { "$exists" : true }, "tokenInfo.0": {"$exists" : true}}, "answer tokenInfo" );
  _.each(answer, i=>{
    const nfts = i.tokenInfo.length;
    _.each(i.answer, each=>{
      
      _.each(each.values, val=>{
        let index = _.findIndex(list, {id: mongoose.Types.ObjectId(val)});
        if(index === -1) return;
        list[index]["votes"] += nfts;
      })
      // voteObj.votes += nfts;
    })
  })
  // console.log("----answer----",answer);
  console.log("++++++VoteList+++++++", req.answer);
  // _.set(req.answer, "voteList", list);
  res.status(200).send({answers: req.answer, voteList: list});
}

exports.updateAnswer = (req, res, next) => {
  console.log("updateAnswer", req.body)
  Token.findOneAndUpdate({walletAddr: req.body.walletAddr}, {answer: req.body.answer},{new: true, upsert: true}).then(data=>{
    console.log("res",data)
    // res.status(200).send(data);
    // this.getVotes();
    req.answer = data;
    next();
  }).catch(
    e=>{
      console.log(e)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

exports.getAnswerByWalletAddr = (req, res, next) => {
  console.log("getAnswerByWalletAddr", req.params.id)
  Token.findOne({walletAddr: req.params.id}).then(data=>{
    console.log("res",data)
    // res.status(200).send(data)
    req.answer = data;
    next();
  }).catch(e=>{
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the Tutorial.',
    })
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
