function addImg() {
  //prevents default action on form
  event.preventDefault();

  // variables to hold document object values
  const imgName = document.getElementById("imgname");
  const imgUrl = document.getElementById("imgurl");
  let oldImages = JSON.parse(localStorage.getItem("imagesArray")) || [];
  // regex to check for a valid url
  if (
    imgUrl.value.match(
      /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    ) &&
    imgName
  ) {
    //create variable containing information submitted by the user
    let newImage = {
      name: imgName.value,
      url: imgUrl.value
    };
    //unshift new entries so they appear at the top of the page
    oldImages.unshift(newImage);

    //set local storage to the new array including the submitted image
    localStorage.setItem("imagesArray", JSON.stringify(oldImages));
    //clear both input fields for asthetics
    imgName.value = null;
    imgUrl.value = null;
    //call function to update html to include the new entry
    updateImages();
  } else {
    // alert if the description box is empty or the url is invalid, these will need changing
    //to small warning boxes on the entry elements
    alert("please give a description and a valid url");
  }
}
//function for manipulating the DOM
function updateImages() {
  // variable to hold parsed saved images from local storage
  let imageBank = JSON.parse(localStorage.getItem("imagesArray")) || [];
  let htmlHolder = "";
  for (let i = 0; i < imageBank.length; i++) {
    
    htmlHolder += ` <div class="card">
        
    <div class="card-img" style="background-image: url('${imageBank[i].url}');">
      </div>
    <div class="card-text">${imageBank[i].name}
    <a onClick="deleteImg('${imageBank[i].url}')"><i class="far fa-times-circle"></i></a>
      </div>
      </div>`
    
    
  }
  //ending portion of the html to close the last card group
  
  document.getElementById("results").innerHTML = htmlHolder;
}
//function which takes the url provided by the function call and matches it against entries the imagebank
//once a match is found the entry is removed via a splice()
function deleteImg(image) {
  let imageBank = JSON.parse(localStorage.getItem("imagesArray")) || [];
  console.log(image);
  for (let i = 0; i < imageBank.length; i++) {
    console.log(image);
    if (`${imageBank[i].url}` == image) {
      imageBank.splice(i, 1);
    }
    localStorage.setItem("imagesArray", JSON.stringify(imageBank));
    updateImages();
  }
}
window.onload= function(){
  updateImages()
}


