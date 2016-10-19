from flask import Flask, render_template, redirect, url_for, request
from models import Board, Card
import json
from peewee import fn

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('form.html')


# api for unique id to set Board object form JS
@app.route('/api/uniqueboard', methods=['GET'])
def unique_board():
    return json.dumps({'boardId': Board.select(fn.MAX(Board.id)).scalar()+1})


# api for unique id to set Card object form JS
@app.route('/api/uniquecard', methods=['GET'])
def unique_card():
    return json.dumps({'cardId': Card.select(fn.MAX(Card.id)).scalar()+1})


# get all board from database
@app.route('/api/boards', methods=['GET'])
def get_boards():
    boards_dict = []
    boards = Board.select().dicts()
    for board in boards:
        boards_dict.append(board)
    return json.dumps(boards_dict)


# save new board to database
@app.route('/api/boards', methods=['POST'])
def post_board():
    new_board = request.get_json(silent=True)
    title = new_board['title']
    board = Board(title=title)
    board.save()
    return json.dumps({'success': True})


# update old board title in database
@app.route('/api/boards/<int:board_id>', methods=['PUT'])
def update_board(board_id):
    board = Board.get(Board.id == board_id)
    new_board = request.get_json(silent=True)
    board.title = new_board['title']
    board.save()
    return json.dumps({'success': True})


# delete selected board in database
@app.route('/api/boards/<int:board_id>', methods=['DELETE'])
def delete_board(board_id):
    print(type(board_id))
    board = Board.get(Board.id == board_id)
    board.delete_instance()
    return json.dumps({'success': True})


# get all card with given board id from database
@app.route('/api/board/<int:board_id>/cards', methods=['GET'])
def get_cards(board_id):
    cards_dict = []
    cards = Card.select().where(Card.cardLocation == board_id).dicts()
    for card in cards:
        cards_dict.append(card)
    # print(boards_dict)
    return json.dumps(cards_dict)


# save new card to database
@app.route('/api/board/<int:board_id>/cards', methods=['POST'])
def post_cards(board_id):
    new_card = request.get_json(silent=True)
    title = new_card['title']
    card = Card(title=title, cardLocation=board_id)
    card.save()
    return json.dumps({'success': True})


# update old card title in  database
@app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['PUT'])
def update_cards(board_id, card_id):
    card = Card.get(Card.cardLocation == board_id, Card.id == card_id)
    new_card = request.get_json(silent=True)
    card.title = new_card['title']
    card.save()
    return json.dumps({'success': True})


# delete selected card in database
@app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['DELETE'])
def delete_cards(board_id, card_id):
    card = Card.get(Card.cardLocation == board_id, Card.id == card_id)
    card.delete_instance()
    return json.dumps({'success': True})


if __name__ == "__main__":
    app.run(debug=True)
