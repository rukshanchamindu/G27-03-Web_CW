document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".overlay");
  const overlayImage = document.querySelector(".overlay__inner img");
  const cards = document.querySelectorAll(".card, .card1");

  function openOverlay(e) {
    const src = e.currentTarget.querySelector("img").src;
    overlayImage.src = src;
    overlay.classList.add("open");
    var cardContent = e.currentTarget.querySelector(".card-content");
    var description = document.getElementById("popup_description");
    var title = document.getElementById("popup_title");
    const paragraphTitle = cardContent.querySelector("h2").textContent;
    const paragraphText = cardContent.querySelector("p").textContent;
    description.innerHTML= paragraphText
    title.innerHTML = paragraphTitle
  }
  
  function closeOverlay() {
    overlay.classList.remove("open");
  }

  cards.forEach((card) => {
    card.addEventListener("click", openOverlay);
  });

  overlay.onclick = function(event) {
    if (event.target == overlay) {
      closeOverlay()
    }
  }
});

//Change Colour Button
function Change_Colour(colour) {
  var popup = document.getElementById("popup");
  popup.style.backgroundColor = colour;
}
//Change Font Button
function changeFont(font) {
  var popup = document.getElementById("popup");
  popup.style.fontFamily = font; // Change to any font you want
}
