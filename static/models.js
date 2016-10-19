/**
 * Created by szilard on 2016.10.06..
 */
function Board(title, id) {
    this.title = title;
    this.id = id;
}

function generateUniqueId(callback){
    $.ajax({
        type: 'GET',
        url : '/api/uniqueBoard',
        success: function(response){
            callback(JSON.parse(response));
            console.log("successfully received: " + JSON.parse(response))
        },
        error: function(){
            console.log("Error reading data");
        }
    });
}

// function generateUniqueId(response){
//
//
//
//     var highestId = parseInt(localStorage.getItem('highestId')) || 0;
//     highestId++;
//     localStorage.setItem('highestId', highestId);
//     return highestId
// }

function fillBoardDetails() {
    var title = $('input').val();
    var id = generateUniqueId(function(highestId){
        if (highestId) {
            console.log(highestId)
            }
        });
    return new Board(title, id);
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
