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

var board1 = new Board('egy', 1);
var board2 = new Board('ketto', 2);
var board3 = new Board('harom', 3);

var testObject = [board1, board2, board3];
localStorage.setItem('boards', JSON.stringify(testObject));

function myLocalStorage() {

    this.getBoards= function() {
        var boardList = localStorage.getItem('boards');
        boardList = JSON.parse(boardList);
        return boardList;
    };

    this.saveBoard = function(board) {
        var boards = this.getBoards();
        boards.push(board);
        localStorage.setItem('boards', JSON.stringify(boards));
    };
}



function myStorage() {

    this.implementation = function () {
        return new myLocalStorage();
    };

    this.saveBoard = function (board) {
        return this.implementation().saveBoard(board);
    };

    this.getBoards = function () {
        return this.implementation().getBoards();
    };
}

$(document).ready(function() {
    $('#save_board').click(function() {
        var board = fillBoardDetails();
        var storage = new myStorage()
        storage.saveBoard(board);
        $('#myModal').modal('hide');
        $('.row').append('<div class="col-sm-3"><button type="button" class="btn btn-primary btn-block">' + board.title +'</button></div>')
    });
});