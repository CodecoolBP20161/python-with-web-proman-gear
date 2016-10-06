function Board(title, id) {
    this.title = title;
    this.id = id.toString();
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

function Card(title, id, cardLocation) {
    this.title = title;
    this.id = id.toString();
    this.cardLocation = cardLocation.toString();
}

function generateUniqueCardId(){
    var highestCardId = parseInt(localStorage.getItem('highestCardId')) || 0;
    highestCardId++;
    localStorage.setItem('highestCardId', highestCardId);
    return highestCardId
}

function fillCardDetails(board) {
    var title = $('.card-input').val();
    var id = generateUniqueCardId();
    var cardLocation = board;
    return new Card(title, id, cardLocation);
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

    this.getCardsForBoards = function(boardId){

        var cardlist = localStorage.getItem('cards');
        if (cardlist) {
            cardlist = JSON.parse(cardlist);
            console.log(cardlist);
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

    this.saveCardsForBoards = function (boardId, card) {
        return this.implementation().saveCardsForBoards(boardId, card);
    };

    this.getCardsForBoards = function (boardId) {
        return this.implementation().getCardsForBoards(boardId);
    };


}

$(document).ready(function() {
    var id = -1;
    var storage = new myStorage();
    var boards = storage.getBoards();
    if (boards) {
        for (var i = 0; i < boards.length; i++) {
            $('.row').append('<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2"><button type="button" class="btn btn-primary btn-block board" id="' + boards[i].id + '">' + boards[i].title + '</button></div>')
        };
    }
    $('.cards-container').hide();
    $('#save_board').click(function() {
        var value = $(".form-control").val();
        if (value) {
            var board = fillBoardDetails();
            storage.saveBoard(board);
            $('#myModal').modal('hide');
            $(".form-control").val("");
            $('.row').append('<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2"><button type="button" class="btn btn-primary btn-block board" id="' + board.id + '">' + board.title +'</button></div>')
        } else {
           alert("fill title");
        }
    });

    $(document).on("click",".board", function () {
        $('.add-card').hide();
        $('.container').hide();
        $('.cards-container').show();
        // $('.navbar-brand').replaceWith('<a class="navbar-brand" href="#">BOARDS</a>')
        id = $(this).attr('id');
        var cardItems = storage.getCardsForBoards(id);
        if (cardItems) {
            for (var i = 0; i < cardItems.length; i++) {

                $('.list-group').append('<li class="list-group-item">' + cardItems[0].title + '</li>');
            }
        }
    });

    $('.card-link').click(function() {
        $('.card-link').hide();
        $('.add-card').slideDown(1000);
    });
    $('#save-card').click(function() {
        var value = $(".card-input").val();
        if (value) {
        var card = fillCardDetails(id);
        storage.saveCardsForBoards(id, card);
        $('.list-group').append('<li class="list-group-item">'+value+'</li>');
        $(".card-input").val("");
        } else {
           alert("fill card title");
        }
    });


    $('#cancel-card').click(function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
    });

    // $(document).on("click", ".navbar-brand", function () {
    //     $('.cards-container').hide();
    //     $('.navbar-brand').replaceWith('<a class="navbar-brand" href="#">PROMAN</a>')
    //     $('.container').show();
    // });


});

