/**
 * Created by szilard on 2016.10.06..
 */
function MyLocalStorage() {

    this.getBoards= function() {
        var boardList = localStorage.getItem('boards');
        boardList = JSON.parse(boardList);
        return boardList;
    };

    this.saveBoard = function(board) {
        var boards = this.getBoards();
        if (boards){
            boards.push(board);
        } else {
            boards = [board];
        }
        localStorage.setItem('boards', JSON.stringify(boards));

    };

    this.getCardsForBoards = function(boardId){

        var cardlist = localStorage.getItem('cards');
        if (cardlist) {
            cardlist = JSON.parse(cardlist);
            for (var key in cardlist){
                if (boardId === key){
                    // console.log("getcard: "+cardlist[key][0].id);
                    return cardlist[key];
                }
            }
            // return cardlist;
        }
    };

    this.getCards = function () {
        var cardlist = localStorage.getItem('cards');
        if (cardlist) {
            cardlist = JSON.parse(cardlist);
            return cardlist;
        }

    };

    this.saveCardsForBoards = function(boardId, card) {
        var cards = this.getCards();
        var cardKeys = [];
        if (cards){
            for (var key in cards){
                cardKeys.push(key);
                if (boardId === key){
                    cards[key].push(card);
                }
                 console.log("append:" + cards);
            }
            var contains = $.inArray(boardId, cardKeys);
            if (contains === -1){
                cards[boardId] = [card];
                 console.log("new:" + cards);
            }
        } else {
            var cards = {};
            cards[boardId] = [card];
            console.log("first:" + cards);

        }
        localStorage.setItem('cards', JSON.stringify(cards));
    };

    this.deleteBoard = function(boardId) {
        var boards = this.getBoards();
        var cards = this.getCards();
        if (boards) {
            for (var i = 0; i < boards.length; i++) {
                if (boards[i].id === boardId) {
                    boards.splice(i, 1);
                }
            }
            for (var key in cards) {
                if (boardId === key){
                    delete cards[key];
                }
            }
        localStorage.setItem('boards', JSON.stringify(boards));
        localStorage.setItem('cards', JSON.stringify(cards));
        }
    };

    this.deleteCard = function(boardId, cardId) {
        var cards = this.getCards();
        if (cards) {
            for (var key in cards) {
                for (var i=0; i < cards[key].length; i++) {
                    console.log(boardId, cardId);
                    if (boardId === key && cardId === cards[key][i].id) {
                        cards[key].splice(i, 1);
                    }
                }
            }
        localStorage.setItem('cards', JSON.stringify(cards));
        }
    };
}

