const pagesContainer = document.getElementById("pages-container");
const cusor = document.getElementById("cursor");

pagesContainer.addEventListener("mousemove", (event) => {
    if (event.target.tagName == "CANVAS") {
        cusor.style.left = `${event.clientX}px`;
        cusor.style.top = `${event.clientY}px`;
    }
    else {
        cusor.style.left = `-100px`;
        cusor.style.top = `-100px`;
    }
});

pagesContainer.addEventListener("mouseleave", (event) => {
    cursor.style.left = `-100px`;
    cursor.style.top = `-100px`;
});