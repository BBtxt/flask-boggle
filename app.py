from flask import Flask, render_template, session, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from boggle import Boggle

app = Flask(__name__)
app.debug = True
app.config["SECRET_KEY"] = "this-is-secret"
toolbar = DebugToolbarExtension(app)

boggle = Boggle()

@app.route("/")
def index():
    new_board = boggle.make_board() 
    session["board"] = new_board
    return render_template("index.html", new_board=new_board)

@app.route("/check-guess", methods = ["POST"])
def check_guess():
    try:
        data = request.get_json()
        guess = data['guess']  # access the 'guess' field of the data
        current_board = session["board"]
        
        if not current_board:
            return jsonify({'is_valid': "wrong board please refresh"})
        
        is_valid = check_word(current_board, guess)

        return jsonify({'guess': is_valid})  # return a response
    except Exception as e:
        print(e)
        return str(e), 500

@app.route('/update-high-score', methods=['POST'])
def update_high_score():
    data = request.get_json()
    high_score = data.get('highScore')
    if high_score is not None:
        session['highScore'] = high_score
        return {'message': 'High score updated successfully'}, 200
    else:
        return {'message': 'No high score provided'}, 400

def check_word(board, guess):
    result = boggle.check_valid_word(board, guess)  # call check_valid_word on the boggle instance
    return result