document.addEventListener("DOMContentLoaded", function () {
    // Function to make a request to the Numbers API
    const getNumberFact = async (number) => {
        const response = await fetch(`http://numbersapi.com/${number}?json`);
        const data = await response.json();
        return data.text;
    };

    // Display facts about your favorite number
    const favoriteNumber = 8;
    const singleNumberList = document.getElementById("singleNumberList");
    for (let i = 0; i < 4; i++) {
        getNumberFact(favoriteNumber).then((fact) => {
            const li = document.createElement("li");
            li.textContent = fact;
            singleNumberList.appendChild(li);
        });
    }

    // Display facts about multiple numbers
    const multipleNumberList = document.getElementById("multipleNumberList");
    const numbersToFetch = [3, 8, 12, 5]; // Change these numbers as needed
    Promise.all(numbersToFetch.map(getNumberFact)).then((facts) => {
        facts.forEach((fact) => {
            const li = document.createElement("li");
            li.textContent = fact;
            multipleNumberList.appendChild(li);
        });
    });
});
