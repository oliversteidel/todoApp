
var userInput = "";
var inputArr = [];

$(document).ready(function () {

    $('.task-input').focus();

    function addTask() {
        userInput = $('.task-input').val();
        $('.task-input').val("");
        inputArr.push(userInput);
        $('.task-container').append('<p class="task">' + userInput + '</p>');
    }

    $('.input-btn').click(function () {
        if ($('.task-input').val() != "") {
            addTask();
        }
    });

    $(".task-input").keydown(function (event) {
        if (event.which === 13 && $(".task-input").val() != "") {
            addTask();
        }
    });

    $('body').on('click', '.task', function () {
        $(this).css('opacity', '0.5');
        $(this).addClass('checked');
    });

    $('.btn-clear-done').click(function () {
        $('.checked').remove();
    });


});