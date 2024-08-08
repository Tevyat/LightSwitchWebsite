var switches = document.getElementsByClassName("switch");
var toggle = new Audio("lightswitch.mp3");
var states = ["on", "off"];
const backDoor = [
    ["on", "on", "off", "off"]
    ["off", "off", "on", "on"]
    ["on", "on", "off", "off"]
    ["off", "off", "on", "on"]
];

function generateGrid() {
    const randomGrid = [];

    for (let i = 0; i < 4; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
            const randomState = states[Math.floor(Math.random() * states.length)];
            row.push(randomState);
        }
        randomGrid.push(row);
    }
    return randomGrid;
}

var correctStates = generateGrid();
console.log(correctStates);

for (var i = 0; i < switches.length; i++) {
    switches[i].src = "off.png";
    switches[i].addEventListener("click", changeState);
}

function changeState() {
    toggle.play()
    if(this.getAttribute("data-name") == "off") { this.src="on.png"; this.setAttribute("data-name", "on"); } 
    else { this.src="off.png"; this.setAttribute("data-name", "off"); }
    checkState();
}

function changeEverything() {
    console.log("YOU WIN");
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (!arraysEqual(a[i], b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

function checkState() {
    var currentGrid = [];
    for (let i = 0; i < 4; i++) {
        const row = Array.from(switches).slice(i * 4, (i + 1) * 4);
        currentGrid.push(row.map(switchElement => switchElement.getAttribute("data-name")));
    }
    if(arraysEqual(currentGrid, correctStates) || arraysEqual(currentGrid, backDoor)) {
        changeEverything();
    } 
}

var position = document.documentElement;

function updatePosition(x, y) {
    position.style.setProperty('--x', x + "px");
    position.style.setProperty('--y', y + "px");
}

function setInitialPosition() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    updatePosition(centerX, centerY);
}

window.addEventListener('load', setInitialPosition);

position.addEventListener('mousemove', e => {
    updatePosition(e.clientX, e.clientY);
});

position.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

position.addEventListener('touchmove', e => {
    if (e.touches.length === 1) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });