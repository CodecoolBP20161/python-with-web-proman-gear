
$(document).ready(function() {
    var id = -1;
    var storage = new MyStorage();
    var boards = storage.getBoards();
    $('.cards-container').hide();
    $('#navbar-back-board').hide();
    if (boards) {
        for (var i = 0; i < boards.length; i++) {
            createBoard(boards[i].id, boards[i].title);
        }
    }

    $('#save_board').click(function() {
        saveBoard(storage);
    });

    $(document).on("click",".board", function () {
        $('.add-card').hide();
        $('.container').hide();
        $('.cards-container').show();
        $('.card-link').show();
        $('#navbar-back-board').show();
        id = $(this).attr('id');
        board(id, storage);
    });

    $('.card-link').click(function() {
        $('.card-link').hide();
        $('.add-card').slideDown(1000);
        
    });

    $('#save-card').click(function() {
        saveCard(id, storage);
    });

    $('#cancel-card').click(function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
    });

    $(document).on("click", "#navbar-back-board",  function () {
        $('.cards-container').hide();
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

    
