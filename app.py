from flask import Flask, render_template, session, request
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"


@app.route("/")
def index():
    return render_template("index.html")
    # board = boggle_game.make_board()
    # session["board"] = board
    # highscore = session.get("highscore", 0)
    # nplays = session.get("nplays", 0)



boggle_game = Boggle()

