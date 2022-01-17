module.exports = (app) => {
  const quetions = require('../app/controllers/questions.controller.js')
  app.get('/questions', quetions.findAll)
  app.delete('/questions/:id', quetions.delete)
  app.post('/questions', quetions.create)
  app.put('/questions/:id', quetions.update)
}
