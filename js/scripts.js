var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#1f1f1f',
    progressColor: '#efefef',
    cursorColor: '#db473d',
    scrollParent: false,
    cursorWidth: 1,
    responsive: true,
    height: 80,
    normalize: true
});

var state = 'stop'; //initialize the state
var tmp = document.getElementById("play-stop-button"); // variable used for handling the play/stop button
var playing_id = null; //initialize id of the currently playing song
var song_id = 0;    //id counter

function buttonPreviousPress() {
    //implementation required
}

function buttonNextPress() {
    //implementation required
}

function deleteFromPlaylist() {
    //implementation required
}

/*function for adding stuff to my playlist*/

function buttonAddPress() {
    if (playing_id != null) {
        var song = $("#" + $('#' + playing_id).parent().attr('id'));
        $("#playlist-top-header").after(song);
        fitElements();
    }
}

/*function for handling the play/stop button*/

function buttonPlayStopPress() {

    if (state == 'stop') {
        wavesurfer.on('ready', function () {
            wavesurfer.play();
            state = 'playing';
            tmp.classList.remove("fa-play");
            tmp.classList.add("fa-pause");
        });
    }

    else if (state == 'paused') {
        wavesurfer.play();
        state = 'playing';
        tmp.classList.remove("fa-play");
        tmp.classList.add("fa-pause");
    }

    else if (state == 'playing') {
        wavesurfer.pause();
        state = 'paused';
        tmp.classList.remove("fa-pause");
        tmp.classList.add("fa-play");
    }
}

/*function handling track selection*/

function selectTrack(id) {
    
/*  $("#" + id).click(function(e) {
        if($(e.target).is('.remove-song')) {
            e.preventDefault();
            $("#" + $("#" + id).parent().attr('id')).remove();
            //console.log($("#" + id).parent().attr('id'));
            return;
        }
    }); */

    wavesurfer.empty();
    wavesurfer.load(addToUrl(id));
    playing_id = id;
    console.log("Playing: " + id);

    wavesurfer.on('ready', function () {
        wavesurfer.play();

        if (state == "paused" || state == "stop") {
            state = 'playing';
            tmp.classList.remove("fa-play");
            tmp.classList.add("fa-pause");
        }
    });
    document.getElementById("p-song-name").innerText = document.getElementById(id).innerText.trim();
}

/*function for loading files from local storage*/ 

function parseBlob(s) {
    return s.slice(10);
}

function addToUrl(s) {
    return "blob:null/" + s;
}

function buttonLoadFile() {
    var x = document.getElementById("upload-input");
    for (var i = 0; i < x.files.length; i++) {
        var blob = URL.createObjectURL(x.files[i]);
        $('#playlist-local').after('<div class="col-12" id="song_' + song_id + '"><div class="song" id="' + parseBlob(blob) + '" onclick="selectTrack(this.id)"> <p><i class="far fa-trash-alt remove-song" id="bin-' + parseBlob(blob) + '"></i>' + x.files[i].name + '</p></div></div>');
        song_id += 1;
        fitElements();
    }
    
    blob.onload = function () {
        window.URL.revokeObjectURL(this.src);
    }
}

/* adjusting page on load/resize event*/

$(window).on("load resize", function () {
    fitElements();
});

/*following function justifies the elements in the playlist using padding*/

 function fitElements() {  
    var window_height = $(window).height();
    var header_height = $("#top-header").height();
    var controls_height = $("#controls-element").height();
    var space_available = window_height - header_height - controls_height;

    var playlist_elements_total_size = 0;
    var new_padding = 0;

    $('#scrollable-bar').children().each(function () {
        playlist_elements_total_size += $(this).height();
    });

    if (space_available >= playlist_elements_total_size) {
        new_padding = space_available - playlist_elements_total_size;
        $("#scrollable-bar").css("padding-bottom", new_padding - 1);
        $("#scrollable-bar").height(space_available - new_padding - 0.5);
    }
    
    if (space_available < playlist_elements_total_size) {
        $("#scrollable-bar").css("padding-bottom", 0);
        $("#scrollable-bar").height(space_available - 1);
    }
}