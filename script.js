// Initialize Feather icons
feather.replace();

// Typing effect
const texts = ["AI & ML Engineer", "Python Developer", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }

    document.getElementById('typed-text').textContent = letter;

    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}());

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline for a smooth effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Elements (Buttons, Links)
const magneticElements = document.querySelectorAll('.magnetic, .magnetic-link');

magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
        const position = el.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        cursorOutline.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0px, 0px)`;
        cursorOutline.classList.remove('hover');
    });
});

// Cursor Hover effects for non-magnetic interactive elements
const interactiveElements = document.querySelectorAll('a:not(.magnetic):not(.magnetic-link), button, .project-card, .skill-tag, .stat-box');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// Navbar Scroll Effect
const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.borderBottom = '1px solid var(--neon-accent)';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
        nav.style.borderBottom = '1px solid #222';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const tl = gsap.timeline();
tl.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.2
})
.from(".hero-subtitle-wrapper", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from(".hero-desc", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.6")
.from(".hero-cta .btn", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
}, "-=0.6")
.from(".image-box", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
}, "-=1.2");

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.gs-reveal');

revealElements.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Trigger when top of element hits 85% of viewport
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Marquee Animation (Handled by CSS, but can add GSAP speed modulation based on scroll)
let currentScroll = 0;
let isScrollingDown = true;
let tween = gsap.to(".marquee-content", {
    xPercent: -50,
    repeat: -1,
    duration: 10,
    ease: "linear"
}).totalProgress(0.5); // Start in the middle

window.addEventListener("scroll", () => {
    if (window.scrollY > currentScroll) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }
    
    gsap.to(tween, {
        timeScale: isScrollingDown ? 2 : -2,
        duration: 0.5
    });

    currentScroll = window.scrollY;

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
        gsap.to(tween, {
            timeScale: isScrollingDown ? 1 : -1,
            duration: 0.5
        });
    }, 150);
});

// Initialize Vanta.js 3D Background
if (typeof VANTA !== 'undefined') {
    VANTA.NET({
        el: "#vanta-bg-3d",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xE4FF00, /* Neon Yellow */
        backgroundColor: 0x050505, /* Pitch Black */
        points: 10.00,
        maxDistance: 20.00,
        spacing: 20.00,
        showDots: true
    });
}

// Initialize Vanilla-Tilt
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        perspective: 1000
    });
}
