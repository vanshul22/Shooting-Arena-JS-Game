/*
Create a 2 player shooting game,
Each player a health of 100,
Player can shoot each other with random power from 0 to 5 which willl reduce the opponent health.
The player who reaches 0 will die and game over.
There are 5 such rounds the player with the most game wins will win tournament.
On screen there should be a button to start the game.
OOnce the game finish it should update the game current score.
When a player wins 3 match show the result.
*/

// Default variables declaration
let player_1_Health = 100;
let player_2_Health = 100;
let player_1_Wins = 0;
let player_2_Wins = 0;
let player_1_chance = true;
let player_2_chance = false;

// Refreshing page
function refreshPage() {
    location.reload();
}

function diceRoll() {
    // Generating random number from 0 to 5.
    let randomNumber = Math.floor(Math.random() * 51);

    // Checking if random number already shown on DOM.
    if (!!document.getElementById("random-number")) {
        document.getElementById("random-number").innerText = randomNumber;
    } else {
        // Entering random number after start button here.
        let div = document.createElement("div");
        div.innerText = randomNumber;
        div.id = "random-number";
        document.querySelector(".start-btn").after(div);
    };
    return randomNumber;
};

function roundWin(players) {
    if (player_1_Wins>=3 | player_2_Wins>=3) {
        document.getElementById("result-player-area").innerText = `${players}`;
        document.getElementById("finish-game").style.display = "block";
    }else{
        setTimeout(() => {
            player_1_Health = 100;
            document.getElementById("player-1-health").innerText = 100;
            player_2_Health = 100;
            document.getElementById("player-2-health").innerText = 100;
            // Remoing random number from DOM.
            if (document.getElementById('random-number') !== null) {
                document.getElementById('random-number').innerText = " ";
            }
            alert(`${players} the game...`);
        }, 500);
    };  
};

function player1Win() {
    player_1_Wins += 1;
    document.getElementById("player-1-result-span").innerText = player_1_Wins;    
};

function player2Win() {
    player_2_Wins += 1;
    document.getElementById("player-2-result-span").innerText = player_2_Wins;
};

function toggleDisableBtn() {
    document.getElementById("player-1-btn").classList.toggle('disabled-btn');
    document.getElementById("player-2-btn").classList.toggle('disabled-btn');
};

function updateNumberOfWins() {
    // Updating the value here for number of Wins
    if (player_1_Health <= 0) {
        player2Win();
        roundWin("Player 2 Win");
    } if (player_2_Health <= 0) {
        player1Win();
        roundWin("Player 1 Win");
    };
};

// Event Listener for starting the game from start button.
document.getElementById("start-btn").addEventListener("click", () => {
    // Removing class of hidden so we can show everything at once from start button.
    let hiddenClasses = document.querySelectorAll(".hidden");
    for (let hidden of hiddenClasses) {
        hidden.classList.remove("hidden");
    };

    // Checking for reset button have or not in DOM.
    if (!!document.getElementById("reset-btn")) {
        alert("Game Already Started!! Please Click on Players name to Play Game.");
    } else {
        // Creating reset button and added after start button because its not present.
        let div = document.createElement("div");
        div.innerHTML = `<button id="reset-btn" class="btn hide">Reset Game</button>`;
        div.classList = "reset-btn";
        document.querySelector(".start-btn").after(div);
    };

    // Added Event Listener to reset the game.
    document.getElementById("reset-btn").addEventListener("click", () => {
        // Resetting All values here...
        player_1_Wins = 0;
        document.getElementById("player-1-result-span").innerText = 0;
        player_2_Wins = 0;
        document.getElementById("player-2-result-span").innerText = 0;
        roundWin("Reset");
        document.getElementById("result-player-area").innerText = "Waiting for your game";
    });
});

// event Listener for First Player button.
document.getElementById("player-1-btn").addEventListener("click", () => {
    if (player_1_chance) {
        let randomNumber = diceRoll();
        player_2_Health = player_2_Health - randomNumber;
        document.getElementById("player-2-health").innerText = player_2_Health;
        player_1_chance = false;
        player_2_chance = true;
        toggleDisableBtn();
        // Updating the value here for number of Wins
        updateNumberOfWins();
    } else {
        alert("Player 2 Turn, Please Click on Player 2 button!!");
    };
});
// event Listener for Second Player button.
document.getElementById("player-2-btn").addEventListener("click", () => {
    if (player_2_chance) {
        let randomNumber = diceRoll();
        player_1_Health = player_1_Health - randomNumber;
        document.getElementById("player-1-health").innerText = player_1_Health;
        player_1_chance = true;
        player_2_chance = false;
        toggleDisableBtn();
        // Updating the value here for number of Wins
        updateNumberOfWins();
    } else {
        alert("Player 1 Turn, Please Click on Player 1 button!!");
    };
});