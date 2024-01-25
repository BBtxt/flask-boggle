console.log("app.js loaded");

$guessForm = $("#guess");
$guessForm.on("submit", checkGuess);


async function checkGuess(evt) {
  evt.preventDefault();
  let submittedGuess = $("#guess-input").val();
  console.log(submittedGuess);
  console.log("guess form submitted");
  try {
    const resp = await axios.post("/check-guess", { guess: submittedGuess });
    console.log("resp", resp);
    console.log("resp data",resp.data.butt);
  } catch (err) {  
    console.log(err);
  }

}