function MyDatabaseStorage() {

    this.getBoards = function(callback) {
        $.ajax({
            type: 'GET',
            url : '/api/boards',
            success: function(response){
                callback(JSON.parse(response));
                console.log("successfully received: " + JSON.parse(response))
            },
            error: function(){
                console.log("Error reading data");
            }
        });
    };

    this.saveBoard = function(board) {
        var boards = this.getBoards();
        // if (boards){
        //     boards.push(board);
        // } else {
        //     boards = [board];
        // }
        console.log(JSON.stringify(board))
        $.ajax({
            type: 'POST',
            url : '/api/boards',
            data : JSON.stringify(board),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent data")
            },
            error: function(){
                console.log("Error sending data");
            }
        });

        // localStorage.setItem('boards', JSON.stringify(boards));
    };

    this.getCardsForBoards = function(boardId){

        // var cardlist = localStorage.getItem('cards');
        if (cardlist) {
            cardlist = JSON.parse(cardlist);
            for (var key in cardlist){
                if (boardId === key){
                    // console.log("getcard: "+cardlist[key][0].id);
                    return cardlist[key];
                }
            }
            // return cardlist;
        }
    };

    this.getCards = function () {
        // var cardlist = localStorage.getItem('cards');
        if (cardlist) {
            cardlist = JSON.parse(cardlist);
            return cardlist;
        }

    };

    this.saveCardsForBoards = function(boardId, card) {
        var cards = this.getCards();
        var cardKeys = [];
        if (cards){
            for (var key in cards){
                cardKeys.push(key);
                if (boardId === key){
                    cards[key].push(card);
                }
                 console.log("append:" + cards);
            }
            var contains = $.inArray(boardId, cardKeys);
            if (contains === -1){
                cards[boardId] = [card];
                 console.log("new:" + cards);
            }
        } else {
            var cards = {};
            cards[boardId] = [card];
            console.log("first:" + cards);

        }
        // localStorage.setItem('cards', JSON.stringify(cards));
    };

    this.deleteBoard = function(boardId) {
        var boards = this.getBoards();
        var cards = this.getCards();
        if (boards) {
            for (var i = 0; i < boards.length; i++) {
                if (boards[i].id === boardId) {
                    boards.splice(i, 1);
                }
            }
            for (var key in cards) {
                if (boardId === key){
                    delete cards[key];
                }
            }
        // localStorage.setItem('boards', JSON.stringify(boards));
        // localStorage.setItem('cards', JSON.stringify(cards));
        }
    };

    this.deleteCard = function(boardId, cardId) {
        var cards = this.getCards();
        if (cards) {
            for (var key in cards) {
                for (var i=0; i < cards[key].length; i++) {
                    console.log(boardId, cardId);
                    if (boardId === key && cardId === cards[key][i].id) {
                        cards[key].splice(i, 1);
                    }
                }
            }
        // localStorage.setItem('cards', JSON.stringify(cards));
        }
    };
}



function MyStorage() {

    this.implementation = function () {
        return new MyDatabaseStorage();
    };

    this.saveBoard = function (board) {
        return this.implementation().saveBoard(board);
    };

    this.getBoards = function (callback) {
        return this.implementation().getBoards(callback);
    };

    this.saveCardsForBoards = function (boardId, card) {
        return this.implementation().saveCardsForBoards(boardId, card);
    };

    this.getCardsForBoards = function (boardId) {
        return this.implementation().getCardsForBoards(boardId);
    };

    this.deleteBoard = function (boardId) {
        return this.implementation().deleteBoard(boardId);
    };

    this.deleteCard = function (boardId, cardId) {
        return this.implementation().deleteCard(boardId, cardId);
    };


}

var saveBoard = function(storage){
        var value = $(".form-control").val();
        if (value) {
            var board = fillBoardDetails();
            storage.saveBoard(board);
            $('#myModal').modal('hide');
            $(".form-control").val("");
            createBoard(board.id, board.title);
        } else {
            alertMessage('Please fill board title!');
        }

};

var board = function (id, storage) {
    $('.add-card').hide();
    $('.container').hide();
    $('.cards-container').show();
    $('.list-group-item').remove();
    var cardItems = storage.getCardsForBoards(id);
    if (cardItems) {
        for (var i = 0; i < cardItems.length; i++) {
            createCard(cardItems[i].id, cardItems[i].title, cardItems[i].cardLocation);
        }
    }
};

var saveCard = function (id, storage) {
    var value = $(".card-input").val();
    if (value) {
    var card = fillCardDetails(id);
    storage.saveCardsForBoards(id, card);
    createCard(card.id, value);
    $(".card-input").val("");
    } else {
        alertMessage('Please fill card title!');
    }

};

var boardDeleteConfirm = function (storage) {
    $(function() {
            bootbox.confirm({
              size: "small",
              message: "Are you sure?",
              callback: function(result){
                  if (result){
                   storage.deleteBoard($boardId);
                    $('.board#'+ $boardId).parent().remove();
                    $('.close-btn#'+ $boardId).parent().remove();
                  }
              }
            });
        });

};

var cardDeleteConfirm = function (storage) {
    $(function() {
            bootbox.confirm({
              size: "small",
              message: "Are you sure?",
              callback: function(result){
                  if (result){
                    storage.deleteCard($boardIdCard, $cardId);
                    $('.list-group-item#'+ $cardId).remove();
                    $('.close-card#'+ $cardId).remove();
                      }
              }
            });
    });
};
