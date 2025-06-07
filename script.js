let userScore = 0;
let computerScore = 0;
let drawScore = 0;

let lastUserChoice = null;
let lastComputerChoice = null;

function play(userChoice) {
  const difficulty = document.getElementById("difficulty-select").value;
  const computerChoice = getComputerChoice(difficulty, userChoice);



  const userEmoji = getEmoji(userChoice);
  const computerEmoji = getEmoji(computerChoice);

  document.getElementById("user-emoji").textContent = userEmoji;
  document.getElementById("computer-emoji").textContent = computerEmoji;



  const resultText = getResult(userChoice, computerChoice);
  document.getElementById("result").textContent = resultText;

  if (resultText.includes("Win")) {
    userScore++;
    document.getElementById("user-score").textContent = userScore;
  } else if (resultText.includes("Lose")) {
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;
  } else {
    drawScore++;
    document.getElementById("draw-score").textContent = drawScore;
  }

  lastUserChoice = userChoice;
  lastComputerChoice = computerChoice;
  updateWinRate();

}

function getComputerChoice(difficulty, userChoice) {
  const choices = ['rock', 'paper', 'scissors'];

  if (difficulty === 'easy') {
    return choices[Math.floor(Math.random() * 3)];
  }

  if (difficulty === 'medium') {
    if (lastComputerChoice && Math.random() < 0.6) {
      return lastComputerChoice; 
    }
    return choices[Math.floor(Math.random() * 3)];
  }

  if (difficulty === 'hard') {
    if (!lastUserChoice) {
      return choices[Math.floor(Math.random() * 3)];
    }

  
    switch (lastUserChoice) {
      case 'rock': return 'paper';    
      case 'paper': return 'scissors'; 
      case 'scissors': return 'rock';  
    }
  }

  return choices[Math.floor(Math.random() * 3)];
}

function getEmoji(choice) {
  switch (choice) {
    case 'rock': return '✊';
    case 'paper': return '✋';
    case 'scissors': return '✌️';
  }
}

function getResult(user, comp) {
  if (user === comp) return "It's a Draw!";
  if (
    (user === 'rock' && comp === 'scissors') ||
    (user === 'paper' && comp === 'rock') ||
    (user === 'scissors' && comp === 'paper')
  ) {
    return "You Win! 🎉";
  }
  return "You Lose! 😢";
}

function resetScores() {
  userScore = 0;
  computerScore = 0;
  drawScore = 0;
  lastUserChoice = null;
  lastComputerChoice = null;

  document.getElementById("user-score").textContent = "0";
  document.getElementById("computer-score").textContent = "0";
  document.getElementById("draw-score").textContent = "0";
  document.getElementById("result").textContent = "";
  document.getElementById("user-kid").textContent = "🧒";
  document.getElementById("computer-kid").textContent = "🤖";
  document.getElementById("win-rate").textContent = "0%";
  document.getElementById("user-kid").src = defaultUser;
  document.getElementById("computer-kid").src = "assets/default_bot.avif";
  document.getElementById("user-avatar").value = ""
  document.getElementById("user-emoji").textContent = "❔";
  document.getElementById("computer-emoji").textContent = "❔";

}

function updateWinRate() {
  const totalGames = userScore + computerScore + drawScore;
  const rate = totalGames === 0 ? 0 : (userScore / totalGames) * 100;
  document.getElementById("win-rate").textContent = `${rate.toFixed(1)}%`;
}


const defaultUser = "assets/default_user.avif";
const defaultBotAvatars = [
  "assets/bot1.avif",
  "assets/bot2.avif",
  "assets/bot3.avif"
];

document.getElementById("user-avatar").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {

      document.getElementById("user-kid").src = e.target.result;


      const randomBot = defaultBotAvatars[Math.floor(Math.random() * defaultBotAvatars.length)];
      document.getElementById("computer-kid").src = randomBot;
    };
    reader.readAsDataURL(file);
  }
});



