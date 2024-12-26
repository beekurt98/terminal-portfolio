import { commentsDiv } from "./terminal.js";

function dragElement(element, draggablePartClass) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector(draggablePartClass).onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let terminalDiv = document.querySelector(".terminal-div");
let terminalMin = document.querySelector(".terminal-minimized");

let closeBtn = document.querySelector(".x");
closeBtn.addEventListener("click", () => {
    terminalDiv.style.visibility = "hidden";
    commentsDiv.innerHTML = "";
})
let minimizeBtn = document.querySelector(".s")
minimizeBtn.addEventListener("click", () => {
    terminalDiv.style.visibility = "hidden";
    terminalMin.style.visibility = "visible";
})

terminalMin.addEventListener("click", () => {
    terminalDiv.style.visibility = "visible";
    terminalMin.style.visibility = "hidden";
})

let terminalLogo = document.querySelector(".termlogo");

dragElement(document.querySelector(".terminal-div"), ".terminal-header");
dragElement(document.querySelector(".termlogo"), ".termSvg");

terminalLogo.addEventListener("dblclick", () => {
    terminalDiv.style.visibility = "visible";
    terminalLogo.classList.remove("termlogo-clicked");
})

document.addEventListener("click", (e) => {
    if (e.target === terminalLogo) {
        terminalLogo.classList.add("termlogo-clicked");
    } else {
        terminalLogo.classList.remove("termlogo-clicked");
    }
})