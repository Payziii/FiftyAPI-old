const { Schema, model } = require('mongoose');

const quiz = Schema({
    author: { type: String },
    history: { type: Array },
    publish: { type: Boolean, default: true },
    category: { type: Number },
    multiple: { type: Boolean, default: true },
    difficulty: { type: Number },
    question: { type: String },
    correct_answer: { type: String },
    incorrect_answers: { type: Array }
});

module.exports = model('Quiz', quiz);