var taskCounter = 1;
var userInput = "";
var isValue = 0;
var checked = '<i class="far fa-check-circle"></i>';

$(document).ready(function () {

    $('.task-input').focus();  //auto focus on element


    $('.input-btn').click(function () {
        userInput = $('.task-input').val();
        $('.task-input').val("");
        $('.task-' + taskCounter).html(userInput);
        $('.task-wrapper-' + taskCounter).removeClass('hide');
        taskCounter++;
    });

    //toggle input button on enter-key (value=13 (event.which))
    $('.task-input').keydown(function (event) {
        if (event.which === 13 && $('.task-input').val() != "") {
            userInput = $('.task-input').val();
            $('.task-input').val("");
            $('.task-' + taskCounter).html(userInput);
            $('.task-wrapper-' + taskCounter).removeClass('hide');
            taskCounter++;
        }
    });

    $('.btn-done').click(function () {
        isValue = $(this).attr("value");
        console.log(isValue);
        $('.task-' + isValue).addClass('trans');
        $('.btn-' + isValue).html(checked);
    });
});