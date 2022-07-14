// To do:
/*
> On key press, do various
*/

// Vars

// Sounds
var s_kick_06 = new Audio('sounds/kick_06.wav');
s_kick_06.volume = 0.6;
var s_clap_02 = new Audio('sounds/clap_02_v2.wav');
s_clap_02.volume = 0.6;
var s_hat_ch2 = new Audio('sounds/hat_ch2_v2.wav');
s_hat_ch2.volume = 0.6;
var s_metronome = new Audio('sounds/clap_02_v2.wav'); // /metronome.mp3
s_metronome.volume = 0.6; // 1.0
var s_synth_keys = new Audio('sounds/synth_keys.mp3');
var s_synth_lead = new Audio('sounds/synth_lead.mp3');
var s_synth_pad = new Audio('sounds/synth_pad.mp3');
//for(let i = 0; i < )

// Key map
var keys_white = [
    'z','x','c','v','b','n','m',
    'q','w','e','r','t','y','u','i','o','p','[',']'
];
var keys_white_map = [
    0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31
]
var keys_black = [
    's','d','','g','h','j','',
    '2','3','','5','6','7','','9','0','','='
];
var keys_black_map = [
    1,3,-1,6,8,10,-1,13,15,-1,18,20,22,-1,25,27,-1,30
]

// Play note
function playNote(inl, isblack) {
    var thiskeyid = -1;
    if(isblack) {
        thiskeyid = keys_black_map[keys_black.indexOf(inl)];
    } else {
        thiskeyid = keys_white_map[keys_white.indexOf(inl)];
    }
    var newkey = new Audio('sounds/synth_keys/k'+thiskeyid+'.wav');
    newkey.currentTime = 0;
    newkey.play();
    /*s_synth_keys.pause();
    s_synth_keys.mozPreservesPitch = false;
    s_synth_keys.webkitPreservesPitch = false;
    s_synth_keys.preservesPitch = false;
    s_synth_keys.currentTime = 0;
    s_synth_keys.playbackRate = 1;
    // Determine playback rate / pitch based on inl
    var thisindex = keys_white.indexOf(inl)+0.0;
    thisindex /= 10;
    thisindex += 1;
    thisindex -= 0.2;
    s_synth_keys.playbackRate = thisindex;
    s_synth_keys.play();*/
}

// Key input checks
var keys = {};
window.addEventListener('keydown',
    function(e) {
        var l = e.key.toLowerCase();
        if(keys[l] != true) {
            keys[l] = true;
            // Try playing note, if it exists
            if(keys_white.includes(l)) {
                playNote(l, false);
            } else if(keys_black.includes(l)) {
                playNote(l, true);
            }
        }
        if(['Space', 'ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false
);
window.addEventListener('keyup',
    function(e) {
        var l = e.key.toLowerCase();
        keys[l] = false;
        if(['Space', 'ArrowUp', 'ArrowDown'].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false
);

function keyMatches(inkey) {
    return inkey in keys;
}
/*window.addEventListener('keyup',
    function(e) {
        var l = e.key.toLowerCase();
        keys[l] = false;
    }, false
);*/

// Event handlers
document.addEventListener("DOMContentLoaded", function(event) {
    // Buttons
    //document.getElementById("resets").onclick = resetall;
});

// Notify
function notify() {
    alert('You have been notified.')
}

// Loop
setInterval(gameLoop, 10);

function gameLoop() {
    // Input
    input();
    // Render
    render();
}

function input() {
    var inputs = [];
    // Get inputs based on controls
    if(keys['arrowdown']) { inputs.push('dr1'); keys['arrowdown'] = false; } // kick
    if(keys['arrowleft']) { inputs.push('dr2'); keys['arrowleft'] = false; } // clap
    if(keys['arrowright']) { inputs.push('dr3'); keys['arrowright'] = false; } // hat
    //this.document.getElementById('status').innerText = '(dbg) Total inputs: '+inputs.length;
    // Depending on inputs
    if(inputs.includes('dr1')) {
        // Play drum 1
        dr1();
    }
    if(inputs.includes('dr2')) {
        // Play drum 2
        dr2();
    }
    if(inputs.includes('dr3')) {
        // Play drum 3
        dr3();
    }
}

function render() {
    // Render keys based on ones pressed
    var canvas = document.getElementById('canvas-keys');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var key_white_width = 16;
    var key_height = 50;
    var key_black_width = 7;
    // White keys
    for(let i = 0; i < keys_white.length; i++) {
        ctx.fillStyle = 'white';
        // Is depressed?
        var offsy = 0;
        if(keys[keys_white[i]]) {
            ctx.fillStyle = '#3fa5d1';
            offsy -= 2;
        }
        // Render
        ctx.fillRect(i*key_white_width, 0, key_white_width-2, key_height+offsy);
    }
    // Black keys
    for(let i = 0; i < keys_black.length; i++) {
        if(keys_black[i] == '') { continue; } // No key here
        ctx.fillStyle = 'black';
        // Is depressed?
        var offsy = 0;
        if(keys[keys_black[i]]) {
            ctx.fillStyle = '#2868a8';
            offsy -= 1;
        }
        // Render
        ctx.fillRect(i*key_white_width + key_white_width/2+key_black_width/2, 0, key_black_width, key_height*0.7+offsy);
    }
}

// Drums
function dr1() {
    s_kick_06.pause();
    s_kick_06.currentTime = 0;
    s_kick_06.play();
}
function dr2() {
    s_clap_02.pause();
    s_clap_02.currentTime = 0;
    s_clap_02.play();
}
function dr3() {
    s_hat_ch2.pause();
    s_hat_ch2.currentTime = 0;
    s_hat_ch2.play();
}

// Metronome
var thisbpm = 130;
var thisinterval2;/* = setInterval(function() {
    // Play metronome sound
    s_metronome.pause();
    s_metronome.currentTime = 0;
    s_metronome.play();
}, (1/thisbpm)*60*1000);*/

document.getElementById('bpmin').onchange = function() {
    try {
        if(isFinite(parseInt(document.getElementById('bpmin').value)) && document.getElementById('bpmin').value >= 20) {
            thisbpm = parseInt(document.getElementById('bpmin').value);
            console.log(thisbpm);
            try { clearInterval(thisinterval2); } catch(err) { }
            thisinterval2 = setInterval(function() {
                // Play metronome sound
                s_metronome.pause();
                s_metronome.currentTime = 0;
                s_metronome.play();
            }, (1/thisbpm)*60*1000);
        }
    } catch(err) { }
}