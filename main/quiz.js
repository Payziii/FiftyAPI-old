const Quiz = require('../src/database/quiz.js');
const Item = require('../src/database/quizItem.js');
const items = require('../src/quiz/items.js');
const { error } = require('./error.js');
const config = require('../config.json');
const getRandomElements = require('./functions.js');

class QuizManager {

    static async quiz(category, multiple, difficulty) {
        category = category ? category : Math.floor(Math.random() * items.cat.length);
        multiple = multiple ? multiple === "true" : items.multiple[Math.floor(Math.random() * items.multiple.length)];
        difficulty = difficulty ? difficulty : Math.floor(Math.random() * items.diff.length);

        if (!items.cat[category] || !items.diff[difficulty]) return error(404, `Категория или сложность не найдены!`)
        if (typeof (multiple) != 'boolean') return error(400, `multiple может принимать только булевые значения!`)

        let quizes = await Quiz.find({ category: category, multiple: multiple, difficulty: difficulty })
        if (quizes.length < 1) return error(404, `Вопросов по данному запросу не найдено!`)
        return getRandomElements(quizes, 1)
    }

    static async create(reply, key, category, multiple, difficulty, question, correct_answer, incorrect_answers) {
        if (!key || key != config.key) return error(403, `Нет доступа`)
        await Quiz.create({ category, multiple, difficulty, question, correct_answer, incorrect_answers }).then(() => {
            reply
                .code(201)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "created": true });
        }).catch(() => {
            reply
                .code(520)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "created": false });
        })
    }

    static async sendToMod(reply, req) {
        const body = req.body;
        await Item.create({ author: req.ip, category: body.category, multiple: body.multiple, difficulty: body.difficulty, question: body.question, correct_answer: body.correct_answer, incorrect_answers: body.incorrect_answers }).then(() => {
            reply
                .code(201)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "created": true });
        }).catch(() => {
            reply
                .code(520)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({ "created": false });
        })
    }

    static async list() {
        let data = await Quiz.find({});

        const categoryCounts = {};

        data.forEach(elem => {
            if (!categoryCounts[elem.category]) {
                categoryCounts[elem.category] = 1;
            } else {
                categoryCounts[elem.category]++;
            }
        });

        return { all: data.length, byCatergories: categoryCounts }
    }
}

module.exports = QuizManager