// Смена и сохранение темы
const themeBtn = document.getElementById("toggleTheme");
let themeClicked = false;
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (!themeClicked) {
        themeBtn.textContent = "☾";
        themeClicked = true;
    } else {
        themeBtn.textContent = "☀";
        themeClicked = false;
    }
    localStorage.setItem("theme", themeClicked ? "dark" : "light");
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}
// Мобильная навигация
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});
document.addEventListener("click", (e) => {
    const isClickInside = nav.contains(e.target) || burger.contains(e.target);
    if (!isClickInside) {
        nav.classList.remove("active");
    }
});
// Анимация печати заголовка в главной секции 
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}
// Инициализация анимации печати заголовка в главной секциии
window.addEventListener("load", () => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80)
    }
});
// Анимация панели навигации при прокрутке
const header = document.querySelector("header");
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)"
    }
    lastScrollTop = scrollTop
});
// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(30px)";
        }
    });
}, observerOptions);
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".service-card, .portfolio-item, .stat-item, .contact-item"
    );
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s easy, transform 0.6s ease";
        observer.observe(el);
    });
});
// Анимация счетчика при прокрутке
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + "+";
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + "+";
        }
    }
    updateCounter();
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector(".stat-number");
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-item").forEach(stat => {
    statsObserver.observe(stat);
});
// Паралакс эфект главной секции
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero");
    const floatingCards = document.querySelectorAll(".floating-card");
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
        floatingCards.forEach((card, index) => {
            const cardRate = scrolled * (0.1 + index + 0.05);
            card.style.transform = `translateY(${cardRate}px)`;
        });
    }
});
// Анимация уведомления
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);
    setTimeout(() => {
        notification.style.transform = "translateX(400px)";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}
// Клик на ссылки в портфолио
document.querySelectorAll(".portfolio-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href === "#") {
            showNotification("Ссылка будет добавлена позже", "info");
        } else {
            window.open(href, "_blank");
        }
    });
});
// Клик на ссылки в контактах
document.querySelectorAll(".contact-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href === "#") {
            showNotification("Социальные сети будут добавлены позже", "info");
        } else {
            window.open(href, "_blank");
        }
    });
});
// Анимация загрузки страницы
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});
// CSS уведомлений
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);
// Отправка формы
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const token = "8243913429:AAGNlygJPFEjqgrbXfsm4MXBRn1TYV26CyU";
        const chat_id = "-1002970590334";
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;
        const text = `👤 Имя: ${name}%0A📧 Email: ${email}%0A💬 Тема сообщения: ${subject}%0A💬 Сообщение: ${message}`;
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Отправка...`;
        submitBtn.disabled = true;
        fetch(url)
            .then(() => {
                showNotification("Сообщение успешно отправлено!", "success");
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(() => {
                showNotification("Не удалось отправить сообщение.", "error");
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
    });
}