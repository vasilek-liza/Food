window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll(".tabheader__item"), //кнопка
        tabParent = document.querySelector(".tabheader__items"), //весь блок
        tabContent = document.querySelectorAll(".tabcontent"); //картинка
    function hide() {
        tabContent.forEach(item => {
            item.style.display = "none";
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function show(i) {
        tabContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hide();
    show(0);

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hide();
                    show(i);
                }
            });
        }
    });
});

// const deadline = "26-11-2020";

// function getTimeRemaining() {

//     const t = Data.parse(endTime) - new Data(),
//         days = Math.floor(t / (1000 * 60 * 60 * 24)),
//         hours = Math.floor((t / (1000 * 60 * 60) % 24)),
//         minutes = Math.floor((t / 1000 / 60) % 60),
//         seconds = Math.floor((t / 1000) % 60);
//     return {
//         "total": t,
//         "days": days,
//         "hours": hours,
//         "minutes": minutes,
//         "seconds": seconds,
//     };
// }

// function setClock(selector, endTime) {
//     const timer = document.querySelector(".timer"),
//         days = timer.querySelector("#day"),
//         hours = timer.querySelector("#hours"),
//         minutes = timer.querySelector("#minutes"),
//         seconds = timer.querySelector("#seconds"),

//         timeInterval = setInterval(updateClock, 1000);

//     function updateClock() {
//         const t = getTimeRemaining(endTime);
//         days.innerHTML = t.days;
//         hours.innerHTML = t.hours;
//         minutes.innerHTML = t.minutes;
//         seconds.innerHTML = t.seconds;


//     }


// }