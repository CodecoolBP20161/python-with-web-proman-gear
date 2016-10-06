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
            setTimeout();
        
    };