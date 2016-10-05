function Board(title, id) {
    this.title = title;
    this.id = id;
}

function generateUniqueId(){
    var highestId = parseInt(localStorage.getItem('highestId')) || 0;
    highestId++;
    localStorage.setItem('highestId', highestId);
    return highestId
}

function fillBoardDetails() {
    var title = $('input').val();
    var id = generateUniqueId();
    return new Board(title, id);
}

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

    this.getCardsForBoards = function(){
        var cardlist = localStorage.getItem('cards');
        cardlist = JSON.parse(cardlist);
        return cardlist;
    };

    this.saveCards = function(card) {
    var cards = this.getCardsFromBoards();
    if (cards){
        cards.push(card);
    } else {
        cards = [card];
    }
    localStorage.setItem('cards', JSON.stringify(cards));

    };

}

function myStorage() {

    this.implementation = function () {
        return new MyLocalStorage();
    };

    this.saveBoard = function (board) {
        return this.implementation().saveBoard(board);
    };

    this.getBoards = function () {
        return this.implementation().getBoards();
    };
}

$(document).ready(function() {
    var storage = new myStorage();
    var boards = storage.getBoards();
    if (boards) {
        for (var i = 0; i < boards.length; i++) {
            $('.row').append('<div class="col-sm-3"><button type="button" class="btn btn-primary btn-block board" id="' + boards[i].id + '">' + boards[i].title + '</button></div>')
        }
        ;
    }
    $('#save_board').click(function() {
        var board = fillBoardDetails();
        storage.saveBoard(board);
        $('#myModal').modal('hide');
        $(".form-control").val("");
        $('.row').append('<div class="col-sm-3"><button type="button" class="btn btn-primary btn-block board" id="' + board.id + '">' + board.title +'</button></div>')
    });
    // $('.board').click(function() {
    //     $('.container').hide();
    // });
    $(document).on("click",".board", function () {
        $('.container').hide();
        // var title = $('input').val();
        var title = prompt("Add title here");
        var id = generateUniqueCardId();
        var cardLocation = $(this).attr('id');
        var newCard = new Card(title, id, cardLocation)
        console.log(newCard.title + newCard.id + newCard.cardLocation);


    })

});
function Card(title, id, cardLocation) {
    this.title = title;
    this.id = id;
    this.cardLocation = cardLocation;
}

function generateUniqueCardId(){
    var highestCardId = parseInt(localStorage.getItem('highestCardId')) || 0;
    highestCardId++;
    localStorage.setItem('highestCardId', highestCardId);
    return highestCardId
}

function fillCardDetails() {
    var title = $('input').val();
    var id = generateUniqueCardId();
    var cardLocation = board.id;
    return new Card(title, id, cardLocation);
}

