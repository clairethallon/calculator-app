$(document).ready(onReady);

function onReady() {
    console.log('in onReady');

    getMath();

    $(`.firstNumButton`).on('click', assignFirstNum);
    $(`#equalsButton`).on('click', addMath);
    $(`#clearButton`).on('click', clearInput);
    $(`.operationButton`).on('click', assignOperator);
    $(`.on`).on('click', assignOperator);
}

let firstnum = '';
let secondnum = '';
let operatorAssigned = '';



function inputNumberDisplay() {

    $(`#displayedInput`).empty();
    $(`#displayedInput`).append(`${firstnum} ${operatorAssigned} ${secondnum}`)
}

function assignFirstNum() {
    if (operatorAssigned != '') {
        assignSecondNum(($(this).val()));
        return false;
    }

    console.log('in assignfirstNum');
    firstnum += ($(this).val());
    inputNumberDisplay();
}
function assignSecondNum(input) {
    console.log('in assignSecondNum');
    secondnum += input;
    inputNumberDisplay();
}


function assignOperator() {

    if (firstnum === '') {
        firstnum = '0';
    }

    $(`.on`).removeClass();
    operatorAssigned = $(this).val();
    console.log(operatorAssigned);
    $(this).toggleClass("on");
    inputNumberDisplay();
}

function getMath() {
    console.log('in getMath')
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then(function (response) {
        console.log('back from server with:', response);
        let el = $(`#mathOutput`);
        el.empty();
        for (let i = 0; i < response.length; i++) {
            el.append(`<div>${response[i].firstNum} ${response[i].operation} ${response[i].secondNum} = ${response[i].answer}</div>`);
        }
    }).catch(function (err) {
        console.log('something went wrong in getMath', err);
        alert('uh oh. something went wrong in getMath');
    })
}
function addMath() {

    console.log('in addMath');
    let objectToSend = {
        firstNum: firstnum,
        secondNum: secondnum,
        operation: operatorAssigned
    }
    if (objectToSend.firstNum === '' || objectToSend.secondNum === '' || objectToSend.operation === undefined) {
        alert('please enter all fields');
        return false;
    }

    console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: objectToSend
    }).then(function (response) {
        console.log('back from post', response);
        clearInput();
        getMath()
    }).catch(function (err) {
        lert('something is no workie in addMath');
        console.log(err);
    })
}


function clearInput() {

    console.log('clearInput');
    firstnum = '';
    secondnum = '';
    operatorAssigned = '';
    inputNumberDisplay();
    $(`.on`).removeClass();
}



