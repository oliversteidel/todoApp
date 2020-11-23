


$(document).ready(function () {

    //###############################
    //MyTasks Funkionalität START
    //###############################

    var userInput = "";
    var loadKey;

    loadTasks();

    $('.task-input').focus();

    function addTask() {
        userInput = $('.task-input').val();
        $('.task-input').val("");        
        $('.task-container').append('<p class="task todo">' + userInput + '</p>');
    }

    function saveTasks() {
        localStorage.clear();  // !!ACHTUNG!! - ändern wenn andere Karteninhalte gespeichert werden müssen

        if ($('p').hasClass('todo')) {
            $('.todo').each(function (index) {
                localStorage.setItem(index, $(this).text());
                loadKey = index;
            });

            localStorage.setItem("loadKey", loadKey); //loadKey = anzahl der tasks
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

    //Auswählen der aktiven Karte und automatischer focus auf dessen input
    $('.tab').click(function () {
        $(this).parent().addClass('active-card');
        $('.tab').not(this).parent().removeClass('active-card');
        $(this).siblings('.input-container').children().focus();
    });

    //hinzufügen einer neuen task per klick auf den "new" button
    //automatische Speicherung aller Tasks
    $('.task-input-btn').click(function () {
        if ($('.task-input').val() != "") {
            addTask();
            saveTasks();
        }
    });

    //hinzufügen einer neuen task per enter-taste
    //automatische Speicherung aller Tasks
    $(".task-input").keydown(function (event) {
        if (event.which === 13 && $(".task-input").val() != "") {
            addTask();
            saveTasks();
        }
    });

    //per klick auf Task ist diese erledigt:
    //-transparenz auf 50% / -grüner Haken als pseudo element (.checked::before)
    //automatische Speicherung aller Tasks bis auf die erledigte - diese wird aus dem speicher gelöscht
    $('body').on('click', '.task', function () {
        $(this).css('opacity', '0.5');
        $(this).addClass('checked');
        $(this).removeClass('todo');
        saveTasks();
    });

    //alle erledigten tasks werden aus dem DOM entfernt
    $('.btn-clear-done').click(function () {
        $('.checked').remove();
    });

    $('.btn-save-tasks').click(function () {
        saveTasks();
    });
    //###############################
    //MyTasks Funkionalität END
    //###############################


    
    //###############################
    //MyTimer Funkionalität START
    //###############################


    function addProject() {
        let userInputTimer = $('.project-input').val();
        $('.project-input').val("");        
        $('.timer-container').append('<p class="project">' + userInputTimer + '</p>');
    }


    $('.timer-input-btn').click(function () {
        if ($('.timer-input').val() != "") {
            addProject();
            
        }
    });

    //hinzufügen einer neuen task per enter-taste
    //automatische Speicherung aller Tasks
    $(".timer-input").keydown(function (event) {
        if (event.which === 13 && $(".timer-input").val() != "") {
            addProject();
            
        }
    });



    
});