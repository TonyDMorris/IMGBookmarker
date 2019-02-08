function addImg() {
    
//prevents default action on form
    event.preventDefault()


// variables to hold document object values
    const imgName = document.getElementById("imgname");
    const imgUrl = document.getElementById("imgurl");
    let oldImages = JSON.parse(localStorage.getItem('imagesArray')) || [];
// regex to check for a valid url
    if (imgUrl.value.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi) && imgName) {
//create variable containing information submitted by the user
        let newImage = {
            "name": imgName.value,
            "url": imgUrl.value
        };
        //unshift new entries so they appear at the top of the page 
        oldImages.unshift(newImage)

        //set local storage to the new array including the submitted image
        localStorage.setItem('imagesArray', JSON.stringify(oldImages))
        //clear both input fields for asthetics
        imgName.value = null;
        imgUrl.value = null;
        //call function to update html to include the new entry
        updateImages();
    } else {
        // alert if the description box is empty or the url is invalid, these will need changing
        //to small warning boxes on the entry elements
        alert("please give a description and a valid url")
    }
}
//function for manipulating the DOM
function updateImages() {
    
    // variable to hold parsed saved images from local storage
    let imageBank = JSON.parse(localStorage.getItem('imagesArray')) || [];
    //variable to hold the html, i tried adding the html directly to the DOM but chrome autocorrects syntactically incorrect
    // because of the nature of the upcoming forloop this causes the content to be displayed incorrectly
    //so this variable stores all the html produced by the forloop and then the dom element is assigned to it upon completion
    let htmlHolder;
//creates a card group at the beginning
    htmlHolder = `<div class="card-group">`;
    // declared a variable which will dictate the number of columns the content should be displayed over
    //initial variable is set to -1 as this allows the first loop in the forloop to produce the correct html
    let columnCount = -1;
    //forloop to iterate through each entry in local storage
    for (let i = 0; i < imageBank.length; i++) {
        //increment columnCount
        columnCount++
//adds a template sring to the variable containing all the required info to produce 
//a bootsrtap card displaying the submitted image and description
        let htmlLayout = `</div><div class="card-group"><a target="_blank" rel="noopener noreferrer" href="${imageBank[i].url}"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
          <button type="button" onclick="deleteImg('${imageBank[i].url}')" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
        </div>
      </div>`;
//if the coulmnCount variable reaches 3, 3 being the desired number of coulmns it adds the full template string to htmlHolder
//this closes the preceeding card-group and opens a new one creating a new row
// the number specified in this if statement is the number of columns you will get
        if (columnCount == 3) {
            columnCount = 0;
            htmlHolder += htmlLayout;
//slicing the variable at 30 removes the cardgroup endpoint and new cardgroup opening
//leaving only a card to be added this allows columns of cards to sit next to eachother in groups of 3
        } else {
            htmlHolder += htmlLayout.slice(30);

        }

        

    }
    //ending portion of the html to close the last card group
    htmlHolder += `</div>`
    document.getElementById("results").innerHTML = htmlHolder
}
//function which takes the url provided by the function call and matches it against entries the imagebank
//once a match is found the entry is removed via a splice()
function deleteImg(image){
    let imageBank = JSON.parse(localStorage.getItem('imagesArray')) || [];
    console.log(image)
    for(let i = 0; i < imageBank.length; i++){
        console.log(image)
        if(`${imageBank[i].url}` == image){
            imageBank.splice(i,1);
        }
        localStorage.setItem('imagesArray', JSON.stringify(imageBank));
        updateImages();
    }
}