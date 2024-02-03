const Quiz = require('../src/database/quiz.js');
const items = require('../src/quiz/items.js');
const { error } = require('./error.js');

class QuizManager {

    static async quiz(category, multiple, difficulty) {
        category = category ? category : Math.floor(Math.random() * items.cat.length);
        multiple = multiple ? multiple : items.multiple[Math.floor(Math.random() * items.multiple.length)];
        difficulty = difficulty ? difficulty : Math.floor(Math.random() * items.diff.length);

        if(!items.cat[category] || !items.diff[difficulty]) return error(404, `Категория или сложность не найдены!`)
        if(typeof(multiple) != 'boolean') return error(400, `multiple может принимать только булевые значения!`)

        let quizes = await Quiz.find({ category: category, multiple: multiple, difficulty: difficulty })
    }
}

module.exports = QuizManager