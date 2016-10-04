/**
 * Created by kakacsu on 2016.10.03..
 */
var Board = new Object();
Board.title = "";
Board.id = 0;

var highestId = localStorage.getItem('highestId') || 0;
function fillBoradDetails(){
    Board.id = highestId++;
    highestId = parseInt(highestId++);
    localStorage.setItem('highestId', highestId);
    Board.title = prompt("Please give a name to your board");
}
