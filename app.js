async function getDogs(dogSearch) {
  let dogBreed = "";
  if (dogSearch) {
    dogBreed = `&breed_id=${dogSearch}`;
  }
  const dogResponse = await $.ajax(
    `https://api.thedogapi.com/v1/images/search?api_key=bd9cabc5-cda5-4e68-ba47-e4f801536b46${dogBreed}`
  ).catch((e) => console.log(e));
  return dogResponse;
}

///append breed choices to dropdown menu
async function selectBreed() {
  const dropDownResults = await $.ajax(
    `https://api.TheDogAPI.com/v1/breeds`
  ).catch((e) => console.log(e));

  for (let i = 0; i < dropDownResults.length; i++) {
    const dogID = dropDownResults[i].id;
    $("#inputGroupSelect02").append(
      `<option id=${dogID} value=${dogID}>${dropDownResults[i].name}</option>`
    );
  }

  return dropDownResults;
}

//////function to append image/ get info

function appendDogInfo(dogImage) {
  console.log("dog image", dogImage);
  $("#dogArea").children().remove();
  $("#doglist").children().remove();

  $("#dogArea").append(`<img src="${dogImage[0].url}">`);
  if (dogImage[0].breeds[0]) {
    $("#doglist").append(`<li>Breed: ${dogImage[0].breeds[0].name}</li>
    <li>Life span: ${dogImage[0].breeds[0].life_span}</li>
    <li>Temperament: ${dogImage[0].breeds[0].temperament}</li>
    <li>Weight: ${dogImage[0].breeds[0].weight.metric} kg</li>
    `);
  } else {
    $("#doglist").append("<h2>No info</h2>");
  }
}


$(() => {
  selectBreed();

/////////////random breed
  $("#jumbobutton").on("click", async () => {
    const dogImage = await getDogs();
    appendDogInfo(dogImage);
  });

/////////////select a breed
  $("#selectDogButton").on("click", async () => {
    const input = $("#inputGroupSelect02").val();
    const dogImage = await getDogs(input);
    console.log("dog image", dogImage);

    appendDogInfo(dogImage);
});
///////QUIZ
  const myQuestions = [
    {
      question: "What is your favorite Sunday activity?",
      answers: {
        a: "Sleep in and watch Netflix all day",
        b: "Wake up at 6am, go for a 15km run, and organize everything",
        c: "Read a book and contemplate the meaning of life/ investigate unsolved crimes"
    }},
    {
      question: "What is your favorite food?",
      answers: {
        a: "Chocolate, candy, chips, anything sweet or salty",
        b: "Grilled chicken and broccoli",
        c: "Caviar"
    }},
    {
      question: "What's your hobby?",
      answers: {
        a: "Is Netflix a hobby?",
        b: "Exercising",
        c: "Studying philosophy/ other deep subjects"
    }},
    {
      question: "If you could have any career in the world, what would it be?",
      answers: {
        a: "Food taster",
        b: "Own a global gym franchise",
        c: "Detective"
    }},
      {
      question: "How would your friends describe you?",
      answers: {
        a: "Chilled out, peaceful, and easygoing",
        b: "Active, organized, and happy",
        c: "Curious, imaginative, and loyal"
      }},
      {
      question: "Where do you want travel most?",
      answers: {
        a: "Austria, for the spas",
        b: "France, so I can finally take part in Tour de France and eat croissants",
        c: "Berlin, to wander around the city and look at art"
      }},
      {
      question: "What's most important to you?",
      answers: {
        a: "World and self peace",
        b: "Pushing myself to my max potential",
        c: "Continuous learning"
      }},
      {
      question: "What's your favorite drink?",
      answers: {
        a: "Beer",
        b: "Vodka, soda, lime",
        c: "Espresso Martini"
      }
    }
  ]

  const quizContainer = $("#quiz");
  const resultsContainer =$("#results");
  const submitButton = $("#submitQuiz");
  let answers = {
    A: 0,
    B: 0,
    C: 0
  };

  function buildQuiz(questionObject){
    questionObject.map(function (quizQuestion, index){
        // $("#quiz").children().remove();
        $("#quiz").append(`<h1 id=${index}>${quizQuestion.question}</h1>`)
        $("#quiz").append(`<h2><button id="A" class="quizButtons">${quizQuestion.answers.a}</h2></button>
        <h2><button id="B" class="quizButtons">${quizQuestion.answers.b}</h2></button>
        <h2><button id="C" class="quizButtons">${quizQuestion.answers.c}</h2></button>`) 
        quizProgress()
        console.log("quiz question", quizQuestion)
    })
      $(".quizButtons").on('click', (e) =>{

    let selectedAnswer = answers[e.target.id];
      answers[selectedAnswer] += 1;

      console.log(answers);
      
      })
    }

//quiz progress function
function quizProgress(){

}

//show results

function showResults(){

}
  //display quiz

  buildQuiz(myQuestions);

  //for submit
  $("#submitQuiz").on('click', showResults);




});
