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

// Данные страниц
const pages = [
    { title: "Страница 1", text: "Давным-давно в лесу...", img: "images.vsc/illustration1.png" },
    { title: "Страница 2", text: "Герой нашел волшебный гриб...", img: "images.vsc/illustration2.png" },
    { title: "Страница 3", text: "И начались приключения!", img: "images.vsc/illustration3.png" }
];

let currentPage = 0;

// 1. СЛЕДЖЕНИЕ ГЛАЗ
document.addEventListener('mousemove', (e) => {
    const pupils = document.querySelectorAll('.pupil');
    const character = document.getElementById('main-character');

    if (!character) return;

    const rect = character.getBoundingClientRect();
    
    // 1. Единый центр (переносица)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 + 25; 

    // 2. Считаем расстояние от центра до мышки
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const mouseDistance = Math.sqrt(dx * dx + dy * dy); // Пифагор: расстояние в пикселях

    pupils.forEach(pupil => {
        const angle = Math.atan2(dy, dx);
        
        // 3. Динамическая дистанция
        // Ограничиваем максимальное смещение (например, 15px), 
        // чтобы зрачок не вылез за белок
        const maxLimit = 25; 
        
        // Чем дальше мышка, тем ближе зрачок к краю, но не дальше maxLimit
        // Число 500 — это чувствительность. Если мышка дальше 500px, 
        // зрачок замрет на краю.
        const dynamicDist = Math.min(maxLimit, mouseDistance / 30); 

        const x = Math.cos(angle) * dynamicDist;
        const y = Math.sin(angle) * dynamicDist;

        pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
});

const papers = document.querySelectorAll('.paper');

papers.forEach((paper, index) => {
    // Начальный порядок
    paper.style.zIndex = papers.length - index;

    paper.addEventListener('click', () => {
        if (!paper.classList.contains('flipped')) {
            paper.classList.add('flipped');
            // Если анимация 1.2s, меняем слой ровно посередине (на 600ms)
            setTimeout(() => { 
                paper.style.zIndex = index; 
            }, 900); 
        } else {
            paper.classList.remove('flipped');
            // При возврате назад — тоже ждем середины пути
            setTimeout(() => { 
                paper.style.zIndex = papers.length - index; 
            }, 600);
        }
    });
});