let images = ['🍊', '🍋', '🍒', '🍉','🍑'];
let rows = document.querySelectorAll('.row');
const menu = document.getElementById("menu");
const userNameInput = document.getElementById("usernameInput");
const startButton = document.getElementById("startButton");
const welcomeMessage = document.getElementById("welcome");
const slotMachine = document.getElementById("slot-machine");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");
let wins = 0;
let losses = 0;
let winsDisplay = document.getElementById('wins');
let lossesDisplay = document.getElementById('losses');

startButton.addEventListener("click", startGame);
spinButton.addEventListener("click", playGame);

function startGame() {
    const userName = userNameInput.value.trim();
    if (userName === "") {
        alert("Будь ласка, введіть ваше ім’я.");
        return;
    }


    menu.classList.add("hide");
    menu.addEventListener("transitionend", () => {
        menu.classList.add("hidden");

        welcomeMessage.textContent = `Успіхів, ${userName.toUpperCase()}!`;
        welcomeMessage.classList.remove("hidden");

        spinButton.classList.remove("hidden");
        spinButton.removeAttribute("disabled");
    }, { once: true });


    slotMachine.classList.remove("hidden");
    scoreboard.classList.remove("hidden");
}
function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

function generateRow() {
    let row = [];
    while (row.length < 3) {
        let image = getRandomImage();
        if (!row.includes(image)) {
            row.push(image);
        }
    }
    return row;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateSlots() {
    let slots = [[], [], []];
    for (let i = 0; i < 3; i++) {
        let imagesCopy = [...images];
        shuffleArray(imagesCopy);
        for (let j = 0; j < 3; j++) {
            slots[j][i] = imagesCopy[j];
        }
    }
    return slots;
}


function playGame() {
    let win = false;
    let slots = generateSlots();
    for (let i = 0; i < 3; i++) {
        let row = rows[i].querySelectorAll('.slot');
        row[0].textContent = slots[i][0];
        row[1].textContent = slots[i][1];
        row[2].textContent = slots[i][2];
        if (slots[i][0] === slots[i][1] && slots[i][1] === slots[i][2]) {
            win = true;
        }
    }
    function checkDiagonals(rows) {
        let diagonal1 = [];
        let diagonal2 = [];

        for (let i = 0; i < 3; i++) {
            diagonal1.push(rows[i].children[i].textContent);
            diagonal2.push(rows[2 - i].children[i].textContent);
        }

        if (checkElements(diagonal1)) {
            return true;
        }

        if (checkElements(diagonal2)) {
            return true;
        }

        return false;
    }

    function checkElements(elements) {
        return elements.every(element => element === elements[0] && element !== '');
    }
    if (checkDiagonals(rows)) {
        win = true;
    }
    if (win) {
        result.textContent = "Ви виграли!";
        wins++;
        winsDisplay.textContent = wins;
    } else {
        result.textContent = "Ви програли. Спробуйте ще раз.";
        losses++;
        lossesDisplay.textContent = losses;
    }
}
