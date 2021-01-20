"use Strict";


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

var dropDown = document.getElementById("dropDown");
var container = document.getElementById("container");
var offerSquare1 = document.getElementById("offerSquare1");
var offerSquare2 = document.getElementById("offerSquare2");
var offerSquare3 = document.getElementById("offerSquare3");

offerSquare1.style.display= 'none';
offerSquare2.style.display= 'none';
offerSquare3.style.display= 'none';
// var list = document.createElement("ul");
// var h2 = document.createElement("h2");

// container.appendChild(offerSquare1);
// container.appendChild(offerSquare2);
// container.appendChild(offerSquare3);



dropDown.addEventListener("change", RenderOffer2);

function RenderOffer2 () {
  switch (dropDown.options[dropDown.selectedIndex].value) {
    case `Teacher Assisstant`:
      // offerSquare1.style.visibility = 'visible';
      // offerSquare2.style.visibility = 'hidden';
      // offerSquare3.style.visibility = 'hidden';
      offerSquare1.style.display= 'block';
      offerSquare2.style.display= 'none';
      offerSquare3.style.display= 'none';
      break;
  
    case `Student`:
      offerSquare1.style.display= 'none';
      offerSquare2.style.display= 'block';
      offerSquare3.style.display= 'none';
      break;
  
    case `Adminstrator`:
      offerSquare1.style.display= 'none';
      offerSquare2.style.display= 'none';
      offerSquare3.style.display= 'block';
      break;
    default:
      offerSquare1.style.display= 'none';
      offerSquare2.style.display= 'none';
      offerSquare3.style.display= 'none';
      break;
      
  
  }

}

// function RenderOffer() {
//   console.log(dropDown.options[dropDown.selectedIndex].value);
//   // container.innerHTML='';
//   switch (dropDown.options[dropDown.selectedIndex].value) {
//     case `TA's Offers`:
//       offerSquare2.innerText= '';
//       offerSquare3.innerText= '';

//       h2.textContent = `50% Offer for TA's`;
//         for (let index = 0; index < clothes.length; index++) {
//           let li = document.createElement("li");
//           li.textContent = clothes[index];
//           list.appendChild(li);
//         }
//       offerSquare1.appendChild(h2);
//       offerSquare1.appendChild(list);
//     break;

//     case `Student's Offers`:
//       offerSquare1.innerText= '';
//       offerSquare3.innerText= '';
    
//     h2.textContent = "25% Offer for Students";
//       for (let index = 0; index < clothes.length; index++) {
//         let li = document.createElement("li");
//         li.textContent = clothes[index];
//         list.appendChild(li);
//       }
//       offerSquare2.appendChild(h2);
//       offerSquare2.appendChild(list);
//     break;

//     case `Adminstrator Offers`:
//       offerSquare1.innerText= '';
//       offerSquare2.innerText= '';

//       h2.textContent = "10% Offer for Adminstrators";
//       for (let index = 0; index < clothes.length; index++) {
//           let li = document.createElement("li");
//           li.textContent = clothes[index];
//           list.appendChild(li);
//         }
//       offerSquare3.appendChild(h2);
//       offerSquare3.appendChild(list);
//       break;

//     default:
//       console.log("no condition has met in switch case");
//       break;
//   }
// }


