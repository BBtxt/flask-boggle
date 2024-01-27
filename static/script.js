console.log("app.js loaded");

const $guessForm = $("#guess");
const $resultTable = $("#result table");
const $timerVal = $("#timer_value");
const $submitBtn = $("#submitBtn");
const $restartBtn = $("#restartBtn");
const $scoreVal = $("#score_value");

let timer;

$guessForm.on("submit", checkGuess);

// Check Guess, start timer
async function checkGuess(evt) {
  evt.preventDefault();
  let submittedGuess = $("#guess-input").val();

  // Start the timer when the form is submitted
  if (!timer) {
    handleGameTimer();
  }

  try {
    const resp = await axios.post("/check-guess", { guess: submittedGuess });
    console.log("resp", resp);
    console.log("resp data", resp.data.guess);
    let result = resp.data.guess;
    if (result === "ok"){
        let newScore = parseInt($scoreVal.text()) + 1;
        $scoreVal.text(newScore);

        // Check if the new score is higher than the high score
        let highScore = sessionStorage.getItem('highScore');
        if (!highScore || newScore > highScore) {
          // Update the high score
          sessionStorage.setItem('highScore', newScore);
          // Send the new high score to the backend
          await axios.post('/update-high-score', { highScore: newScore });
        }
    }
    let newRow = `<tr><td>${submittedGuess}</td><td>${result}</td></tr>`; // create a new row with two cells
    $resultTable.append(newRow);
    submittedGuess = $("#guess-input").val("");
  } catch (err) {
    console.log(err);
  }
}

function handleGameTimer() {
  let time = 10;
  timer = setInterval(function () {
    time--;
    $timerVal.text(time);
    if (time == 0) {
      clearInterval(timer);
      alert("Game Over!");
      $guessForm.off("submit", checkGuess);
      $submitBtn.hide();
    }
  }, 1000);
}

$restartBtn.on("click", function () {
  location.reload();
});

