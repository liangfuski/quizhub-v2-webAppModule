let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let qNqController = require('../controllers/quizNquest');


router.get('/quiz',qNqController.displayQuiz); //return a list of quiz by criteria

router.post('/add-quiz',qNqController.processAddQuiz); // input quiz content and return a new quiz ID

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit-quiz/:id', qNqController.processEditQuiz);  // input existing quiz ID and return an updated quiz

router.get('/quiz/questions/:id',qNqController.displayQuestByQuizId); // input existing quiz ID and return a list of question under same quizId

router.post('/add-question',qNqController.processAddQuestion); // input question content and return a question ID
router.post('/edit-question/:id',qNqController.processEditQuestion); // intput a question ID return an updated question
router.post('/quiz/createAndUpdateQuestions', qNqController.processQuizQuestion);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete-question/:id', qNqController.deleteQuestion); // input a question ID and return message
router.get('/delete-quiz/:id', qNqController.deleteQuiz); // input a quiz ID and return message


// Health check endpoint
router.get('/health', (req, res) => {
    console.log("HEALTH CHECKED IS CONDUCTED")
    res.status(200).json({ status: 'OK' });
  });

module.exports = router;

/* POST Route for processing the Add page - CREATE Operation */
//router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
//router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
//router.post('/edit/:id', requireAuth, bookController.processEditPage)