console.log("app.js loaded");

$guessForm = $("#guess");

$guessForm.on("submit", function (event) {
  event.preventDefault(); // prevent the form from submitting

  let submittedGuess = $("#guess-input").val();
  console.log(submittedGuess);
  console.log("guess form submitted");
});
