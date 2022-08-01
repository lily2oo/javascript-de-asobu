const button = document.getElementById("addBtn");
const lists = document.getElementById("list_wrapper");
const motals = document.getElementById("motal_wrapper");
let loadedList = 3;

// make list
function addList(event) {
    const list = document.createElement("li");
    list.innerHTML = `<h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p>`;
    lists.appendChild(list);
};

// make motal
function addMotal(event) {
    const motal = document.createElement("div");
    motal.innerHTML = `<h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p>`;
    motals.appendChild(motal);
}

// async await
async function getEvents() {
    const res = await fetch("event.json");
    const events = await res.json();
    return events;
}

// index
async function loadEvents() {
    const events = await getEvents();
    for (let i = 0; i < loadedList; i++) {
        const event = events[i];
        addList(event);
        addMotal(event);
    }
}

// upload
async function listEvents() {
    const delta = 3;
    const events = await getEvents();
    // plus
    for (let i = loadedList; i < loadedList + delta; i++) {
        if (i <= Object.keys(events).length - 1) {
            const event = events[i];
            addList(event);
            addMotal(event);
        }
    };
    loadedList += delta;

    // remove
    if (loadedList > Object.keys(events).length - 1) {
        button.innerText = "close";
        for (let i = 0; i < lists.children.length; i++) {
            if (i > 2) {
                lists.children[i].classList.add("close");
                motals.children[i].classList.add("close");
            }
        };
        let closes = document.querySelectorAll('.close');
        for (const close of closes) {
            close.remove();
        }
        loadedList = 3;
        button.innerText = "open";
    }
}

window.addEventListener("load", loadEvents);
button.addEventListener("click", listEvents);