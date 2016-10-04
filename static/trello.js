function Board(title, id) {
    this.title = title
    this.id = id
}

function generateUniqueId(){
    var highestId = parseInt(localStorage.getItem('highestId')) || 0;
    highestId++;
    localStorage.setItem('highestId', highestId);
    return highestId
}

function fillBoardDetails(){
    var title = prompt("Please give a name to your board");
    var id = generateUniqueId()
    var newBoard = new Board(title, id);
}
