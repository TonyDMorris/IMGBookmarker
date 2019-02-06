function addImg() {
    event.preventDefault()

    const imgName = document.getElementById("imgname");
    const imgUrl = document.getElementById("imgurl");
    let oldImages = JSON.parse(localStorage.getItem('imagesArray')) || [];

    let newImage = {
        "name": imgName.value,
        "url": imgUrl.value
    };
    oldImages.push(newImage)
    localStorage.setItem('imagesArray', JSON.stringify(oldImages))

    updateImages();

}

function updateImages(){
    let innerHtml = "";
    let imageBank = JSON.parse(localStorage.getItem('imagesArray')) || [];
    for(let i = 0; i < imageBank.length; i++){
        document.getElementById("results").innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
        </div>
      </div>`
     }

    
    
}