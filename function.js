
var userInput = "";
var loadKey;

$(document).ready(function () {

    loadTasks();

    $('.task-input').focus();

    function addTask() {
        userInput = $('.task-input').val();
        $('.task-input').val("");        
        $('.task-container').append('<p class="task todo">' + userInput + '</p>');
    }

    function saveTasks() {
        localStorage.clear();

        if ($('p').hasClass('todo')) {
            $('.todo').each(function (index) {
                localStorage.setItem(index, $(this).text());
                loadKey = index;
            });

            localStorage.setItem("loadKey", loadKey);
        }
    }

    function loadTasks() {
        loadKey = localStorage.getItem("loadKey");
        
        if (loadKey !== null) {
            for (let i = 0; i <= loadKey; i++) {
                $('.task-container').append('<p class="task todo">' + localStorage.getItem(i) + '</p>');
            };
        }
    }

    $('.input-btn').click(function () {
        if ($('.task-input').val() != "") {
            addTask();
            saveTasks();
        }
    });

    $(".task-input").keydown(function (event) {
        if (event.which === 13 && $(".task-input").val() != "") {
            addTask();
            saveTasks();
        }
    });

    $('body').on('click', '.task', function () {
        $(this).css('opacity', '0.5');
        $(this).addClass('checked');
        $(this).removeClass('todo');
        saveTasks();
    });

    $('.btn-clear-done').click(function () {
        $('.checked').remove();
    });

    $('.btn-save-tasks').click(function () {
        saveTasks();
    });
});