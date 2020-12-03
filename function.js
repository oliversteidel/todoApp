


$(document).ready(function () {

    //###############################
    //MyTasks Funkionalität START
    //###############################


    var loadKey;

    loadTasks();

    $('.task-input').focus();

    function addTask() {
        var userInput = $('.task-input').val();
        $('.task-input').val("");
        $('.task-container').append('<p class="task todo">' + userInput + '</p>');
    }

    function saveTasks() {
        //speichert alle tasks die nicht erledigt sind und somit die klasse "todo" haben
        if ($('p').hasClass('todo')) {
            $('.todo').each(function (index) {
                localStorage.setItem(index, $(this).text());
                loadKey = index;
            });

            localStorage.setItem("loadKey", loadKey); //loadKey = index der letzten task in der Liste
        }
        //löscht alle tasks aus dem speicher die erledigt sind oder aus der liste gelöscht wurden
        for (var i = (loadKey + 1); i <= 20; i++) {
            localStorage.removeItem(i);
            let temp = localStorage.getItem(i);
            if (temp === null) {
                break;
            }
        }
    }

    function loadTasks() {
        loadKey = localStorage.getItem("loadKey");

        if (loadKey !== null) {
            for (var i = 0; i <= loadKey; i++) {
                $('.task-container').append('<p class="task todo">' + localStorage.getItem(i) + '</p>');
            };
        }
    }

    //Auswählen der aktiven Karte und automatischer focus auf dessen input
    $('.tab').click(function () {
        $(this).parent().addClass('active-card');
        $(this).parent().removeClass('underneath');
        $('.tab').not(this).parent().removeClass('active-card');
        $('.tab').not(this).parent().addClass('underneath');
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
    //automatische Speicherung aller Tasks bis auf die erledigten - diese werden aus dem speicher gelöscht
    $('body').on('click', '.task', function () {        
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

    var removeMode = false;

    // easytimer.js integration

    var timer1 = new Timer();
    var timer2 = new Timer();
    var timer3 = new Timer();
    var timer4 = new Timer();

    timer1.addEventListener('secondsUpdated', function (e) {
        $('.project-time-1').html(timer1.getTimeValues().toString())
    });

    timer2.addEventListener('secondsUpdated', function (e) {
        $('.project-time-2').html(timer2.getTimeValues().toString())
    });

    timer3.addEventListener('secondsUpdated', function (e) {
        $('.project-time-3').html(timer3.getTimeValues().toString())
    });

    timer4.addEventListener('secondsUpdated', function (e) {
        $('.project-time-4').html(timer4.getTimeValues().toString())
    });

    $('.project1-btn-start').click(function () {
        var hours = +localStorage.getItem('hours1');
        var minutes = +localStorage.getItem('minutes1');
        console.log("loaded minutes: " + minutes);
        if (localStorage.getItem('hours1') === null && localStorage.getItem('minutes1') === null) {
            timer1.start();
            console.log("neuer timer gestartet");
        } else {
            timer1.start({ startValues: { hours, minutes } });
            console.log("timer gestartet mit werten aus dem speicher");
        }
    });

    $('.project1-btn-stop').click(function () {
        timer1.pause();
        let saveTime = timer1.getTimeValues();
        console.log(saveTime);
        localStorage.setItem('hours1', saveTime.hours);
        localStorage.setItem('minutes1', saveTime.minutes);
    });

    $('.project2-btn-start').click(function () {
        var hours = +localStorage.getItem('hours2');
        var minutes = +localStorage.getItem('minutes2');
        if (localStorage.getItem('hours2') === null && localStorage.getItem('minutes2') === null) {
            timer2.start();
        } else {
            timer2.start({ startValues: { hours, minutes } });
        }
    });

    $('.project2-btn-stop').click(function () {
        timer2.pause();
        let saveTime = timer2.getTimeValues();
        localStorage.setItem('hours2', saveTime.hours);
        localStorage.setItem('minutes2', saveTime.minutes);
    });

    $('.project3-btn-start').click(function () {
        var hours = +localStorage.getItem('hours3');
        var minutes = +localStorage.getItem('minutes3');
        if (localStorage.getItem('hours3') === null && localStorage.getItem('minutes3') === null) {
            timer3.start();
        } else {
            timer3.start({ startValues: { hours, minutes } });
        }
    });

    $('.project3-btn-stop').click(function () {
        timer3.pause();
        let saveTime = timer3.getTimeValues();
        localStorage.setItem('hours3', saveTime.hours);
        localStorage.setItem('minutes3', saveTime.minutes);
    });

    $('.project4-btn-start').click(function () {
        var hours = +localStorage.getItem('hours4');
        var minutes = +localStorage.getItem('minutes4');
        if (localStorage.getItem('hours4') === null && localStorage.getItem('minutes4') === null) {
            timer4.start();
        } else {
            timer4.start({ startValues: { hours, minutes } });
        }
    });

    $('.project4-btn-stop').click(function () {
        timer4.pause();
        let saveTime = timer4.getTimeValues();
        localStorage.setItem('hours4', saveTime.hours);
        localStorage.setItem('minutes4', saveTime.minutes);
    });

    //neues project hinzufügen, for-loop prüft ob project-spalten leer sind
    //neues project wird der ersten leeren spalte hinzugefügt
    function addProject() {
        var userInputTimer = $('.project-input').val();
        $('.project-input').val("");

        for (let i = 1; i <= 4; i++) {
            if ($('.project' + i).html() === "") {
                $('.project' + i).html(userInputTimer);
                break;
            } else if ($('.project4').html() !== "") {
                alert("Lots of projects you're working on! Consider finishing one before you start a new one?");
                break;
            }
        }
        $('.project-input').focus();
    }

    function saveProjects() {
        for (let i = 1; i <= 4; i++) {
            localStorage.setItem('project' + i, $('.project' + i).html());
        }
    }

    function loadProjects() {
        for (let i = 1; i <= 4; i++) {
            var item = localStorage.getItem('project' + i);
            if (item !== null) {
                $('.project' + i).html(item);
            }
        }
    }


    loadProjects();

    $('.timer-input-btn').click(function () {
        if ($('.timer-input').val() != "") {
            addProject();
            saveProjects();
        }
    });

    $('.btn-remove-project').click(function () {
        if (!removeMode) {
            removeMode = true;
            $('.timer-container').addClass('remove-mode');
        } else {
            removeMode = false;
            $('.timer-container').removeClass('remove-mode');
        }
    });

    $('.project').click(function () {
        if (removeMode) {
            var getClass = this.classList.item(1);
            var timeNumber = getClass.charAt(getClass.length - 1);
            $(this).html("");
            localStorage.removeItem(getClass);
            localStorage.removeItem('minutes' + timeNumber);
            localStorage.removeItem('hours' + timeNumber);
            removeMode = false;
            $('.timer-container').removeClass('remove-mode');
            $('.project-time-' + timeNumber).html("");

        }

    });






});