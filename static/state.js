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