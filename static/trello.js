
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
           var alert = '<div class="alert alert-dismissible alert-warning"> ' +
                '<button type="button" class="close" data-dismiss="alert">&times;</button> ' +
                '<strong>Please fill board title!</strong></div>';
            $(alert).insertAfter(".form-control");
            setTimeout(function() {
                $(".alert-warning").remove();
                }, 2000);
            setTimeout();
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
            var alert = '<div class="alert alert-dismissible alert-warning"> ' +
                '<button type="button" class="close" data-dismiss="alert">&times;</button> ' +
                '<strong>Please fill card title!</strong></div>';
            $(alert).insertAfter(".card-input");
            setTimeout(function() {
                $(".alert-warning").remove();
                }, 2000);
            setTimeout();

        }
    });


    $('#cancel-card').click(function() {
        $('.add-card').slideUp(900);
        $('.card-link').show(1000);
    });


});

