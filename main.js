
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
    let htmlHolder;
   
    htmlHolder = `<div class="card-group">`;
    let columnCount = 0;
    for(let i = 0; i < imageBank.length; i++){
       columnCount++
        
       if(columnCount == 3){
           columnCount = 0;
           htmlHolder += `</div><div class="card-group"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
        </div>
      </div>`;
            
       }
        else{
         htmlHolder += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
        </div>
      </div>`;
        
        }
      htmlHolder += `</div>`
      console.log(htmlHolder)
      document.getElementById("results").innerHTML = htmlHolder
       }
}
