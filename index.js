const fastify = require('fastify')();
const config = require('./config.json');
const GuessManager = require('./main/guess.js');

fastify.get('/', async (request, reply) => {
  return { message: config.version };
});

fastify.get('/v1/guess/:type', async (request, reply) => {
  return GuessManager.guess(request.params.type)
});

fastify.get('/v1/quiz', async (request, reply) => {
  return "Coming soon"
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Сервер прослушивает ${address}`);
});