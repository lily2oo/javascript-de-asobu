const button = document.getElementById("addBtn");
const lists = document.getElementById("list_wrapper");
const list_content = document.getElementsByClassName("list_content");
let loadedList = 3;

// async await
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

// make list
function addList(event) {
    const list = document.createElement("li");
    list.setAttribute("class", "list_content");
    // list.innerHTML = `<h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p>`;
    list.innerHTML = `<h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p>`;
    lists.appendChild(list);
};

// index
async function loadEvents() {
    const events = await getEvents();
    const nexts = await getNext();
    for (let i = 0; i < loadedList; i++) {
        const event = events[i];
        addList(event);
        setAttribute("c")
    }
    console.log("loadEvent");
    getId(events, nexts);
}

// upload
async function listEvents() {
    const delta = 3;
    const events = await getEvents();
    if (loadedList <= Object.keys(events).length - 1) {
        // plus
        for (let i = loadedList; i < loadedList + delta; i++) {
            if (i <= Object.keys(events).length - 1) {
                const event = events[i];
                addList(event);
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
        let closes = document.querySelectorAll('.close');
        for (const close of closes) {
            close.remove();
        }
        loadedList = 3;
        button.innerText = "MORE";
    }
}

// getID
function getId(events, nexts) {
    const page_true = document.getElementById("page_true");
    if (page_true !== null) {
        page_true.removeAttribute("id");
    }
    for (let i = 0; i < list_content.length; i++) {
        list_content[i].addEventListener("click", function () {
            list_content[i].setAttribute("id", "page_true");
            console.log(i);
            sendPage(i, events, nexts);
            // setTimeout(jumpPage, 500);
        });
    };
};

function jumpPage() {
    window.location.href = '../next.html';
}

function sendPage(i, events, nexts) {
    const event = events[i];
    const next = nexts[0];
    console.log(event);
    // const event = events[id];
    const content = document.createElement("li");
    content.innerHTML = `<p>${event.date}</p><p>successed</p>`;
    // list.innerHTML = `<a href="next.html"><h3 class="date">${event.date}</h3><p class="class">${event.class}</p><p class="text">${event.text}</p><p class="update">${event.update}</p></a>`;
    next.html = content;
    console.log(next.html);
}

window.globalFunction = {};
window.globalFunction.send = sendPage;



window.addEventListener("load", loadEvents);
button.addEventListener("click", listEvents);