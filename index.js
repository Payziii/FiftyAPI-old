const fastify = require('fastify')();
const { connect } = require('mongoose');
const config = require('./config.json');
const GuessManager = require('./main/guess.js');
const QuizManager = require('./main/quiz.js');

connect(
	config.mongo
);

fastify.get('/', async (request, reply) => {
  return { developer: config.dev, version: config.version, docs: config.docs };
});

fastify.get('/v1/guess/:type', async (request, reply) => {
  return GuessManager.guess(request.params.type)
});

fastify.get('/v1/quiz', async (request, reply) => {
  return QuizManager.quiz(request.query.category, request.query.multiple, request.query.difficulty)
});

fastify.post('/v1/newQuiz', async (request, reply) => {
  return QuizManager.create(request.body.key, request.body.category, request.body.multiple, request.body.difficulty, request.body.question, request.body.correct_answer, request.body.incorrect_answers)
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Сервер прослушивает ${address}`);
});