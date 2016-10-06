
$(document).ready(function() {
    var id = -1;
    var storage = new myStorage();
    var boards = storage.getBoards();
    $('.cards-container').hide();
    $('.navbar-back-boards').hide();
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
        $('.navbar-back-boards').show();
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

    $(document).on("click", ".navbar-header",  function () {
        $('.cards-container').hide();
        $('.container').show();
        $('.navbar-back-boards').hide();
    });
});

