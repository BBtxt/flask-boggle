from flask import Flask, render_template, session, request
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-secret"


@app.route("/")
def index():
    new_board = make_board() 
    return render_template("index.html", new_board=new_board)




def make_board():
    board = Boggle().make_board()
    return board