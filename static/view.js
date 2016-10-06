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
        return $('.row').append('<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 col-xl-2"><button type="button"' +
            ' class="btn btn-primary btn-block board" id="' + id + '">' + title +'<button type="button" class="close close-btn" data-dismiss=btn-primary aria-hidden="true">&times;</button></button></div>')
    };

var createCard = function (title) {
        return $('.list-group').append('<li class="list-group-item">' + title + '<button type="button" class="close close-card" data-dismiss=list-group-item aria-hidden="true">&times;</button></li>'
            );
    };
