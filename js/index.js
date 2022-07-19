const button = document.getElementById("addBtn");
let loadedList = 3;

// get event.json
async function getEvents() {
    const res = await fetch("../event.json");
    const events = await res.json();
    return events;
}

// get next.json
async function getNext() {
    const res = await fetch("../next.json");
    const nexts = await res.json();
    return nexts;
}

// make list
function makeList(event) {
    const lists = document.getElementById("list_wrapper");
    const list = document.createElement("li");
    list.setAttribute("class", "list_content");
    list.innerHTML = `<h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p>`;
    lists.appendChild(list);
};

// upload to next.json
function sendPage(i, events, nexts) {
    const event = events[i];
    const next = nexts[0];
    const content = document.createElement("li");
    content.innerHTML = `<p>${event.date}</p><p>successed</p>`;
    next.html = content;
    console.log(event);
    console.log(next.html);
}

// getID
function getId(events, nexts) {
    const page_true = document.getElementById("page_true");
    const list_content = document.getElementsByClassName("list_content");
    for (let i = 0; i < list_content.length; i++) {
        list_content[i].addEventListener("click", function () {
            console.log(i);
            sendPage(i, events, nexts);
            setTimeout(jumpPage, 500);
        });
    };
};

// index
async function loadEvents() {
    const lists = document.getElementById("list_wrapper");
    const events = await getEvents();
    const nexts = await getNext();
    for (let i = 0; i < Object.keys(events).length; i++) {
        const event = events[i];
        makeList(event);
        if (i > 2) {
            lists.children[i].classList.add("close");
        }
    }
    console.log("get ready getIdevent");
    lists.addEventListener("click", getId(events, nexts));
}


function jumpPage() {
    window.location.href = '../next.html';
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
button.addEventListener("click", listEvents);