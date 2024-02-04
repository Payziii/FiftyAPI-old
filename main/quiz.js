const Quiz = require('../src/database/quiz.js');
const items = require('../src/quiz/items.js');
const { error } = require('./error.js');
const config = require('../config.json');
const getRandomElements = require('./functions.js');

class QuizManager {

    static async quiz(category, multiple, difficulty) {
        category = category ? category : Math.floor(Math.random() * items.cat.length);
        multiple = multiple ? multiple==="true" : true/*items.multiple[Math.floor(Math.random() * items.multiple.length)]*/;
        difficulty = difficulty ? difficulty : Math.floor(Math.random() * items.diff.length);

        if(!items.cat[category] || !items.diff[difficulty]) return error(404, `Категория или сложность не найдены!`)
        if(typeof(multiple) != 'boolean') return error(400, `multiple может принимать только булевые значения!`)

        let quizes = await Quiz.find({ category: category, multiple: multiple, difficulty: difficulty })
        if(quizes.length < 1) return error(404, `Вопросов по данному запросу не найдено!`)
        return getRandomElements(quizes, 1)
    }

    static async create(key, category, multiple, difficulty, question, correct_answer, incorrect_answers)  {
        if(!key || key != config.key) return error(403, `Нет доступа`)
        await Quiz.create({ category, multiple, difficulty, question, correct_answer, incorrect_answers }).then(async (data) => {
            return data;
        });
    }
}

module.exports = QuizManager