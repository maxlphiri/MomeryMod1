var user = prompt('Enter player name')

var ALERT_TITLE = "Info Center";
var ALERT_BUTTON_TEXT = "Continue";


if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }

    alertObj.style.display = "block";
    

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

document.addEventListener('DOMContentLoaded', () => {
    //Array for cards
    const cardArray = [
      {
        name: 'africa',
        img: 'Images/africa.gif'
      },
      {
        name: 'spk',
        img: 'Images/spk.gif'
      },
      {
        name: 'brutus',
        img: 'Images/brutus.gif'
      },
      {
        name: 'rec',
        img: 'Images/rec.gif'
      },
      {
        name: 'crew',
        img: 'Images/crew.gif'
      },
      {
        name: 'ele',
        img: 'Images/ele.gif'
      },
      {
        name: 'africa',
        img: 'Images/africa.gif'
      },
      {
          name: 'spk',
          img: 'Images/spk.gif'
      },
      {
        
        name: 'brutus',
        img: 'Images/brutus.gif' },
      {
        name: 'rec',
        img: 'Images/rec.gif'
      },
      {

        name: 'crew',
        img: 'Images/crew.gif'
      },
      {
        name: 'ele',
        img: 'Images/ele.gif'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const attempts = document.querySelector('#attempts')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = [] 
  
    //Game board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'Images/braingears.gif')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  let counter = 15// attempts
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        counter--
        attempts.textContent = counter
        if (counter === 0){
          // alert('Game over')
          cards.removeEventListener('click')

        } 
        cards[optionOneId].setAttribute('src', 'Images/braingears.gif')
        cards[optionTwoId].setAttribute('src', 'Images/braingears.gif')
        alert('By the way '+ '' + user + ' '+ 'you have clicked the same image!')
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        alert('Hey  ' +  user + ' You found a match!')
        cards[optionOneId].setAttribute('src', 'Images/perscholas.png')
        cards[optionTwoId].setAttribute('src', 'Images/perscholas.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        counter--
        attempts.textContent = counter
        if (counter === 0){
          alert('Attempts exceeded! Please refresh this page to try again')
          cards.removeEventListener('click')
        
        } 
       
      } else {
        counter--
        attempts.textContent = counter
        if (counter === 0){
          alert('Attempts exceeded! Please try again')
          cards.removeEventListener('click')

        } 
       
        cards[optionOneId].setAttribute('src', 'Images/braingears.gif')
        cards[optionTwoId].setAttribute('src', 'Images/braingears.gif')
        alert('Sorry, ' + '' + user + '!  ' +'please try again')
      }
      cardsChosen = []
      cardsChosenId = []
      resultDisplay.textContent = cardsWon.length
      if  (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent =  'Congratulations! You found all matching pairs! Refresh this page to play again' 
      }

    }
  
    //Function to flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 700) // ask how I can set this to increase for level two and 3
      }
    }
  
    function level1(){
      createBoard()
      alert('Welcome ' + user + ' !!'  + ' Lets play The Memory Game')
//
      
    }
   
    level1()
  })
