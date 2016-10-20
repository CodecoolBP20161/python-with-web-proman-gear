document.getBoardsCallback = function(boards){
    if (boards) {
        for (var i = boards.length-1; i >= 0; i--) {
            createBoard(boards[i].id, boards[i].title);
        }
    }
};

document.getCardsForBoardsCallback = function(cardItems){
    //console.log("EZ?"+cardItems)
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


    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();
    });

    $(document).on('click', '#save_board', function() {
        saveBoard(storage);
    });

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
        // $(this).find('[autofocus]').focus();
        // $('#title').focus();

    });

    $(document).on('click', '#save-card', function() {
        saveCard(id, storage);
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

    // $(".navbar-proman").click( function() {
    //     console.log("fuck");
    //     $('#proman').popover('toggle', placement="bottom");
    // })

    $(document).on("click", ".close-btn",  function () {
        $boardId = $(this).attr('id');
        boardDeleteConfirm(storage);
    });

    $(document).on("click", ".close-card",  function () {
        $cardId = $(this).attr('id');
        $boardIdCard = $(this).attr('role');
        console.log($cardId + " " + $boardIdCard);
        cardDeleteConfirm(storage,id, $cardId);
        
        $('.cards-container').hide();
        $('.cards-container').show();
        $('.card-link').show();
    });

    $(document).on("click", ".board-pencil", function(){
        var boardName = $(this).attr('id');
        $('.board-title').val(boardName);
        $('#myModal').modal("show");


    });

    $(document).on("click", ".card-pencil", function(){
        var cardName = $(this).attr('id');
        $('.card-input').val(cardName);
        $('.add-card').slideDown(1000);
        $('.add-card').find('[autofocus]').focus();
        console.log(cardName);
    });

});
