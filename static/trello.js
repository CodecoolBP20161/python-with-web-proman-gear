//create board from api data
document.getBoardsCallback = function(boards){
    if (boards) {
        for (var i = boards.length-1; i >= 0; i--) {
            createBoard(boards[i].id, boards[i].title);
        }
    }
};

//create cards from api data
document.getCardsForBoardsCallback = function(cardItems){

    if (cardItems) {
        for (var i = 0; i < cardItems.length; i++) {
            createCard(cardItems[i].id, cardItems[i].title, cardItems[i].cardLocation);
        }
    }
};

$(document).ready(function() {
    var id = -1;
    var storage = new MyStorage();
    storage.getBoards(document.getBoardsCallback);
    $('.cards-container').hide();
    $('#navbar-back-board').hide();
    $('.board-display').hide();

    //activate autofocus for modal
    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();
    });

    //save card on save button
    $(document).on('click', '#save_board', function() {
        saveBoard(storage);
    });

    $(document).on("click","#new-board", function () {
        $('#edit_board').hide();
        $('#save_board').show();
        $('.board-title').val("");
    });

    //hide boards and display cards if you click on board
    $(document).on("click",".board", function () {
        $title = $(this).attr('role');
        console.log($title);
        displayBoardTitle($title);
        $('.add-card').hide();
        $('.container').hide();
        $('.board-display').show();
        $('.cards-container').show();
        $('.card-link').show();
        $('#navbar-back-board').show();
        id = $(this).attr('id');
        board(id, storage);
    });


    $(document).on('click', '.card-link', function() {
        $('.card-link').hide();
        $('.add-card').slideDown(1000);
        $('#edit-card').hide();
        $('#save-card').show();
    });

    $(document).on('click', '#save-card', function() {
        saveCard(id, storage);
        $('.list-group-flush').empty();
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
        storage.getCardsForBoards(document.getCardsForBoardsCallback, id);
    });

    $(document).on('click', '#cancel-card', function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
        $(".card-input").val("");
    });

    $(document).on("click", "#navbar-back-board",  function () {
        $('.cards-container').hide();
        $('.board-display').hide();
        $('.container').show();
        $('#navbar-back-board').hide();
    });

    //delete board with confirm
    $(document).on("click", ".close-btn",  function () {
        $boardId = $(this).attr('id');
        boardDeleteConfirm(storage);
    });

    //delete card with confirm
    $(document).on("click", ".close-card",  function () {
        $cardId = $(this).attr('id');
        $boardIdCard = $(this).attr('role');
        cardDeleteConfirm(storage,id, $cardId);
        $('.cards-container').hide();
        $('.cards-container').show();
        $('.card-link').show();
    });

    //edit board title
    $(document).on("click", ".board-pencil", function(){
        var boardName = $(this).attr('id');
        var boardid = $(this).attr('data-board');
        // var oldTitle = $('.board-title').val(boardName);
        $('#edit_board').show();
        $('#save_board').hide();
        $('#myModal').modal("show");
        //update board title and display
        $(document).on('click', '#edit_board', function() {
            var newTitle = $('.board-title').val();
            if (newTitle !== boardName && newTitle.trim() != "") {
                storage.updateBoard(boardid, newTitle);
            }
            $('#myModal').modal("hide");
            $('.board').parent().remove();
            $('.close-btn').parent().remove();
            $('.board-title').val(" ");
            storage.getBoards(document.getBoardsCallback);
        });
    });

    //edit card title
    $(document).on("click", ".card-pencil", function(){
        var cardName = $(this).attr('id');
        var cardId = $(this).attr('data-card');
        $('.card-input').val(cardName);
        $('.add-card').slideDown(1000);
        $('#edit-card').show();
        $('#save-card').hide();
        $('.add-card').find('[autofocus]').focus();
        //update card title and display
        $(document).on('click', '#edit-card', function() {
            var newTitle = $('.card-input').val();
            console.log("NEW "+newTitle+"OLD "+cardName);
            if (newTitle != cardName && newTitle.trim() != "") {
                storage.updateCard(id, cardId, newTitle);
            }
            $('.list-group-flush').empty();
            $('.add-card').slideUp(900);
            $('.card-link').show(1000);
            $('.card-input').val("");
            storage.getCardsForBoards(document.getCardsForBoardsCallback, id);
        });
    });
});
