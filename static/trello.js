
$(document).ready(function() {
    var id = -1;
    var storage = new MyStorage();
    var boards = storage.getBoards();
    $('.cards-container').hide();
    $('#navbar-back-board').hide();
    $('.board-display').hide();
    if (boards) {
        for (var i = 0; i < boards.length; i++) {
            createBoard(boards[i].id, boards[i].title);
        }
    }

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
        
    });

    $(document).on('click', '#save-card', function() {
        saveCard(id, storage);
    });

    $(document).on('click', '#cancel-card', function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
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
        storage.deleteBoard($boardId);
        $('.board#'+ $boardId).parent().remove();
        $('.close-btn#'+ $boardId).parent().remove();
    })

    $(document).on("click", ".close-card",  function () {
        $cardId = $(this).attr('id');
        $boardIdCard = $(this).attr('role');
        // console.log($boardIdCard);
        storage.deleteCard($boardIdCard, $cardId);
        $('.list-group-item#'+ $cardId).remove();
        $('.close-card#'+ $cardId).remove();
    })
});

    
