var historyList = document.querySelector(".history");
var lastSoundName = document.querySelector("#last-sound-name");
// IMPORTANT: Do NOT add any more global variables. 
// TODO: Step 1a - Implement the function playSound.
// Make the audio element with the matching data-sound attribute play.
// Also, update the lastSoundName to display the name of the sound.
function playSound(sound) {
    var soundElm = document.querySelector("audio[data-sound='".concat(sound, "']"));
    soundElm.currentTime = 0; //restarts the sound
    soundElm.play();
    lastSoundName.textContent = sound;
}
// TEST: Step 1b - Confirm your playSound function works by clicking the h1.
// You may remove this testing code after confirming playSound works.
// TODO: Step 2a - Set up a listener for the "keydown" event. 
// Based on the key pressed, add the "playing" class 
// to the .drum element with matching data-key attribute.
// Then play the appropriate sound, based on its data-sound attribute.
// Ignore repeated key presses from held-down keys.
document.addEventListener("keydown", function (event) {
    if (event.repeat)
        return;
    if (event.key === "/") {
        historyList.classList.toggle("hidden");
    }
    else if (event.key === "?") {
        document.querySelectorAll("li").forEach(function (elem) {
            elem.remove();
        });
    }
    var elm = document.querySelector(".drum[data-key='".concat(event.key.toLowerCase(), "']"));
    if (!elm) {
        return;
    }
    if (elm.dataset.sound === null)
        return;
    elm.classList.add("playing");
    playSound(elm.dataset.sound);
    addToHistory(elm);
});
// TODO: Step 2b - Set up a listener for the "keyup" event. 
// Based on the key pressed, remove the "playing" class 
// from the .drum element with matching data-key attribute.
document.addEventListener("keyup", function (event) {
    if (event.repeat)
        return;
    var elm = document.querySelector(".drum[data-key='".concat(event.key.toLowerCase(), "']")) || null;
    if (!elm)
        return;
    elm.classList.remove("playing");
    //if (event.key)
});
// TODO: Step 3a - Implement the function handleClickDrum to be used for
// 'mousedown' events  on the .drum elements. Play the sound according 
// to the  data-sound attribute of clicked element.
function handleClickDrum(event) {
    var clickedElm = event.currentTarget;
    //lastSoundName.textContent = clickedElm.dataset.sound;
    playSound(clickedElm.dataset.sound);
    addToHistory(clickedElm);
}
// TEST: Step 3b - Confirm your playSound method is working via the
// following click listener that is attach to the first .drum element.
// **Remove this testing code after confirming playSound works.**
// TODO: Step 4 - Register handleClickDrum as the mousedown event listener
// for ALL .drum elements. Use the document.querySelectorAll() and .forEach() methods
// to do so with no repetitious code
document.querySelectorAll(".drum").forEach(function (elem) {
    elem.addEventListener("click", handleClickDrum);
});
// TODO: Step 5a - Implement addToHistory below.
// Add a new <li> element to the historyList
// The content of the <li> element should be the same as the given 
// drum's data-key attribute.
// Each <li> element should also have an anonymous click handler that plays 
// the drum's matching sound.
function addToHistory(drum) {
    var lielm = document.createElement("li");
    lielm.textContent = drum.dataset.key;
    historyList.appendChild(lielm);
    lielm.addEventListener("click", function (event) {
        playSound(lielm.dataset.sound);
    });
}
// TODO: Step 5b - Add calls to addToHistory in both the 
// 'keydown' listener and handleClickDrum
// TODO: Step 6a - Add some code to the 'keydown' listener that
// toggles the class "hidden" for the historyList when "/" is typed.
// This should cause the history to become invisible/visible.
// HINT: Use the classList.toggle() method, rather than .add() or .remove()
// TODO: Step 6b - Add some code to the 'keydown' listener  when '?' is hit so that causes
// all the <li> elements to be removed, clearing the history.
// HINT: Use the document.querySelectorAll and .forEach methods again!
