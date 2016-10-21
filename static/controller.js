//state pattern to store variables to database
function MyDatabaseStorage() {

    //ajax request for all boards from the database
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

    //ajax request to save new board to DB
    this.saveBoard = function(boardTitle) {
        $.ajax({
            type: 'POST',
            url : '/api/boards',
            data : JSON.stringify({'title': boardTitle}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent data")
            },
            error: function(){
                console.log("Error sending data");
            }
        });
    };

    //ajax request to get card for given board
    this.getCardsForBoards = function(callback, boardId) {
        $.ajax({
            type: 'GET',
            url : '/api/board/'+boardId+'/cards',
            success: function(response){
                callback(JSON.parse(response));
                console.log("successfully received: " + JSON.parse(response))
            },
            error: function(){
                console.log("Error reading data");
            }
        });
    };

    // ajax request to save new card to DB
    this.saveCardsForBoards = function(boardId, card) {
        var boards = this.getBoards(document.getBoardsCallback);
        $('.board').parent().hide();
        $('.board').parent().empty();
        $.ajax({
            type: 'POST',
            url : '/api/board/'+boardId+'/cards',
            data : JSON.stringify({'title': card}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent data")
            },
            error: function(){
                console.log("Error sending data");
            }
        });
    };

    //ajax request to remove board from DB
    this.deleteBoard = function(boardId) {
        $.ajax({
            type: 'DELETE',
            url : '/api/boards/'+ boardId,
            data : JSON.stringify({"id":boardId}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent data")
            },
            error: function(){
                console.log("Error sending data");
            }
        });
    };

    //ajax request to update DB for board
    this.updateBoard = function(boardId, newTitle) {
        $.ajax({
            type: 'PUT',
            url : '/api/boards/'+ boardId,
            data : JSON.stringify({"id":boardId, "title":newTitle}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent new title")
            },
            error: function(){
                console.log("Error sending new title");
            }
        });
    };

    //ajax request to update DB for card
    this.updateCard = function (boardId, cardId, newTitle) {
     $.ajax({
            type: 'PUT',
            url : '/api/board/'+ boardId+'/cards/'+cardId,
            data : JSON.stringify({"title":newTitle}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent new title")
            },
            error: function(){
                console.log("Error sending new title");
            }
        });
    };

    //ajax request to remove card from DB
    this.deleteCard = function(boardId, cardId) {
        $('.list-group-item#'+ cardId).remove();
        $.ajax({
            type: 'DELETE',
            url : '/api/board/'+ boardId+'/cards/'+cardId,
            data : JSON.stringify({"boardid":boardId, "cardid":cardId}),
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(){
                console.log("Successfully sent data")
            },
            error: function(){
                console.log("Error sending data");
            }
        });
    };
}

//state pattern
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

    this.getCardsForBoards = function (callback, boardId) {
        return this.implementation().getCardsForBoards(callback, boardId);
    };

    this.deleteBoard = function (boardId) {
        return this.implementation().deleteBoard(boardId);
    };

    this.updateBoard = function(boardId, newTitle) {
        return this.implementation().updateBoard(boardId, newTitle);
    };

    this.deleteCard = function (boardId, cardId) {
        return this.implementation().deleteCard(boardId, cardId);
    };
    
    this.updateCard = function(boardId, cardId, newTitle) {
        return this.implementation().updateCard(boardId, cardId, newTitle);
    };
}

//save new board
var saveBoard = function(storage){
        var value = $(".form-control").val();
        if (value) {
            var title = $('input').val();
            $('.board').parent().hide();
            $('.board').parent().empty();
            storage.saveBoard(title);
            $('#myModal').modal('hide');
            $(".form-control").val("");
            storage.getBoards(document.getBoardsCallback);
        } else {
            alertMessage('Please fill board title!');
        }
};

//show board's cards
var board = function (id, storage) {
    $('.add-card').hide();
    $('.container').hide();
    $('.cards-container').show();
    $('.list-group-item').remove();
    storage.getCardsForBoards(document.getCardsForBoardsCallback, id);
};

//save new card
var saveCard = function (id, storage) {
    var value = $(".card-input").val();
    if (value) {
        storage.saveCardsForBoards(id, value);
        $('.list-group-flush').empty();
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
        storage.getCardsForBoards(document.getCardsForBoardsCallback, id);
        $(".card-input").val("");
    } else {
        alertMessage('Please fill card title!');
    }

};

//modal for remove confirmation
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

//modal for remove confirmation
var cardDeleteConfirm = function (storage, boardId, cardId) {
    $(function() {
        bootbox.confirm({
            size: "small",
            message: "Are you sure?",
            callback: function(result){
                if (result){
                    storage.deleteCard( boardId, cardId);
                    }
                $('.list-group-item#'+ $cardId).hide();
            }
        });
    });
};
