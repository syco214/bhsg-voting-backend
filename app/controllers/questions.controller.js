const Quetions = require('../../models/questions')
// const Token = require('../../models/token')
// const _ = require('lodash');

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  console.log('body', req.body)
  const question = new Quetions(req.body)
  Quetions
    .create(question)
    .then(async (data) => {
        console.log(data)
      res.send(data)
    })
    .catch((e) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

exports.update = (req, res) => {
    console.log("-----update-----", req.body, req.params.id)
    Quetions
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      console.log('----update question----', data)
      res.send(data)
    })
    .catch((e) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Quetions
    .find({})
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

exports.delete = (req, res) => {
    console.log("-----dele-----", req.params.id)
    const ques = Quetions.deleteOne({_id: req.params.id})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Could not delete Customer.',
      })
    })
}

// exports.updateAnswerVotes = async(req, res) => {
//   console.log("updateAnswerVotes");
//   for(const answer of req.body.answer) {
//     const doc = await Quetions.findById(answer.questionId);
//     console.log("------doc------------",doc);
//     _.each(doc.answerVal, i=>{
//       console.log(answer.values, doc.title)
//       if(doc.title === i.title)
//       if(doc.title in answer.values) {
//         if(req.body.walletAddr in i.votes){
//           i.votes.push(req.body.walletAddr);
//           console.log("\tinsert new votes address");
//         }
//       } else {
//         _.pull(i.votes, req.body.walletAddr);
//         console.log("\tremove new votes address");
//       }
//     })
//     doc.save();
//     console.log("=========== end save ==============", answer.questionId)
//   }

//   res.send(req.answer);
// }
