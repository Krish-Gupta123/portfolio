// LOADER ANIMATION
let pct = 0;
const loaderBar = document.getElementById('loader-bar');
const loaderPct = document.getElementById('loader-pct');
const loader = document.getElementById('loader');
const interval = setInterval(() => {
    pct += Math.random() * 15;
    if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        loaderBar.style.width = '100%';
        loaderPct.textContent = '100%';
        setTimeout(() => {
            loader.classList.add('done');
            document.body.style.overflow = '';
            initTyped();
            animateCounters();
        }, 500);
    }
    loaderBar.style.width = Math.min(pct, 100) + '%';
    loaderPct.textContent = Math.floor(pct) + '%';
}, 80);
document.body.style.overflow = 'hidden';

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// SCROLL PROGRESS BAR
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress').style.width = pct + '%';
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE NAVIGATION
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('open');
});
function closeMobileNav() { document.getElementById('mobile-nav').classList.remove('open'); }

// PARTICLE CANVAS ANIMATION
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [], mouseX = -999, mouseY = -999;
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.8 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
        const dx = mouseX - this.x, dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { this.vx -= dx / dist * 0.3; this.vy -= dy / dist * 0.3; }
        this.vx *= 0.98; this.vy *= 0.98;
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
        ctx.fill();
    }
}
for (let i = 0; i < 100; i++) particles.push(new Particle());
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}
function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animParticles);
}
animParticles();

// TYPED TEXT ANIMATION
function initTyped() {
    new Typed('#typed', {
        strings: ['Full Stack Developer.', 'MERN Stack Engineer.', 'Problem Solver.', 'DSA Enthusiast.', 'Tech Learner.'],
        typeSpeed: 60, backSpeed: 30, loop: true, backDelay: 1800
    });
}

// SCROLL REVEAL ANIMATIONS
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// COUNTER ANIMATIONS
function animateCounters() {
    document.querySelectorAll('.hero-stat .num[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.innerHTML.includes('+') ? '<span>+</span>' : '';
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.innerHTML = Math.floor(current) + suffix;
        }, 20);
    });
    document.querySelectorAll('.achievement-num[data-target]').forEach(el => {
        const target = +el.dataset.target;
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current) + '+';
        }, 20);
    });
}

// CONTACT FORM HANDLER
function handleContact(btn) {
    btn.textContent = 'Opening Mail Client...';
    setTimeout(() => {
        window.location.href = 'mailto:krishrgupta5@gmail.com?subject=Portfolio%20Inquiry';
        btn.textContent = 'Send Message →';
    }, 600);
}

// GSAP ANIMATIONS (after load)
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.hero-name .first', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
        gsap.from('.hero-name .last', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.7 });
        gsap.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
        gsap.from('.hero-tagline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 });
        gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1.1 });
        gsap.from('.hero-socials', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 });
        gsap.from('.hero-stats .hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out', delay: 1.3 });
    }
});