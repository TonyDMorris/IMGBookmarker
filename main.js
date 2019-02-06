const imgName = document.getElementById("imgname");
const imgUrl = document.getElementById("imgurl");

function addImg(){
    event.preventDefault()
  let oldImages = JSON.parse(localStorage.getItem('itemsArray')) || [];

  let newImage = {
      "name":document.getElementById("imgname").value,
      "url":document.getElementById("imgurl").value
  };
  oldImages.push(newImage)
  localStorage.setItem('itemsArray', JSON.stringify(oldImages))

}