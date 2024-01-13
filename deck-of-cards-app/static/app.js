document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "https://deckofcardsapi.com/api/deck/";

    // Function to make a request to the Deck of Cards API
    const drawCard = async (deckId) => {
        const response = await fetch(`${baseURL}${deckId}/draw/?count=1`);
        const data = await response.json();
        return data.cards[0];
    };

    // Draw a single card from a newly shuffled deck
    drawCard("new").then((card) => {
        console.log(`Drawn Card: ${card.value} of ${card.suit}`);
    });

    // Draw two cards from the same deck
    let deckId;
    fetch(`${baseURL}new/shuffle/`).then((response) => response.json()).then((data) => {
        deckId = data.deck_id;
        return drawCard(deckId);
    }).then((card1) => {
        console.log(`First Card: ${card1.value} of ${card1.suit}`);
        return drawCard(deckId);
    }).then((card2) => {
        console.log(`Second Card: ${card2.value} of ${card2.suit}`);
    });

    // Draw cards from a deck on button click
    const drawCardBtn = document.getElementById("drawCardBtn");
    const drawnCardDiv = document.getElementById("drawnCard");

    drawCardBtn.addEventListener("click", () => {
        drawCard(deckId).then((card) => {
            if (card) {
                const cardText = document.createElement("p");
                cardText.textContent = `Drawn Card: ${card.value} of ${card.suit}`;
                drawnCardDiv.appendChild(cardText);
            } else {
                drawCardBtn.disabled = true;
                drawnCardDiv.innerHTML = "<p>No cards left in the deck.</p>";
            }
        });
    });
});
