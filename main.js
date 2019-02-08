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
    document.getElementById("results").innerHTML = null;
    let imageBank = JSON.parse(localStorage.getItem('imagesArray')) || [];
   
    document.getElementById("results").innerHTML += `<div class="card-group">`
    
    for(let i = 0; i < imageBank.length; i++){
       
        
       if(i % 3 !== 0){
        document.getElementById("results").innerHTML += `<a href="${imageBank[i].url}"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
        </div>
      </div>`
       }
        else{
        document.getElementById("results").innerHTML += `</div><div class="card-group"><a href="${imageBank[i].url}"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
        </div>
      </div>`
        
        }
       }
    
    
document.getElementById("results").innerHTML += `</div>`
    
    
}
