const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
   //console.log('I was clicked');
   //console.log(this)
   if (lockBoard) return;
   if (this === firstCard) return;

   this.classList.toggle('flip');

   if (!hasFlippedCard){
      //first click
      hasFlippedCard = true;
      firstCard = this;
      //console.log({hasFlippedCard, firstCard});
   } else{
      //second click
      hasFlippedCard = false;
      secondCard = this;
      //console.log({firstCard, secondCard});

      checkForMatch()      
   }
}

function checkForMatch(){
   //do cards match?
      //console.log(firstCard.dataset.framework);
      //console.log(secondCard.dataset.framework)
      // if (firstCard.dataset.framework === secondCard.dataset.framework){
      //    //it's a match
      //    disableCards();
      // } else {
      //    //not a match
      //    unflipCards();
      // }
      let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

      isMatch ? disableCards() : unflipCards();
}

function disableCards(){
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
}

function unflipCards(){
   lockBoard = true;

   setTimeout(() => {
   firstCard.classList.remove('flip');
   secondCard.classList.remove('flip');
   resetBoard();
   }, 1500);
}

function resetBoard(){
   [hasFlippedCard, lockBoard] = [false, false]; //ES6 deconstructing
   [firstCard, secondCard] = [null, null];
}

(function shuffle(){
   cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
   });
})(); //IIFE (Immediately Invoked Function Expression)

cards.forEach(card => card.addEventListener('click', flipCard))