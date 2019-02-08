function addImg() {
    

    event.preventDefault()



    const imgName = document.getElementById("imgname");
    const imgUrl = document.getElementById("imgurl");
    let oldImages = JSON.parse(localStorage.getItem('imagesArray')) || [];

    if (imgUrl.value.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi) && imgName) {

        let newImage = {
            "name": imgName.value,
            "url": imgUrl.value
        };
        oldImages.unshift(newImage)
        localStorage.setItem('imagesArray', JSON.stringify(oldImages))
        imgName.value = null;
        imgUrl.value = null;
        updateImages();
    } else {
        alert("please give a description and a valid url")
    }
}

function updateImages() {
    document.getElementById("results").innerHTML = null;
    let imageBank = JSON.parse(localStorage.getItem('imagesArray')) || [];
    let htmlHolder;

    htmlHolder = `<div class="card-group">`;
    let columnCount = -1;
    for (let i = 0; i < imageBank.length; i++) {
        columnCount++

        if (columnCount == 3) {
            columnCount = 0;
            htmlHolder += `</div><div class="card-group"><a target="_blank" rel="noopener noreferrer" href="${imageBank[i].url}"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
          <button type="button" onclick="deleteImg('${imageBank[i].url}')" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
        </div>
      </div>`;

        } else {
            htmlHolder += `<a target="_blank" rel="noopener noreferrer" href="${imageBank[i].url}"><div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imageBank[i].url}" alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text">${imageBank[i].name}</p>
          <button type="button" onclick="deleteImg('${imageBank[i].url}')" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
        </div>
      </div>`;

        }

        

    }
    htmlHolder += `</div>`
    document.getElementById("results").innerHTML = htmlHolder
}

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