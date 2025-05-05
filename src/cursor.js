import { globalBrushSettings } from "./script.js";

const pagesContainer = document.getElementById("pages-container");
// const cusor = document.getElementById("cursor");

console.log(globalBrushSettings);
console.log(cursor)

pagesContainer.addEventListener("mousemove", (event) => {
    console.log(globalBrushSettings);
    if (event.target.tagName == "CANVAS") {
        cursor.style.backgroundColor = globalBrushSettings.brushColor;
        cursor.style.width = `${globalBrushSettings.brushSize}px`;
        cursor.style.height = `${globalBrushSettings.brushSize}px`;
        cursor.style.borderRadius = globalBrushSettings.brushShape == "round" ? "50%" : "0%";
        cursor.style.outline = `1px solid ${globalBrushSettings.borderColor}`;
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.style.transform = `translate(-50%, -50%)`;
    }
    else {
        cursor.style.left = `-100px`;
        cursor.style.top = `-100px`;
    }
});

pagesContainer.addEventListener("mouseleave", (event) => {
    cursor.style.left = `-100px`;
    cursor.style.top = `-100px`;
});