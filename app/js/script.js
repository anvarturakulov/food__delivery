/* jslint node: true */
/* jshint browser: true */
'use strict';

// let start = new Date();

// for (let i = 0; i <= 100000; i++) {
//     let s = i ** 3;
// }

// let end = new Date();

// console.log(`Цикл отработал ${end-start} миллисекунд`);

/// ********

// const box = document.querySelector('.box'),
//       btn = document.querySelector('button');  


// const width = box.clientWidth;
// const height = box.clientHeight;

// btn.addEventListener('click',() => {
//     box.style.height = box.scrollHeight+'px';
//     console.log(box.scrollTop);
// });

// console.log(box.getBoundingClientRect().top);
// const style = window.getComputedStyle(box);
// console.log(style.display);

//** Constructor */

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(`Hello ${this.name}`);
//     };
// }

// User.prototype.exit = function() {
//     console.log(`Пользователь ${this.name} вышел из системы`);
// };

// const ivan = new User('Ivan', 28);
// const sasha = new User('Sasha', 32);

// ivan.hello();
// sasha.hello();

// ivan.exit();
// sasha.exit();

// console.log(ivan);
// console.log(sasha);

//****** Контекст вызова ***** ///////////

// function showThis(a,b) {
//     console.log(this);
//     function sum(){
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }

// showThis(1,6);

// const obj = {
//     a : 20,
//     b : 15,
//     sum : function() {
//         console.log(this);
//     }
// };

// obj.sum();

// function sayName(surname) {
//     console.log(this);
//     console.log(this.name+' '+surname);
// }

// const user = {
//     name : 'John'
// };

// sayName.call(user,'Smith');
// sayName.apply(user,['Smith']);

// function count(num) {
//     return this*num;
// }

// const double = count.bind(2);

// console.log(double(3));
// console.log(double(14));

// 1) Обычная функция : this = window, но если use strict тогда this = undefined
// 2) Контекст у методов объектов - сам объект
// 3) this в конструкторах и классах - это новый экземпляр объекта
// 4) Ручная привязка this:call, apply, bind

// const btn = document.querySelector('button');

// btn.addEventListener('click', function() {
//     //console.log(this);
//     this.style.backgroundColor = 'red';
// });

// const obj = {
//     num : 5,
//     sayNumber : function() {
//         const say = () => {
//             console.log(this);
//         }

//         say();
//     }
// };

// obj.sayNumber();

// const double = a => a * 2;
// console.log(double(5));

// class Rectangle {
//     constructor(height, width) {
//         this.height = height;
//         this.width = width;
//     }

//     calcArea() {
//         return this.height * this.width;
//     }
// }

// class ColoredRectanglewithText extends Rectangle {
//     constructor(height, width, text, bgColor) {
//         super(height, width);
//         this.text = text;
//         this.bgColor = bgColor;
//     }

//     showMyProps() {
//         console.log(`Текст ${this.text} цвет ${this.bgColor}`);
//     } 
// }

// const square = new Rectangle(10,3);
// const big = new Rectangle(10,10);

// console.log(square.calcArea());
// console.log(big.calcArea());

// const div = new ColoredRectanglewithText(25,10,'Text', 'red');

// div.showMyProps();
// console.log(div.calcArea());

/**** JSON - parse and stringify metod and clone object*/

// const persone = {
//     name : 'Alex',
//     tel : '+74444444',
//     parents : {
//         dad : 'Mike',
//         mom : 'Roze'
//     }
// };

// //console.log(JSON.parse(JSON.stringify(persone)));

// const clone = JSON.parse(JSON.stringify(persone));

// clone.parents.dad = 'Alex';

// console.log(persone);
// console.log(clone);


//  AJAX 

    const inputRub = document.querySelector('#rub'),
          inputUsd = document.querySelector('#usd');
      
    inputRub.addEventListener('input', () => {
        const request = new XMLHttpRequest();
        //request.open(method, url, async, login, pass);
        request.open('GET', 'js/current.json');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send();


        //// request.addEventListener('readystatechange', () => {
        ////   if (request.readyState === 4 && request.status == 200){
        ////        //console.log(request.response);
        ////       const data = JSON.parse(request.response);
        ////       console.log(data);
        ////        inputUsd.value = (inputRub.value/data.current.usd).toFixed(2);
        ////   } else {
        ////       inputUsd.value = 'Что-то пошло не так';
        ////   }
        //// });

        request.addEventListener('load', () => {
            if (request.status == 200){
                //console.log(request.response);
                const data = JSON.parse(request.response);
                console.log(data);
                inputUsd.value = (inputRub.value/data.current.usd).toFixed(2);
            } else {
                inputUsd.value = 'Что-то пошло не так';
            }
        });

        //status - 200 или 404 код ощибки или успешности
        //status-Text - тект ответа
        //response - ответ
        //readyState

    });







