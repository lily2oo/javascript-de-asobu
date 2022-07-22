const button = document.getElementById("addBtn");
let loadedList = 3;

// get event.json
async function getEvents() {
    const res = await fetch("../event.json");
    const events = await res.json();
    return events;
}

// make list
function makeList(event) {
    const lists = document.getElementById("list_wrapper");
    const list = document.createElement("li");
    list.setAttribute("class", "list_content");
    if (event.genre === "イベント情報") {
        list.innerHTML = `<p class="genre genre_event">${event.genre}</p><p class="title">${event.title}</p><p class="date">${event.date}</p>`;
    }
    if (event.genre === "お知らせ") {
        list.innerHTML = `<p class="genre genre_notice">${event.genre}</p><p class="title">${event.title}</p><p class="date">${event.date}</p>`;
    }
    lists.appendChild(list);
};

function sendPage(i, events) {
    const event = events[i];
    const content = document.createElement("li");
    content.innerHTML = `<p>${event.date}</p><p>successed</p>`;
    console.log(event);
}

// getID
function getId(events) {
    const list_content = document.getElementsByClassName("list_content");
    for (let i = 0; i < list_content.length; i++) {
        list_content[i].addEventListener("click", function () {
            console.log(i);
            setTimeout(jumpPage(i), 500);
        });
    };
};

// index
async function loadEvents() {
    const lists = document.getElementById("list_wrapper");
    const events = await getEvents();
    for (let i = 0; i < Object.keys(events).length; i++) {
        const event = events[i];
        makeList(event);
        if (i > 2) {
            lists.children[i].classList.add("close");
        }
    }
    console.log("get ready getIdevent");
    lists.addEventListener("click", getId(events));
}


function jumpPage(i) {
    window.location.href = `../page2.html?id=${i}`;
}

// upload by push button
async function listEvents() {
    const lists = document.getElementById("list_wrapper");
    const delta = 3;
    const events = await getEvents();
    if (loadedList <= Object.keys(events).length - 1) {
        // plus
        for (let i = loadedList; i < loadedList + delta; i++) {
            if (i <= Object.keys(events).length - 1) {
                lists.children[i].classList.remove("close");
            }
        };
        loadedList += delta;
    }
    // remove
    else {
        button.innerText = "close";
        for (let i = 0; i < lists.children.length; i++) {
            if (i > 2) {
                lists.children[i].classList.add("close");
            }
        };
        loadedList = 3;
        button.innerText = "MORE";
    }
}

window.addEventListener("load", loadEvents);
// button.addEventListener("click", listEvents);