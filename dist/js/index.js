"use strict";

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
    // создаем таймер обратного отсчета

    const deadline = '2021-05-14';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };

    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),

            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {

            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    }
    setClock('.timer', deadline);

    // создаем модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');


    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });

    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    modalClose.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
});