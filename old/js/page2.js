const main = document.getElementById("main_content");
const date = document.getElementById("date");
const genre = document.getElementById("genre");
const title = document.getElementById("title");
const button = document.getElementById("addBtn");
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getEvents() {
    const res = await fetch("../event.json");
    const events = await res.json();
    return events;
}

async function loadEvents() {
    const events = await getEvents();
    const event = events[id];
    date.innerHTML = event.date;
    genre.innerHTML = event.genre;
    if (event.genre === "イベント情報") {
        genre.setAttribute("class", "genre_event")
    }
    if (event.genre === "お知らせ") {
        genre.setAttribute("class", "genre_notice")
    }
    title.innerHTML = event.title;
    for (let i = 0; i < Object.keys(event.text).length; i++) {
        console.log(i);
        const content = document.createElement("p");
        content.innerHTML = `<p>${event.text[i]}</p>`;
        main.appendChild(content)
    }
};

window.addEventListener("load", loadEvents);