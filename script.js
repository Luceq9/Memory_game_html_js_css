const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow",
    "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];


let cards = document.querySelectorAll("div");
cards = [...cards];

const startTime = new Date().getTime();
let activeCard = "";
const activeCards  = [];

const gameParis = cards.length/2;
let gameResult = 0;

let click = 0;


console.log(startTime);


const clickCard = function () {
    console.log("klik")
    activeCard = this;



    if(activeCard == activeCards[0]){
        return;
    }
    activeCard.classList.remove("hidden");

    // Klik 1
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        click++;
        return;
    }
    // Klik 2
    else {
        console.log("2");
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function (){
            if (activeCards[0].className === activeCards[1].className) {
                console.log("Wygrane")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));
                if(gameResult == gameParis) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime)/1000
                    alert(`Udało sie ${gameTime} sekund,  oraz wykonałeś ${click} ruchów`)
                    location.reload();
                }
            }
            else
            {
                console.log("Przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;

            cards.forEach(card => card.addEventListener("click", clickCard))

        }, 500)
    }
};

    const init = function () {
        cards.forEach(card => {
            const position = Math.floor(Math.random()
                * cardsColor.length);
            card.classList.add(cardsColor[position]);
            cardsColor.splice(position, 1);
        })
        setTimeout(function () {
            cards.forEach(card => {
                card.classList.add("hidden")
                card.addEventListener("click", clickCard)
            })
        }, 2000)
    };

    init()

