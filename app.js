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


async function selectBreed() {
  const dropDownResults = await $.ajax(
    `https://api.TheDogAPI.com/v1/breeds`
  ).catch((e) => console.log(e));
  
  for(let i=0; i < dropDownResults.length; i++){
      const dogID = dropDownResults[i].id
      $("#inputGroupSelect02").append(`<option id=${dogID} value=${dogID}>${dropDownResults[i].name}</option>`)
  }
   

    $("#selectDogButton").on('click', async() => {
     const input = $("#inputGroupSelect02").val();
     const dogImage = await getDogs(input);
     console.log(dogImage);
        $("#dogArea").children().remove();
        dogImage.forEach((dog) => {
            $("#dogArea").children().remove();
            $("#doglist").children().remove();
            $("#dogArea").append(`<img src="${dog.url}">`);
            $("#doglist").append(`<li>${dog.breeds[0].name}</li>
            <li>${dog.breeds[0].life_span}</li>
            <li>${dog.breeds[0].temperament}</li>
            <li>${dog.breeds[0].weight.metric}</li>
            `)
        })
    })
  return dropDownResults;
    }



$(() => {
    selectBreed();

  $("#jumbobutton").on("click", async () => {
    const dogImage = await getDogs();
    $("#dogArea").children().remove();
    $("#doglist").children().remove();

    dogImage.forEach((dog) => {
      $("#dogArea").append(`<img src="${dog.url}">`);
      $("#doglist").append(`<li>${dog.breeds[0].name}</li>
      <li>${dog.breeds[0].life_span}</li>
      <li>${dog.breeds[0].temperament}</li>
      <li>${dog.breeds[0].weight.metric}</li>
      `)
    });
  });

//   $("#searchButton").on("click", async () => {
//     const dogSearch = $("#searchDogs").val();
//     const dogImage = await getDogs(dogSearch);
//     $("#dogArea").children().remove();
//     dogImage.forEach((dog) => {
//       $("#dogArea").children().remove();
//       $("#dogArea").append(`<img src="${dog.url}">`);
//     });
//   });


  

  const quizContainer = $("#quiz");
  const resultsContainer = $("results");
  const submitButton = $("submit");
});
