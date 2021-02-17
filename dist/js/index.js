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
        modal = document.querySelector('.modal');


    function openModel() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModel);
    });


    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });
    const timeId = setTimeout(openModel, 3000);

    function showByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel();
            window.removeEventListener('scroll', showByScroll);
        }

    }

    window.addEventListener('scroll', showByScroll);



    // создаем классы для карточек
    class CardMenu {
        constructor(src, alt, menuSub, menuDescr, menuTotal, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.menuSub = menuSub;
            this.menuDescr = menuDescr;
            this.menuTotal = menuTotal;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.change();
        }
        change() {
            this.menuTotal = this.menuTotal * this.transfer;

        }
        render() {
            const element = document.createElement('div');
            this.element = ("menu__item");
            if (this.classes.length === 0) {
                element.classList.add(this.element);
            }
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `<div>
 <img src=${this.src} alt="${this.alt}">
 <h3 class="menu__item-subtitle">${this.menuSub}</h3>
 <div class="menu__item-descr">${this.menuDescr}</div> 
<div class = "menu__item-divider" > </div>
<div class = "menu__item-price" >
    <div class = "menu__item-cost" > Цена: </div> 
    <div class = "menu__item-total" > <span > ${this.menuTotal}</span> грн/день </div> </div> 
    </div>
`;
            this.parent.append(element);
        }

    }
    new CardMenu(
        "img/tabs/vegy.jpg",
        "vegy",

        'Меню "Фитнес"',
        `В меню “Премиум” мы используем не только 
        красивый дизайн упаковки, но и качественное исполнение 
        блюд. Красная рыба, морепродукты, фрукты - ресторанное 
        меню без похода в ресторан!`,
        9,
        '.menu .container'
    ).render();

    new CardMenu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум"',
        `В меню “Премиум” мы используем
          не только красивый дизайн упаковки,
           но и качественное исполнение блюд. Красная рыба,
            морепродукты, фрукты - ресторанное меню без похода 
        в ресторан!`,
        15,
        '.menu .container').render();

    new CardMenu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов:
        полное отсутствие продуктов животного происхождения, 
        молоко из миндаля, овса, кокоса или гречки, правильное
        количество белков за счет тофу и импортных вегетарианских стейков.`,
        12,
        '.menu .container').render();


    // работа с сервером
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spiner.svg',
        success: 'Спасибо! Мы с Вами свяжемся!',
        failure: 'Ошибка',
    };
    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {

            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            fetch('server.php', {
                    method: 'POST',
                    body: formData
                })
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

            // request.setRequestHeader('Content-type', 'multipart/form-data');


            // request.send(formData);
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();

            //         statusMessage.remove();

            //     } else {
            //         showThanksModal(message.failure);


            //     }
            // });
        });
    }
    // оповещение пользователя
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModel();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();

        }, 4000);
    }

    // создание слайдера
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        totel = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesFild = document.querySelector('.offer_slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let index = 1;
    let offset = 0;
    if (slides.length < 10) {
        totel.textContent = (`0${slides.length}`);
        current.textContent = (`0${index}`);
    } else {
        totel.textContent = (slides.length);
        current.textContent = index;
    }


    slidesFild.style.width = 100 * slides.length + '%';
    slidesFild.style.display = "flex";
    slidesFild.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesFild.style.transform = `translateX(-${offset}px)`;
        if (index == slides.length) {
            index = 1;
        } else {
            index++;

        }
        if (slides.length < 10) {

            current.textContent = (`0${index}`);
        } else {

            current.textContent = index;
        }


    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);

        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesFild.style.transform = `translateX(-${offset}px)`;
        if (index == 1) {
            index = slides.length;
        } else {
            index--;

        }
        if (slides.length < 10) {

            current.textContent = (`0${index}`);
        } else {

            current.textContent = index;
        }
    });


    // showSlides(index);

    // if (slides.length < 10) {
    //     totel.textContent = (`0${slides.length}`);
    // } else {
    //     totel.textContent = (slides.length);
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         index = 1;
    //     }
    //     if (n < 1) {
    //         index = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');

    //     slides[index - 1].style.display = 'block';
    //     if (slides.length < 10) {
    //         current.textContent = (`0${index}`);
    //     } else {
    //         current.textContent = (index);
    //     }
    // }

    // function plusSlide(n) {
    //     showSlides(index += n);
    // }
    // prev.addEventListener('click', () => {
    //     plusSlide(-1);

    // });
    // next.addEventListener('click', () => {
    //     plusSlide(1);
    // });





});