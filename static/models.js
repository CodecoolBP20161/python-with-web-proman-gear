/**
 * Created by szilard on 2016.10.06..
 */
 function Board(title) {
     this.title = title;
 }

function generateUniqueId(callback){
    $.ajax({
        type: 'GET',
        url : '/api/uniqueboard',
        success: function(response){
            callback(JSON.parse(response))
            console.log("successfully received: " + JSON.parse(response))
        },
        error: function(){
            console.log("Error reading data");
        }
    });
}



function fillBoardDetails() {
    var title = $('input').val();
    return new Board(title);
}

function Card(title, id, cardLocation) {
    this.title = title;
    this.id = id.toString();
    this.cardLocation = cardLocation.toString();
}

function generateUniqueCardId(){
    var highestCardId = parseInt(localStorage.getItem('highestCardId')) || 0;
    highestCardId++;
    localStorage.setItem('highestCardId', highestCardId);
    return highestCardId
}

function fillCardDetails(board) {
    var title = $('.card-input').val();
    var id = generateUniqueCardId();
    var cardLocation = board;
    return new Card(title, id, cardLocation);
}
