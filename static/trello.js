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
    var title = $('input').val();
    var id = generateUniqueCardId();
    var cardLocation = board.id;
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

    this.saveCardsForBoards = function(boardId, card) {
        var cards = this.getCardsForBoards(boardId);
        //todo: mindig csak rész lekérséek vannak nem az egész ezért mindig más lesz a localstorage kiegészítés + az egészet kell visszadni
        if (cards){
            cards.push(card);
            console.log("cards2:   " + cards[0].id+" "+cards[1].id);
        } else {
            //todo: itt van a hiba átnézni mikor mit ad vissza getcards adja vissza az egészet ha nincs találat
            //todo: az id szerepel  másodlagos kulcs ként???
            var cards = {};
            cards[boardId] = [card];
            console.log("cards:   " + cards[boardId][0].cardLocation);
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

    this.saveCardsForBoards = function (board) {
        return this.implementation().saveCardsForBoards(board);
    };

    this.getCardsForBoards = function () {
        return this.implementation().getCardsForBoards();
    };


}

$(document).ready(function() {
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
    // $('.board').click(function() {
    //     $('.container').hide();
    // });
    $(document).on("click",".board", function () {
       $('.add-card').hide();
        $('.container').hide();
        $('.cards-container').show();
        var id = $(this).attr('id');
        // var title = $('input').val();
        // var title = prompt("Add title here");
        // var id = generateUniqueCardId();
        // var cardLocation = $(this).attr('id');
        // var newCard = new Card(title, id, cardLocation)
        // console.log(newCard.title + newCard.id + newCard.cardLocation);
    });

    $('.card-link').click(function() {
        $('.card-link').hide();
        $('.add-card').slideDown();
    });

    $('#cancel-card').click(function() {
        $('.add-card').slideUp(1000);
        $('.card-link').show(1000);
    });

var card1 = new Card('egy', 1, 2);
var card2 = new Card('ket', 2, 2);
var card3 = new Card('ha', 3, 3);

var localStore = new MyLocalStorage();
    console.log("fuck");
localStore.saveCardsForBoards("2", card1);
localStore.saveCardsForBoards("2", card2);
// localStore.saveCardsForBoards("3", card3);
console.log(localStore.getCardsForBoards("2"));
});

