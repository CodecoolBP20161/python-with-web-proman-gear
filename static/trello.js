
$(document).ready(function() {
    var id = -1;
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
            alertMessage('Please fill board title!');
        }
    });
    
    

    $(document).on("click",".board", function () {
       $('.add-card').hide();
        $('.container').hide();
        $('.cards-container').show();
        id = $(this).attr('id');
        var cardItems = storage.getCardsForBoards(id);
        if (cardItems) {
            for (var i = 0; i < cardItems.length; i++) {
                $('.list-group').append('<li class="list-group-item">' + cardItems[0].title + '</li>');
            }
        }
    });

    $('.card-link').click(function() {
        $('.card-link').hide();
        $('.add-card').slideDown(1000);
    });
    $('#save-card').click(function() {
        var value = $(".card-input").val();
        if (value) {
        var card = fillCardDetails(id);
        storage.saveCardsForBoards(id, card);
        $('.list-group').append('<li class="list-group-item">'+value+'</li>');
        $(".card-input").val("");
        } else {
            alertMessage('Please fill card title!');
        }
    });


    $('#cancel-card').click(function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
    });


});

