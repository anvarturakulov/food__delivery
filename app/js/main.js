/* jslint node: true */
/* jshint browser: true */
"use strict";

document.addEventListener('DOMContentLoaded', ()=>{
    //Tabs

    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item =>{
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) =>{
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2021-03-30';
    

    function timeZoneCount() {
        let now = new Date();
        return (now.getHours()-now.getUTCHours()) >= 0 ? now.getHours()-now.getUTCHours() 
        : 24-(now.getUTCHours()-now.getHours());
    }

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 *24)),
              hours = Math.floor(((t-timeZoneCount()*60*60*1000) / (1000 * 60 *60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / (1000)) % 60);
              
        return {
            'total' : t,
            'days'  : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function getZero(num) {
        if (num >0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock,1000);
    
        updateClock();
              
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
    }
    
    setClock('.timer',deadline);

    //Modal

    const modalWindow = document.querySelector('.modal'),
          btnModal    = document.querySelectorAll('[data-modal]');
          
    
    function closeModalWindow() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        // modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        //modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    btnModal.forEach((item) =>{
        item.addEventListener('click',() =>{
            openModalWindow();
        });
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });

   const modalTimerId = setTimeout(openModalWindow,50000);

   function showModalWindowByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalWindowByScroll);
        }
    }

    window.addEventListener('scroll', showModalWindowByScroll);

    // Menu 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.classes = classes;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            //console.log(this.parent);
            this.parent.append(element);
        }
    }

    let menudiv = document.querySelector('.menu .container');
    menudiv.innerHTML = '';
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy','Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд:больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container',
        'menu__item',
    ).render();
    
// FORMS
    const forms = document.querySelectorAll('form');

    const message = {
        loading : 'Загрузка',
        success : 'Спасибо! Мы скоро с Вами свяжемся',
        failure : 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = 'img/form/spinner.svg';
            statusMessage.style.cssText = `
                display : block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend',statusMessage);

            //// -- const request = new XMLHttpRequest();
            //// -- request.open('POST', 'server.php');


            const formData = new FormData(form);
            //// --request.setRequestHeader('Content-type', 'application/json');
            
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value; 
            });

            const json =  JSON.stringify(object);

            fetch('server.php',{
                method : "POST",
                headers : {
                    'Content-type' : 'application/json'
                },
                body : json
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


            ////---request.send(json);
            ////---request.addEventListener('load', () => {
            ////---    if (request.status == 200) {
            ////---        console.log(request.response);
            ////---        showThanksModal(message.success);
            ////---        form.reset();
            ////---        statusMessage.remove();
            ////---    } else {
            ////---        showThanksModal(message.failure);
            ////---    }
            ////---});
        });
        
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
            openModalWindow();
            prevModalDialog.classList.add('hide');
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class = "modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>                
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                //prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                thanksModal.remove();
                closeModalWindow();
            }, 4000);
        }
    }

});