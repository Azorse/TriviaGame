$(document).ready(function () {
  const trivia = [
    {
      question: "A martini becomes a Gibson simply by adding this to it?", 
      choice: ["Olive", "Lime", "Onion", "Cherry"],
      answer: 2,
      photo: "assets/images/gibson.jpg"
    },
    {
      question: "Which country invented the juniper flavored spirit Gin?", 
      choice: ["England", "France", "Belgium", "Netherlands"],
      answer: 3,
      photo: "assets/images/Juniper-Berry.jpg"
    }, 
    {
      question: "Rye whiskey contains at least 51% rye, what is another ingredient?", 
      choice: ["Wheat", "Barley", "Rice", "Oats" ],
      answer: 1,
      photo: "assets/images/grain_malt.jpg"
    }, 
    {
      question: "Who's mother invented the Manhattan cocktail?", 
      choice: ["Winston Churchill", "Ernest Hemingway", "Mark Twain", "Humphrey Bogart" ],
      answer: 0,
      photo: "assets/images/manhattan.jpg"
    }, 
    {
      question: "What was the profession of the person who first made Bourbon?", 
      choice: ["Distiller", "Judge", "Minister", "Teacher" ],
      answer: 2,
      photo: "assets/images/bourbon.jpg"
    }, 
    {
      question: "What is the offical distilled spirit of the United States?", 
      choice: ["Rye", "Brandy", "Bourbon", "There is none" ],
      answer: 2,
      photo: "assets/images/usa-drink.jpg"
    }, 
    {
      question: "Distilled spirits don’t contain any of the following except?", 
      choice: ["Gluten", "Carbohydrates", "Fats", "Sugars" ],
      answer: 3,
      photo: "assets/images/sugar.jpg"
    }, 
      {
      question: "What drink was so popular that it was called the 'Coca-cola' of it's time?", 
      choice: ["Gimlet", "Martini", "Daiquiri", "Mint Julep" ],
      answer: 3,
      photo: "assets/images/mint-julep.jpg"
    }, 
    {
      question: "Early colonists loved their rum. About how many gallons did they consume annually?", 
      choice: ["130,000", "650,000", "3 million", "12 million" ],
      answer: 0,
      photo: "assets/images/rum.jpg"
    }
  ]
  var currentQuestion = 0
  var answeredCorrect = 0;
  var answeredIncorrect = 0;
  var unanswered = 0;
  var timer = 15;
  var intervalId;
  var userGuess ="";
  var running = false;

  $("#restart").hide()
  $('#game-button').on('click', function(){
    $(this).hide();
    newGame();
  })

  function newGame(){
    $('#thanks').empty();
    $('#ans-correct').empty();
    $('#ans-incorrect').empty();
    $('#ans-unanswered').empty();
    currentQuestion = 0;
    answeredCorrect = 0;
    answeredIncorrect = 0;
    unanswered = 0;
    newQuestion();
  }

  function newQuestion(){
    $('#questions').empty();
    $('#choices').empty();
    $('#result').empty();
    answered = true;

    // $('#questions').html(`Question ${currentQuestion + 1}`);
    $('#questions').html('<h2>' + trivia[currentQuestion].question + '</h2>');
    for(let i = 0; i < 4; i++){
      let choices = $('<div>');
      choices.text(trivia[currentQuestion].choice[i]);
      choices.attr({'data-index': i });
      choices.addClass('thisChoice');
      $('#choices').append(choices);
    }
    runTimer();
    $('.thisChoice').on('click',function(){
      userGuess = $(this).data('index');
      if (userGuess === trivia[currentQuestion].answer) {
        stopTimer();
        answeredCorrect++;
        userGuess="";
        $("#questions").html("<p>Correct!</p>");
        showImage();

      } else {
        stopTimer();
        answeredIncorrect++;
        userGuess="";
        $("#questions").html(`<p>Sorry! The correct answer is: ${trivia[currentQuestion].choice[trivia[currentQuestion].answer]}</p>`);
        showImage();
      }
    });
  }


  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000); 
      running = true;
    }
  }

  function decrement() {
    $("#countdown").html(`Time remaining: ${timer}`);
    timer --;

    if (timer === 0) {
      unanswered++;
      stopTimer();
      $("#questions").html(`<p>Time is up! The correct answer is: ${trivia[currentQuestion].choice[trivia[currentQuestion].answer]}</p>`);
      showImage();
    }	
  }

  function stopTimer() {
    running = false;
    clearInterval(intervalId);
  }

  function showImage () {
    $("#choices").append(`<img src="${trivia[currentQuestion].photo}" max-width="600" >`);
    currentQuestion++;
    var hidpic = setTimeout(function() {
      $("#results").empty();
      timer= 15;

      if (currentQuestion >= 9) {
        $("#questions").empty();
        $("#choices").empty();
        $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#choices").append("<h4> Correct: " + answeredCorrect + "</h4>" );
        $("#choices").append("<h4> Incorrect: " + answeredIncorrect + "</h4>" );
        $("#choices").append("<h4> Unanswered: " + unanswered + "</h4>" );
        $("#restart").show();
        answeredCorrect = 0;
        answeredIncorrect = 0;
        unanswered = 0;

      } else {
        nextQuestion();

      }
    }, 2000);


  }

  function nextQuestion() {
    runTimer();
    newQuestion();
  }


  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#questions").empty();
    $("#choices").empty();
    $("results").empty();
  
    nextQuestion();

  })
})