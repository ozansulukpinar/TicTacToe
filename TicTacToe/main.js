var userClicks = [];
var computerClicks = [];
var correctClicks = [["00", "01", "02"], ["10", "11", "12"], ["20", "21", "22"], ["00", "10", "20"], ["01", "11", "21"], ["02", "12", "22"], ["00", "11", "22"], ["02", "11", "20"]];
var boxes = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
var numberOfCorrectArrays = correctClicks.length;
var lengthOfArray = boxes.length;

$(".column").click(function () {
    var elementId = $(this).attr('id');
    $(this).html("X");
    $(this).css({ 'cssText': 'font-size:3.9rem' });
    $(this).css("pointer-events", "none");

    userClicks.push(elementId);
    userClicks.sort();

    var index = boxes.indexOf(elementId);
    boxes.splice(index, 1);
    lengthOfArray--;

    var result = IsGameOver(userClicks, 1);

    if (result === true) {
        return;
    }

    ClickByComputer(boxes, lengthOfArray);
});

function GetRandomNumber(limit) {
    var randomNumber = Math.floor(Math.random() * limit);
    return randomNumber;
};

function ClickByComputer(array, length) {
    var number = GetRandomNumber(length);
    var computerElementId = array[number];

    var box = $('#' + computerElementId + '');
    box.html("O");
    box.css({ 'cssText': 'font-size:3.9rem' });
    box.css("pointer-events", "none");

    computerClicks.push(computerElementId);
    computerClicks.sort();

    var indexII = array.indexOf(computerElementId);
    array.splice(indexII, 1);
    lengthOfArray--;

    var result = IsGameOver(computerClicks, 2);

    if (result === true) {
        return;
    }
}

function IsGameOver(clicks, number) {
    let checkIt = (arr, target) => target.every(v => arr.includes(v));

    var arrayLength = clicks.length;

    if (arrayLength >= 3) {
        for (k = 0; k < numberOfCorrectArrays; k++) {
            var result = checkIt(clicks, correctClicks[k]);

            if (result === true) {
                if (number === 1) {
                    alert("You win!");
                    break;
                }
                else {
                    alert("Machines are rising up!");
                    break;
                }
            }
        }

        if (result === true) {
            location.reload();
        }

        if (result === false && arrayLength === 5) {
            location.reload();
        }
    }

    return result;
}