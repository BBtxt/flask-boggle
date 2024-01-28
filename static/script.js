class Game {
  constructor() {
    this.timer = null;
    this.score = 0;
    this.highScore = sessionStorage.getItem("highScore") || 0;
    this.gameDuration = 10; // Game duration in seconds
    this.timeRemaining = this.gameDuration;
    this.$timer = $("#timer_value");
    this.$scoreVal = $("#score_value");
    this.$guessForm = $("#guess");
    this.$resultTable = $("#result table");
    this.$submitBtn = $("#submitBtn");
    this.checkGuessHandler = (evt) => this.checkGuess(evt);
    this.$guessForm.on("submit", this.checkGuessHandler);
    this.$restartBtn = $("#restartBtn");
    this.$restartBtn.on("click", () => location.reload());
  }

  async checkGuess(evt) {
    evt.preventDefault();
    let submittedGuess = $("#guess-input").val();

    // Start the timer when the form is submitted
    if (!this.timer) {
      this.handleGameTimer();
    }

    try {
      const resp = await axios.post("/check-guess", { guess: submittedGuess });
      console.log("resp", resp);
      console.log("resp data", resp.data.guess);
      let result = resp.data.guess;
      if (result === "ok") {
        this.score++;
        this.$scoreVal.text(this.score);

        // Check if the new score is higher than the high score
        if (this.score > this.highScore) {
          this.highScore = this.score;
          sessionStorage.setItem("highScore", this.highScore);
          await axios.post("/update-high-score", { highScore: this.highScore });
        }
      }
      let newRow = `<tr><td>${submittedGuess}</td><td>${result}</td></tr>`; // create a new row with two cells
      this.$resultTable.append(newRow);
      $("#guess-input").val("");
    } catch (err) {
      console.log(err);
    }
  }

  handleGameTimer() {
    this.$timer.text(this.timeRemaining);
    this.timer = setInterval(() => {
      this.timeRemaining--;
      this.$timer.text(this.timeRemaining);
      if (this.timeRemaining == 0) {
        clearInterval(this.timer);
        alert("Game Over!");
        this.$guessForm.off("submit", this.checkGuessHandler);
        this.$submitBtn.hide();
      }
    }, 1000);
  }
  endGame() {
    this.$guessForm.off("submit", this.checkGuessHandler);
    this.$submitBtn.hide();
  }
}

// Instantiate the game
const game = new Game(); // console.log("app.js loaded");

// const $guessForm = $("#guess");
// const $resultTable = $("#result table");
// const $timerVal = $("#timer_value");
// const $submitBtn = $("#submitBtn");
// const $restartBtn = $("#restartBtn");
// const $scoreVal = $("#score_value");

// let timer;

// $guessForm.on("submit", checkGuess);

// // Check Guess, start timer
// async function checkGuess(evt) {
//   evt.preventDefault();
//   let submittedGuess = $("#guess-input").val();

//   // Start the timer when the form is submitted
//   if (!timer) {
//     handleGameTimer();
//   }

//   try {
//     const resp = await axios.post("/check-guess", { guess: submittedGuess });
//     console.log("resp", resp);
//     console.log("resp data", resp.data.guess);
//     let result = resp.data.guess;
//     if (result === "ok"){
//         let newScore = parseInt($scoreVal.text()) + 1;
//         $scoreVal.text(newScore);

//         // Check if the new score is higher than the high score
//         let highScore = sessionStorage.getItem('highScore');
//         if (!highScore || newScore > highScore) {
//           // Update the high score
//           sessionStorage.setItem('highScore', newScore);
//           // Send the new high score to the backend
//           await axios.post('/update-high-score', { highScore: newScore });
//         }
//     }
//     let newRow = `<tr><td>${submittedGuess}</td><td>${result}</td></tr>`; // create a new row with two cells
//     $resultTable.append(newRow);
//     submittedGuess = $("#guess-input").val("");
//   } catch (err) {
//     console.log(err);
//   }
// }

// function handleGameTimer() {
//   let time = 10;
//   timer = setInterval(function () {
//     time--;
//     $timerVal.text(time);
//     if (time == 0) {
//       clearInterval(timer);
//       alert("Game Over!");
//       $guessForm.off("submit", checkGuess);
//       $submitBtn.hide();
//     }
//   }, 1000);
// }

// $restartBtn.on("click", function () {
//   location.reload();
// });
