console.log("app.js loaded");

const $guessForm = $("#guess");
$guessForm.on("submit", checkGuess);
const $resultTable = $("#result table");

async function checkGuess(evt) {
  evt.preventDefault();
  let submittedGuess = $("#guess-input").val();
  try {
    const resp = await axios.post("/check-guess", { guess: submittedGuess });
    console.log("resp", resp);
    console.log("resp data",resp.data.guess);
    let result = resp.data.guess;
    let newRow = `<tr><td>${submittedGuess}</td><td>${result}</td></tr>`;  // create a new row with two cells
    $resultTable.append(newRow); 
    submittedGuess = $("#guess-input").val("");
  } catch (err) {  
    console.log(err);
  }

}
