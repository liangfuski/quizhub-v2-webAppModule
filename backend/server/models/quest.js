
let mongoose = require('mongoose');


// Define the schema for the customers collection
let questSchema = new mongoose.Schema({
    quizId: mongoose.ObjectId,       //  _id of corresponding quiz    (commited out by Fu owing to webpack issue)
    prompt: String,          //  e.g What is your name
    options: [String],         //  e.g ["Peter","John","Bjork","Tom"] 
    answer: Number,
}, {
  collection: 'Question',
});


module.exports = mongoose.model('Questions', questSchema);