async function getDogs(){
    const breweryResponse = await $.ajax(`https://api.thedogapi.com/v1/images/search`)
                                .catch(e => console.log(e));
    console.log(breweryResponse);
    return breweryResponse;

}



$(async() => {
    const dogImage = await getDogs();
    $('body').append(`<img src="${dogImage[0].url}">`)

    dogImage.forEach((dog) =>{
        $('body').append(`<img src="${dog.url}">`)

    })

})