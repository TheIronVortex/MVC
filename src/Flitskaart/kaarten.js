let cards = Array.from(document.querySelectorAll('.card'));
let originalCardsOrder = Array.from(document.querySelectorAll('.card'));
let currentCard = 0;
let totalCards = cards.length - 1; // Aantal kaarten, exclusief het laatste kaartje (eind kaart)
document.getElementById('card-counter').textContent = `${currentCard + 1}/${totalCards}`;
cards[currentCard].style.display = 'block';
let autoPlayInterval = null;
let isPlaying = false;

// Button style aanpassen voor het eerste en laatste kaartje
function updateButtonVisibility() {
    const playButton = document.getElementById('play');
    const shuffleButton = document.getElementById('shuffle');
    const tooltip = document.querySelector('.tooltip');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    if (currentCard === 0) {
        prevButton.disabled = true; 
        prevButton.classList.add('disabled'); 
    } else {
        prevButton.disabled = false; 
        prevButton.classList.remove('disabled'); 
    }
    if (currentCard === totalCards) {
        playButton.style.visibility = 'hidden';
        shuffleButton.style.visibility = 'hidden';
        tooltip.style.visibility = 'hidden';
        nextButton.classList.add('disabled'); 
        nextButton.disabled = true; 
    } else {
        playButton.style.visibility = 'visible';
        shuffleButton.style.visibility = 'visible';
        tooltip.style.visibility = 'visible';
        nextButton.classList.remove('disabled'); 
        nextButton.disabled = false; 
    }
}
window.addEventListener('DOMContentLoaded', function() {
    updateButtonVisibility(); // Controleer knopstatus bij laden van de pagina
});


// Bijwerken van kaartteller bij te werken
function updateCardCounter() {
    let countToShow = currentCard === totalCards ? currentCard : currentCard + 1;
    document.getElementById('card-counter').textContent = `${countToShow}/${totalCards}`;
    updateButtonVisibility(); // Update de knoppen zichtbaarheid bij het bijwerken van de kaartteller
}

// Automatisch afspeel functie
function flipCard() {
    if (!isPlaying) {
        return;
    }

    cards[currentCard].classList.add('flipped'); 

    setTimeout(() => {
        if (!isPlaying) {
            return;
        }

        cards[currentCard].classList.remove('flipped');
        cards[currentCard].style.display = 'none';
        currentCard = (currentCard + 1) % cards.length;

        updateCardCounter();

        if (currentCard === cards.length - 1) {
            clearInterval(autoPlayInterval);
            isPlaying = false;
            document.getElementById('play').style.display = 'inline-block';
            document.getElementById('stop').style.display = 'none';
            cards[currentCard].style.display = 'block';
            return;
        }

        cards[currentCard].style.display = 'block';
    }, 4000); // Wacht 4 seconden voordat naar de volgende kaart wordt gegaan
}

function flipCardWithDelay() {
    setTimeout(() => {
        flipCard(); // Draai de kaart om na 3 seconden
        updateCardCounter(); 
    }, 3000);
}

function playCards() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }

    isPlaying = true;
    flipCard(); // Draai de eerste kaart meteen om
    updateCardCounter(); 

    autoPlayInterval = setInterval(() => {
        flipCard();
    }, 7000); // Wacht 7 seconden tussen kaarten
}

document.getElementById('play').addEventListener('click', function() {
    if (!isPlaying) {
        playCards();
        document.getElementById('play').style.display = 'none';
        document.getElementById('stop').style.display = 'inline-block';
    }
});

document.getElementById('stop').addEventListener('click', function() {
    clearInterval(autoPlayInterval);
    isPlaying = false;
    document.getElementById('stop').style.display = 'none';
    document.getElementById('play').style.display = 'inline-block';
});

// Terug draaien naar de voorkant 
function flipCardToFront(cardIndex) {
    cards[cardIndex].classList.remove('flipped');
}

document.getElementById('next').addEventListener('click', function() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        isPlaying = false;
        document.getElementById('stop').style.display = 'none';
        document.getElementById('play').style.display = 'inline-block';
    }
    flipCardToFront(currentCard);
    cards[currentCard].style.display = 'none';
    currentCard = (currentCard + 1) % cards.length;
    cards[currentCard].style.display = 'block';
    updateCardCounter(); // +1 bij kaarten teller (next)
});

document.getElementById('prev').addEventListener('click', function() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        isPlaying = false;
        document.getElementById('stop').style.display = 'none';
        document.getElementById('play').style.display = 'inline-block';
    }
    flipCardToFront(currentCard);
    cards[currentCard].style.display = 'none';
    currentCard = (currentCard - 1 + cards.length) % cards.length;
    cards[currentCard].style.display = 'block';
    updateCardCounter(); // -1 bij kaarten teller (prev)
});

document.getElementById('restart').addEventListener('click', function() {
    originalCardsOrder.forEach((card, index) => {
        card.classList.remove('flipped');
        if (index === 0) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
        document.getElementById('flashcards').appendChild(card);
    });
    // Stel de kaarten in op de oorspronkelijke volgorde
    cards = Array.from(document.querySelectorAll('.card'));
    currentCard = 0;
    updateCardCounter(); // Kaarten teller op 0
});

cards.forEach((card, index) => {
    card.addEventListener('click', function() {
        if (!card.classList.contains('flipped') && index === cards.length - 1) {
            // Blokkeer het klikken op het laatste kaartje als het niet is omgedraaid (geflipped)
            return;
        }
        card.classList.toggle('flipped');
        // Pauzeer automatische afspeelmodus bij handmatige actie (klik op kaart)
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            isPlaying = false;
            document.getElementById('stop').style.display = 'none';
            document.getElementById('play').style.display = 'inline-block';
        }
    });
});

// Kaarten schudden met reset
function shuffleCardsWithReset() {
    let shuffledCards = Array.from(cards);

    // Zoek de index van 'last-card' en verwijder het uit de array
    const lastCardIndex = shuffledCards.findIndex(card => card.id === 'last-card');
    const lastCard = shuffledCards.splice(lastCardIndex, 1)[0];

    // Fisher-Yates shuffle voor alle kaarten behalve 'last-card'
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    // Reset de kaarten (naar voorkant)
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.style.display = 'none';
    });

    // Verwijder de oude kaarten
    cards.forEach(card => card.remove());

    // Voeg de geschudde kaarten toe aan de DOM, behoud 'last-card'-element als laatste
    const flashcards = document.getElementById('flashcards');
    shuffledCards.forEach(card => {
        // Voeg een klasse toe om het schud-effect toe te passen
        card.classList.add('shuffle-animation');
        flashcards.appendChild(card);
        // Verwijder de klasse na een korte vertraging om het effect opnieuw te kunnen afspelen
        setTimeout(() => {
            card.classList.remove('shuffle-animation');
        }, 1000); // Duur schudeffect
    });

    flashcards.appendChild(lastCard);
    cards = shuffledCards.concat(lastCard);
    currentCard = 0;
    cards[currentCard].style.display = 'block';
    updateCardCounter();
}

// Vind de shuffle-knop
const shuffleButton = document.getElementById('shuffle');

// Voeg een event listener toe om funtie uit te voeren
shuffleButton.addEventListener('click', shuffleCardsWithReset);

document.getElementById('shuffle').addEventListener('click', function() {
    // Pauzeer automatische afspelen
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        isPlaying = false;
        document.getElementById('stop').style.display = 'none';
        document.getElementById('play').style.display = 'inline-block';
    }
});