const next_wrapper = document.getElementById("next_wrapper");
const button = document.getElementById("addBtn");

async function getEvents() {
    const res = await fetch("../event.json");
    const events = await res.json();
    return events;
}

async function getNext() {
    const res = await fetch("../next.json");
    const nexts = await res.json();
    return nexts;
}

async function loadEvents() {
    const events = await getEvents();
    const nexts = await getNext();
    next_wrapper.innerHTML = nexts[0].html;
    button.addEventListener("click", function () {
        console.log(nexts[0].html);
    });
};

window.addEventListener("load", loadEvents);