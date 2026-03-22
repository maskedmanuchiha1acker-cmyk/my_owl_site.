gsap.registerPlugin(ScrollTrigger);

// Общий таймлайн для плавного перехода
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scene-1", 
        start: "top top",      // Начинаем сразу, как только начали скроллить
        end: "bottom top",     // Анимация закончится, когда первая секция полностью уйдет вверх
        scrub: true            // Анимация строго следует за пальцем/колесиком
    }
});

// 1. Книга: увеличивается и поднимается вверх (она "тянет" за собой коричневый фон)
tl.to(".book-wrapper", { 
    scale: 2.5, 
    y: -200, 
    ease: "none" 
}, 0);

// 2. Название: опускается вниз (прячется)
tl.to(".main-title", { 
    y: 300, 
    opacity: 0, 
    ease: "none" 
}, 0);

// 3. Персонаж: уменьшается и едет вниз за книгу
tl.to(".char-img", { 
    scale: 0.6, 
    y: 200, 
    ease: "none" 
}, 0);

// В анимации появления совы измени:
gsap.to(".owl-img", {
    scrollTrigger: {
        trigger: ".scene-2",
        start: "top bottom", // Начинать анимацию раньше
        end: "bottom bottom",
        scrub: 1
    },
    left: "-150%",
    ease: "power1.out"
});

// Анимация появления текста (Fade In)
gsap.to(".content-left", {
    scrollTrigger: {
        trigger: ".scene-2",
        start: "top 20%",    // Анимация начнется, когда верх секции дойдет до 60% экрана
        end: "top -20%",      // Текст станет полностью видимым к этому моменту
        scrub: 1             // Привязка к скроллу (убери цифру, если хочешь одноразовое появление)
    },
    opacity: 1,              // Становится видимым
    y: 0,                    // Возвращается в исходную позицию (поднимается на 20px)
    duration: 1
});

// Анимация увеличения лапки с кнопкой
gsap.to(".hand-btn-overlap", {
    scrollTrigger: {
        trigger: ".scene-2",
        start: "top center",    // Начинаем, когда сцена только показалась
        end: "bottom bottom",   // Заканчиваем в самом низу коричневого фона
        scrub: 1                // Мягкая привязка к колесику мыши
    },

    scale: 1.0,
    scale: 1.0,                 // Увеличится в 1.5 раза (можно поставить 2.0 для гигантской лапки)
    ease: "none"                // Равномерный рост без рывков
});

const modal = document.getElementById("book-modal");
const btn = document.querySelector(".hand-btn-overlap");
const span = document.querySelector(".close-button");

// 1. Открываем окно при клике на лапку
btn.onclick = function(e) {
    e.preventDefault(); // Чтобы ссылка не перезагружала страницу
    modal.style.display = "block";
}

// 2. Закрываем при клике на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// 3. Закрываем при клике в любое место вне окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}