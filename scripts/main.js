function map(val, minA, maxA, minB, maxB) {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
  }
  
/**
 * Applies a 3D transformation effect to a card element based on mouse position.
 * @param {HTMLElement} card - The card element to apply the 3D effect to.
 * @param {MouseEvent} ev - The mouse event object containing the mouse position.
 */
  function Card3D(card, ev) {
    let img = card.querySelector('img');
    //
    let imgRect = card.getBoundingClientRect();
    let width = imgRect.width;
    let height = imgRect.height;
    let mouseX = ev.offsetX;
    let mouseY = ev.offsetY;
    let rotateY = map(mouseX, 0, 180, -25, 25);
    let rotateX = map(mouseY, 0, 250, 25, -25);
    let brightness = map(mouseY, 0, 250, 1.5, 0.5);
    
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    img.style.filter = `brightness(${brightness})`;
  }
  
  var cards = document.querySelectorAll('.card3d');

  //print hello wolrd to the console
    console.log("Hello World");
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (ev) => {
      Card3D(card, ev);
    });
    
    card.addEventListener('mouseleave', (ev) => {
      let img = card.querySelector('img');
      
      img.style.transform = 'rotateX(0deg) rotateY(0deg)';
      img.style.filter = 'brightness(1)';
    });
  });