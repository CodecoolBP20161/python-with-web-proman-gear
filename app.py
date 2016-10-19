from flask import Flask, render_template, redirect, url_for, request
from models import Board, Card
import json
from peewee import fn

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('form.html')


@app.route('/api/uniqueBoard', methods=['GET'])
def unique_board():
    return json.dumps({'boardId': Board.select(fn.MAX(Board.id)).scalar()})


@app.route('/api/uniqueCard', methods=['GET'])
def unique_card():
    return json.dumps({'cardId': Card.select(fn.MAX(Card.id)).scalar()})


@app.route('/api/boards', methods=['GET'])
def get_boards():
    boards_dict = []
    boards = Board.select().dicts()
    for board in boards:
        boards_dict.append(board)
    # print(boards_dict)
    return json.dumps(boards_dict)


@app.route('/api/boards', methods=['POST'])
def post_board():
    new_board = request.get_json(silent=True)
    title = new_board['title']
    board = Board(title=title)
    board.save()
    # return redirect(url_for(get_boards))  # kérdés jó e a redirect vagy más kell


@app.route('/api/boards/<int:board_id>', methods=['PUT'])
def update_board(board_id):
    board = Board.get(Board.id == board_id)
    new_board = request.get_json(silent=True)
    board.title = new_board['title']
    board.save()
    # return json.dumps(Board.get(Board.id == board_id).dicts())


@app.route('/api/boards/<int:board_id>', methods=['DELETE'])
def delete_board(board_id):
    board = Board.get(Board.id == board_id)
    board.delete_instance()


@app.route('/api/board/<int:board_id>/cards', methods=['GET'])
def get_cards(board_id):
    cards_dict = []
    cards = Card.select().where(Card.cardLocation == board_id).dicts()
    for card in cards:
        cards_dict.append(card)
    # print(boards_dict)
    return json.dumps(cards_dict)


@app.route('/api/board/<int:board_id>/cards', methods=['POST'])
def post_cards(board_id):
    new_card = request.get_json(silent=True)
    title = new_card['title']
    card = Card(title=title, cardLocation=board_id)
    card.save()


@app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['PUT'])
def update_cards(board_id, card_id):
    card = Card.get(Card.cardLocation == board_id, Card.id == card_id)
    new_card = request.get_json(silent=True)
    card.title = new_card['title']
    card.save()


@app.route('/api/board/<int:board_id>/cards/<int:card_id>', methods=['DELETE'])
def delete_cards(board_id, card_id):
    card = Card.get(Card.cardLocation == board_id, Card.id == card_id)
    card.delete_instance()


if __name__ == "__main__":
    app.run(debug=True)
