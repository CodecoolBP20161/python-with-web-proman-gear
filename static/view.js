/**
 * Created by szilard on 2016.10.06..
 */
var alertMessage = function (label) {
        var alert = '<div class="alert alert-dismissible alert-warning"> ' +
                '<button type="button" class="close" data-dismiss="alert">&times;</button> ' +
                '<strong>'+label+'</strong></div>';
            $(alert).insertAfter(".form-control");
            setTimeout(function() {
                $(".alert-warning").remove();
                }, 2000);     
    };

var createBoard = function (id, title) {
        return $('.row').append('<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">' +
            '<button type="button"' + ' class="btn btn-primary btn-block board" id="' + id + '" role="' + title + '">' + title +'' +
            '<button type="button" id="' + id + '"class="close close-btn" data-dismiss=btn-primary aria-hidden="true">&times;</button>' +
            '<a href="#" class="board-pencil" id="'+title+'"><span class="glyphicon glyphicon-pencil" id="' + id + '"></span></a></button></div>')
    };

var createCard = function (id, title, location) {
        return $('.list-group').append('<li class="list-group-item" id="' + id + '">' + title + '' +
            '<button type="button" role="' + location + '" id="' + id + '"class="close close-card" data-dismiss=list-group-item aria-hidden="true">' +
            '&times;</button><a href="#" class="card-pencil" id="'+title+'"><span class="glyphicon glyphicon-pencil" id="' + id + '"></span></a></li>'
            );
    };

var displayBoardTitle = function(title) {
        return $('#board-title').replaceWith('<h2 id="board-title">' + title + '</h2>');
    };