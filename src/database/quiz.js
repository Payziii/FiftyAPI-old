const { Schema, model } = require('mongoose');

const quiz = Schema({
    category: { type: Number },
    multiple: { type: Boolean, default: true },
    difficulty: { type: Number },
    question: { type: String },
    correct_answer: { type: String },
    incorrect_answers: { type: Map }
});

module.exports = model('Quiz', quiz);