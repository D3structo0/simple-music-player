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

var state = 'stop';
var tmp = document.getElementById("play-stop-button");
var playing_id = '';
var fav_num = 0;

function buttonPreviousPress() {
    console.log("Button PREVIOUS invoked.");
    //implement later
}

function buttonNextPress() {
    console.log("Button NEXT invoked.");
    //implement later
}

function buttonAddPress() {
    console.log("Button ADD invoked. " + playing_id);
    $("#playlist-top-header").appendTo('<div class="col-12" id="fav' + fav_num + '">');
    fav_num += 1;
    $("#fav" + playing_id).appendTo("#fav"+ fav_num);
    //('<div class="col-12"><div class="song" id="' + playing_id + '" onclick="selectTrack(this.id)"> <p> ' + $(playing_id).innerText + '</p></div></div>');
    fitElements();
    //fitElements();
}

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
    console.log("Button PLAY/STOP invoked, music is " + state);
}

function selectTrack(id) {
    wavesurfer.empty();
    wavesurfer.load(id);
    playing_id = id;
    console.log(playing_id);

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

function buttonLoadFile() {
    var x = document.getElementById("upload-input");
    for (var i = 0; i < x.files.length; i++) {
        var blob = URL.createObjectURL(x.files[i]);
        $('#playlist-local').after('<div class="col-12"><div class="song" id="' + blob + '" onclick="selectTrack(this.id)"> <p><i class="far fa-trash-alt" id="remove-song"></i>' + x.files[i].name + '</p></div></div>');
        fitElements();

        blob.onload = function () {
            window.URL.revokeObjectURL(this.src);
        }
    }
    console.log("Upload button invoked");
}

$(window).on("load resize", function () {
    fitElements();
    fitElements(); //for some reason calling this function twice solves occasional glitch
});

/*Following function justifies the elements in the playlist using padding, need check*/

function fitElements() {
    var new_padding = $(window).height() - $("#top-header").height() - $("#controls-element").height() - $("#scrollable-bar").height() - parseFloat($("#scrollable-bar").css("padding-top"), 10);
    var new_height = $(window).height() - $("#top-header").height() - $("#controls-element").height();

    if (new_padding > 0 && $(window).height() > ($("#top-header").height() + $("#controls-element").height() + $("#scrollable-bar").height() + parseFloat($("#scrollable-bar").css("padding-top"), 10))) {
        $("#scrollable-bar").css("padding-bottom", new_padding - 0.5);
        //$("#scrollable-bar").height(new_height - 0.5);
    }
    else if (new_height > 0) {
        $("#scrollable-bar").css("padding-bottom", 0);
        $("#scrollable-bar").height(new_height - 0.5);
    }
}