$(document).ready(function() {
    // $("#countdown").hide();
    // $("#question").hide();
    // $("#choices").hide();
    // $("#result").hide();
    // $("#thanks").hide();
    // $("#ans-correct").hide();
    // $("#ans-incorrect").hide();
    // $("#ans-missed").hide();
    // $("#ans-incorrect").hide();
    // $("#restart").hide();
    beginGame()
    timeRemaining()
    populate()
    
    // checkGuess()

});
var intervalID;

var triviaGame = {
    correct: 0,
    incorrect: 0,
    unanswered:0,
    currentQuestion: 0,
    timer: 120,
    questionbank: { 
        1: 'What does Vodka translate to in its native language?',
        2: 'What is the primary flavor of Gin?',
        3: 'Which of the following is not a grain used in Whiskey?',
        4: 'How many years does Bourbon have to be aged to be called Bourbon?',
        5: 'Tradional Scotch Whisky only has two ingredients. Water and what else?',
        6: 'Brandy is a spirit made from which ingredient?',
        7: 'Did you learn something new?'

    },
    answerBank: {
        1: ['Beer', 'Alcohol', 'Water', 'Wine'],
        2: ['Grain', 'Juniper', 'Genever', 'Corriander'],
        3: ['Barley', 'Oat', 'Corn', 'Rye'],
        4: ['1 year', '2 years', '3 years', '4 years'],
        5: ['Barley', 'Oat', 'Corn', 'Rye'],
        6: ['Grains', 'Rice', 'Grapes', 'Happiness'],
        7: ['Yes', 'No'],

    },
    correctAns: {
        1: 'Water',
        2: 'Juniper', 
        3: 'Oat', 
        4: '3 years', 
        5: 'Barley', 
        6: 'Grapes', 
        7: 'Yes', 

    }
}
function beginGame() {
    triviaGame.correct = 0;
    triviaGame.incorrect = 0;
    triviaGame.unanswered = 0;
    triviaGame.timer = 120;
    
    clearInterval(intervalID);
    intervalID = setInterval(countdown, 1000)
    
    $('#game-button').hide();
    $('#restart').hide();
    $("#countdown").show();
    $("#question").show();
    $("#choices").show();
    $("#result").show();
}

function timeRemaining() {
    clearInterval(intervalID);
    intervalID = setInterval(countdown, 1000)
    triviaGame.timer--
    $('#countdown').text(`Time remaining: ${triviaGame.timer}`);
    if(triviaGame.timer === 0) {
        $('#question').text('Out of time!');
        endGame();
      }
}

function populate() {

    //was trying to follow this guide https://dev.to/attacomsian/object-entries-and-object-values-methods-in-javascript-3l8c

    var question = Object.values(triviaGame.questionbank)[triviaGame.currentQuestion];
    var choices = Object.values(triviaGame.answerBank)[triviaGame.currentQuestion];
    $('#question').text(question);
    
    $.each(choices, function(index, value){
      $('#choices').append($(`<button class="btn btn-secondary">${value}</button>`));
    })
    

}


function checkGuess() {
    var currentAnswer = Object.values(triviaGame.correctAns)[triviaGame.currentQuestion];
    
    if($(this).text() === currentAnswer){
        triviaGame.correct++;
    }else{
        triviaGame.incorrect++;
    }
    
  }

function endGame() {
    if(triviaGame.currentQuestion === 7 || triviaGame.timer ===0 ) {
        $('.main-body').hide();
        $('#thanks').text(`Thanks for playing!`)
        $('#ans-correct').text(`Correct: ${triviaGame.correct}`)
        $('#ans-incorrect').text(`Incorrect: ${triviaGame.incorrect}`)
        $('#ans-missed').text(`Unaswered: ${triviaGame.unanswered}`)
        $('#restart').show();
    }
};

// $('#game-button').on('click', function() {



// });


