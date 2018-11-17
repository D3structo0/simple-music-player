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

function buttonAddPress() {
    console.log("Button ADD invoked.");
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
    wavesurfer.load('http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');

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

function buttonLoadFile() {
    var x = document.getElementById("upload-input");
    // if (x.files.length == 1) {
    //    console.log(x.files[0].name);
    //     wavesurfer.loadBlob('https://fiddle.jshell.net/199a7c29-24e0-413d-b41c-c2a85f845089');     
    // } 
    console.log("Upload button invoked");
}

// $(window).ready(function() {
//         fitElements();
// });


$(window).on("load resize", function() {
     fitElements();
});

// $(window).resize(function() {
//     fitElements();
// });

function fitElements() {
    var new_height = $(window).height() - $("#top-header").height() - $("#controls-element").height() ;
    if (new_height > 0) {
        $("#scrollable-bar").height(new_height-1);
    }
    console.log("Window resized " + $(window).height() + " " + $("#scrollable-bar").height() + " " + new_height);
}