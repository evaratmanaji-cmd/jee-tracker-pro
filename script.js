const themeToggle =
    document.getElementById(
        "themeToggle"
    );
const chapterInput = document.getElementById("chapterInput");
const chapterList = document.getElementById("chapterList");
const subjectSelect =
    document.getElementById("subjectSelect");
    const searchInput =
    document.getElementById("searchInput");
let totalChapters = 0;
let completedChapters = 0;
let chapters = [];
let streak = 1;
function updateAnalytics() {

    let physicsTotal = 0;
    let physicsDone = 0;

    let chemistryTotal = 0;
    let chemistryDone = 0;

    let mathsTotal = 0;
    let mathsDone = 0;

    chapters.forEach(chapter => {

        if (chapter.subject === "Physics") {

            physicsTotal++;

            if (chapter.completed)
                physicsDone++;
        }

        if (chapter.subject === "Chemistry") {

            chemistryTotal++;

            if (chapter.completed)
                chemistryDone++;
        }

        if (chapter.subject === "Maths") {

            mathsTotal++;

            if (chapter.completed)
                mathsDone++;
        }

    });

    document.getElementById("physicsStats").textContent =
        `Physics: ${physicsDone} / ${physicsTotal}`;

    document.getElementById("chemistryStats").textContent =
        `Chemistry: ${chemistryDone} / ${chemistryTotal}`;

    document.getElementById("mathsStats").textContent =
        `Maths: ${mathsDone} / ${mathsTotal}`;
        const physicsPercent =
    physicsTotal > 0
        ? (physicsDone / physicsTotal) * 100
        : 0;

const chemistryPercent =
    chemistryTotal > 0
        ? (chemistryDone / chemistryTotal) * 100
        : 0;

const mathsPercent =
    mathsTotal > 0
        ? (mathsDone / mathsTotal) * 100
        : 0;

document.getElementById(
    "physicsBar"
).style.width =
    physicsPercent + "%";

document.getElementById(
    "chemistryBar"
).style.width =
    chemistryPercent + "%";

document.getElementById(
    "mathsBar"
).style.width =
    mathsPercent + "%";
}
function updateStreak() {

    const today =
        new Date().toDateString();

    const lastVisit =
        localStorage.getItem(
            "lastVisit"
        );

    streak =
        Number(
            localStorage.getItem(
                "streak"
            )
        ) || 1;

    if (!lastVisit) {

        localStorage.setItem(
            "lastVisit",
            today
        );

        localStorage.setItem(
            "streak",
            streak
        );

    } else {

        const lastDate =
            new Date(lastVisit);

        const currentDate =
            new Date(today);

        const difference =
            Math.floor(
                (
                    currentDate -
                    lastDate
                ) /
                (
                    1000 * 60 * 60 * 24
                )
            );

        if (difference === 1) {
            streak++;
        }
        else if (difference > 1) {
            streak = 1;
        }

        localStorage.setItem(
            "lastVisit",
            today
        );

        localStorage.setItem(
            "streak",
            streak
        );
    }

    document.getElementById(
        "streakCount"
    ).textContent = streak;
}
function updateStats() {

    let progress = 0;

    if (totalChapters > 0) {
        progress = Math.round(
            (completedChapters / totalChapters) * 100
        );
    }
    if (progress === 100) {

    setTimeout(() => {

        alert(
            "🎉 Congratulations!\nYou completed all chapters!"
        );

    }, 500);

}

    document.getElementById("totalCount").textContent =
        totalChapters;

    document.getElementById("completedCount").textContent =
        completedChapters;

    document.getElementById("progressCount").textContent =
        progress + "%";
        const circle =
    document.getElementById(
        "circleProgress"
    );

const circumference =
    314;

const offset =
    circumference -
    (progress / 100) *
    circumference;

circle.style.strokeDashoffset =
    offset;

    document.getElementById("progressBar").style.width =
        progress + "%";
        updateAnalytics();
}
function saveData() {

    localStorage.setItem(
        "jeeTrackerData",
        JSON.stringify(chapters)
    );

}
function createChapter(subject, chapterName, isCompleted = false) {

    const li = document.createElement("li");

    li.dataset.chapter =
        chapterName.toLowerCase();

    li.dataset.subject =
        subject.toLowerCase();

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const badge =
        document.createElement("span");

    badge.textContent = subject;

    if (subject === "Physics") {

        badge.style.background =
            "#3b82f6";

    } else if (
        subject === "Chemistry"
    ) {

        badge.style.background =
            "#a855f7";

    } else {

        badge.style.background =
            "#22c55e";

    }

    badge.style.padding =
        "4px 10px";

    badge.style.borderRadius =
        "20px";

    badge.style.color =
        "white";

    badge.style.fontSize =
        "12px";

    badge.style.fontWeight =
        "bold";

    const chapterText =
        document.createElement("div");

    chapterText.textContent =
        chapterName;

    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "🗑";

    const leftSide =
        document.createElement("div");

    leftSide.style.display =
        "flex";

    leftSide.style.alignItems =
        "center";

    leftSide.style.gap =
        "12px";

    const textContainer =
        document.createElement("div");

    textContainer.style.display =
        "flex";

    textContainer.style.flexDirection =
        "column";

    textContainer.style.gap =
        "6px";

    textContainer.appendChild(
        badge
    );

    textContainer.appendChild(
        chapterText
    );

    leftSide.appendChild(
        checkbox
    );

    leftSide.appendChild(
        textContainer
    );

    li.appendChild(leftSide);

    li.appendChild(deleteButton);

    li.style.display =
        "flex";

    li.style.justifyContent =
        "space-between";

    li.style.alignItems =
        "center";

    li.style.padding =
        "12px";

    li.style.marginTop =
        "10px";

    li.style.borderRadius =
        "12px";

    li.style.background =
        "rgba(255,255,255,0.08)";

    li.style.border =
        "1px solid rgba(255,255,255,0.15)";

    li.style.color =
        "white";

    li.style.transition =
    "all 0.4s ease";

    li.addEventListener(
        "mouseenter",
        function () {

            li.style.transform =
                "translateY(-3px)";

        }
    );

    li.addEventListener(
        "mouseleave",
        function () {

            li.style.transform =
                "translateY(0px)";

        }
    );

    if (isCompleted) {

        chapterText.style.textDecoration =
            "line-through";

    }

    checkbox.addEventListener(
        "change",
        function () {

            const chapterObject =
                chapters.find(
                    c =>
                        c.subject === subject &&
                        c.chapter === chapterName
                );

            if (checkbox.checked) {

                completedChapters++;

                chapterText.style.textDecoration =
                    "line-through";

                if (chapterObject) {

                    chapterObject.completed =
                        true;

                }

            } else {

                completedChapters--;

                chapterText.style.textDecoration =
                    "none";

                if (chapterObject) {

                    chapterObject.completed =
                        false;

                }

            }

            updateStats();
            saveData();

        }
    );

    deleteButton.addEventListener(
        "click",
        function () {

            if (checkbox.checked) {

                completedChapters--;

            }

            totalChapters--;

            chapters =
                chapters.filter(
                    c =>
                        !(
                            c.subject === subject &&
                            c.chapter === chapterName
                        )
                );

           li.style.opacity = "0";

li.style.transform =
    "translateX(100px)";

setTimeout(() => {

    li.remove();

}, 300);

            updateStats();
            saveData();

        }
    );

    chapterList.appendChild(li);
    li.style.opacity = "0";
li.style.transform =
    "translateY(15px)";

setTimeout(() => {

    li.style.opacity = "1";

    li.style.transform =
        "translateY(0px)";

}, 50);

    totalChapters++;

    if (isCompleted) {

        completedChapters++;

    }

    updateStats();

}
function addChapter() {

    const chapterName =
        chapterInput.value;

    const subject =
        subjectSelect.value;

    if (chapterName === "") {
        alert("Please enter a chapter");
        return;
    }

    chapters.push({
        subject: subject,
        chapter: chapterName,
        completed: false
    });

    createChapter(
        subject,
        chapterName,
        false
    );

    saveData();

    chapterInput.value = "";
}
function searchChapters() {

    const query =
        searchInput.value.toLowerCase();

    const allChapters =
        chapterList.children;

    for (let chapter of allChapters) {

        const chapterName =
            chapter.dataset.chapter;

        const subjectName =
            chapter.dataset.subject;

        if (
            chapterName.includes(query) ||
            subjectName.includes(query)
        ) {

            chapter.style.display = "flex";

        } else {

            chapter.style.display = "none";
        }
    }
}
function loadData() {

    const savedData =
        localStorage.getItem(
            "jeeTrackerData"
        );

    if (!savedData) return;

    chapters =
        JSON.parse(savedData);

    chapters.forEach(chapter => {

        createChapter(
            chapter.subject,
            chapter.chapter,
            chapter.completed
        );

    });

}
loadData();
updateStreak();
searchInput.addEventListener(
    "input",
    searchChapters
);
themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light-mode"
        );

    }
);
localStorage.setItem(
    "theme",
    document.body.classList.contains(
        "light-mode"
    )
);
if (
    localStorage.getItem("theme")
    === "true"
) {

    document.body.classList.add(
        "light-mode"
    );

}