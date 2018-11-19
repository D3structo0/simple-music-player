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

function buttonPreviousPress() {
    console.log("Button PREVIOUS invoked.");
}

function buttonNextPress() {
    console.log("Button NEXT invoked.");
}

var song_id = 0;

function buttonAddPress() {
    console.log("Button ADD invoked.");
    //get the right name of the song, etc
    $('#playlist-top-header').after('<div class="col-12"><div class="song" id="my-playlist-song-' + song_id + '" onclick="selectTrack(this.id)"> <p>Song name - Number ' + song_id + '</p></div></div>');
    song_id +=1;
    fitElements();
    //fitElements();
}

var state = 'stop';
var tmp = document.getElementById("play-stop-button");

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

    else if (state == 'playing'){
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

    wavesurfer.on('ready', function () {   
        wavesurfer.play(); 
        
        if (state == "paused" || state == "stop") {
            state ='playing';  
            tmp.classList.remove("fa-play");
            tmp.classList.add("fa-pause");
        }
    });

    document.getElementById("p-song-name").innerText = document.getElementById(id).innerText.trim();
}

var local_id = 0;

function buttonLoadFile() {
    var x = document.getElementById("upload-input");
    for (var i = 0; i < x.files.length; i++) {
        var blob = URL.createObjectURL(x.files[i]);
        console.log(blob);
        $('#playlist-local').after('<div class="col-12"><div class="song" id="' + blob + '" onclick="selectTrack(this.id)"> <p>' + x.files[i].name + '</p></div></div>');
        
        fitElements();
        
        blob.onload = function() {
            window.URL.revokeObjectURL(this.src);
          }
    }
    console.log("Upload button invoked");
}

$(window).on("load resize", function() {
    fitElements();
    fitElements(); //for some reason calling this function twice solves occasional glitch
});

/*Following function justifies the elements in the playlist using padding*/

function fitElements() {
    var new_padding = $(window).height() - $("#top-header").height() - $("#controls-element").height() - $("#scrollable-bar").height() - parseFloat($("#scrollable-bar").css("padding-top"), 10);
    var new_height = $(window).height() - $("#top-header").height() - $("#controls-element").height() ;
    
    if (new_padding > 0 && $(window).height() >= ($("#top-header").height() + $("#controls-element").height() + $("#scrollable-bar").height() + parseFloat($("#scrollable-bar").css("padding-top"), 10)))  {
         $("#scrollable-bar").css("padding-bottom", new_padding-1);
    }
    else if (new_height > 0){
        $("#scrollable-bar").css("padding-bottom", 0);
        $("#scrollable-bar").height(new_height-0.5);
    }
}