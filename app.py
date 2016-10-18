from flask import Flask, render_template, redirect, url_for, request
from models import Board, Card
import json
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('form.html')


@app.route('/api/boards', methods=['GET'])
def get_boards():
    if request.method == 'GET':
        boards_dict = []
        boards = Board.select().dicts()
        for board in boards:
            boards_dict.append(board)
    # print(boards_dict)
    return json.dumps(boards_dict)


@app.route('/api/boards', methods=['POST'])
def post_board():
    pass


@app.route('/api/boards/<int:board_id>', methods=['PUT'])
def update_board(board_id):
    pass


@app.route('/api/boards/<int:board_id>', methods=['DELETE'])
def delete_board(board_id):
    pass


@app.route('/api/board/<int:board_id>/cards', methods=['GET'])
def get_cards(board_id):
    pass

# /!\ THE FOLLOWING APP.ROUTES ARE COMMENTED OUT BECAUSE THEY CRASH THE SERVER /!\


# @app.route('/api/board/<int:board_id>/cards', methods=['POST'])
# def get_cards(board_id):
#     pass


# @app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['PUT'])
# def get_cards(board_id, card_id):
#     pass


# @app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['DELETE'])
# def get_cards(board_id, card_id):
#     pass


app.run(debug=True)
