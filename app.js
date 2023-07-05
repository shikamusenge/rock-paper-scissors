const resultDiv = document.querySelector("#result");
const userChoices = document.querySelectorAll(".choice-item");
// getting user choice
userChoices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    const playerChoice = choice.dataset.id;
    const computerChoice = getComputerChoice();
    playGame(playerChoice, computerChoice);
  });
});
const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const pcChoice = choices[Math.floor(Math.random() * choices.length)];
  return pcChoice;
};
const playHistory = {
  pass: { computer: 0, user: 0 },
  fail: { computer: 0, user: 0 },
  tie: 0,
};
const playGame = (playerChoice, computerChoice) => {
  const Result = {
    choices: { computer: computerChoice, user: playerChoice },
    marks: { computer: 0, user: 0 },
  };
  if (playerChoice === computerChoice) {
    Result.marks.user = 0;
    Result.marks.computer = 0;
    playHistory.tie += 1;
  } else if (playerChoice == "rock" && computerChoice == "scissors") {
    Result.marks.user = 1;
    playHistory.pass.user += 1;
  } else if (playerChoice == "scissors" && computerChoice === "paper") {
    Result.marks.user = 1;
    playHistory.pass.user += 1;
  } else if (playerChoice == "paper" && computerChoice === "rock") {
    Result.marks.user = 1;
    playHistory.pass.user += 1;
  } else {
    playHistory.pass.computer += 1;
    playHistory.fail.user += 1;
    Result.marks.computer = 1;
  }
  const decision =
    Result.marks.user === 1 && Result.marks.computer === 0
      ? "pass"
      : Result.marks.user === 0 && Result.marks.computer === 1
      ? "fail"
      : "tie";
  if (decision == "pass") {
    playHistory.fail.computer += 1;
  }
  Result.decision = decision;
  displayresult(Result);
  updateHistory();
};
const updateHistory = () => {
  const computerPasseTd = document.querySelector("#computer-pass");
  const userPasseTd = document.querySelector("#player-pass");
  const computerFailTd = document.querySelector("#computer-fail");
  const userFailTd = document.querySelector("#player-fail");
  const tiesTd = document.querySelector("#ties");
  computerPasseTd.innerText = playHistory.pass.computer;
  computerFailTd.innerText = playHistory.fail.computer;
  userPasseTd.innerText = playHistory.pass.user;
  userFailTd.innerText = playHistory.fail.user;
  tiesTd.innerText = playHistory.tie;
};
updateHistory();
const displayresult = (Result) => {
  const emojs = {
    rock: "✊",
    paper: "✋",
    scissors: "🤞",
  };
  const resultBody = `
<h4 id="rslt"> <p>User: ${emojs[Result.choices.user]}${
    Result.choices.user
  }</p> <p>VS</p> 
   <p>Computer: ${emojs[Result.choices.computer]} ${
    Result.choices.computer
  }</p></h4>
 <h3> You ${Result.decision} ! <h3>
 `;
  document.querySelector("#result-body").innerHTML = resultBody;
  document.querySelector("#result").style.display = "flex";
};

document.querySelector("#close-btn").onclick = () => {
  document.querySelector("#result").style.display = "none";
};
