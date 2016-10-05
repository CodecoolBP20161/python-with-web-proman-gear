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

function myLocalStorage() {

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
        $('.row').append('<div class="col-sm-3"><button type="button" class="btn btn-primary btn-block board" id="' + board.id + '">' + board.title +'</button></div>')
    });
    // $('.board').click(function() {
    //     $('.container').hide();
    // });
    $(document).on("click",".board", function () {
        $('.container').hide();
        var id = $('.board').attr('id');
        // console.log(id);


    })

});