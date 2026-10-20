const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const hero = document.querySelector('.hero');
const decryptEl = document.getElementById('decryptTarget');
const matrixCanvas = document.getElementById('matrixRain');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MATRIX_CHARS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789ABCDEF';

function setNavOpen(open) {
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
    setNavOpen(!siteNav.classList.contains('is-open'));
});

const navLinks = [...siteNav.querySelectorAll('a')];

navLinks.forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
});

window.addEventListener(
    'scroll',
    () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    },
    { passive: true }
);

function runDecryptEffect() {
    if (!decryptEl) return;

    const finalText = decryptEl.dataset.decrypt || decryptEl.textContent;
    if (prefersReducedMotion) {
        decryptEl.textContent = finalText;
        hero?.classList.add('is-ready');
        return;
    }

    const pool = MATRIX_CHARS;
    const length = finalText.length;
    let frame = 0;
    const totalFrames = 42;

    const tick = () => {
        frame += 1;
        const progress = frame / totalFrames;
        const resolved = Math.floor(progress * length);

        let out = '';
        for (let i = 0; i < length; i += 1) {
            if (finalText[i] === ' ') {
                out += ' ';
                continue;
            }
            if (i < resolved) {
                out += finalText[i];
            } else {
                out += pool[Math.floor(Math.random() * pool.length)];
            }
        }
        decryptEl.textContent = out;

        if (frame < totalFrames) {
            requestAnimationFrame(tick);
        } else {
            decryptEl.textContent = finalText;
            hero?.classList.add('is-ready');
        }
    };

    requestAnimationFrame(tick);
}

function initMatrixRain() {
    if (!matrixCanvas || prefersReducedMotion) return;

    const ctx = matrixCanvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let fontSize = 14;
    let animationId = null;
    let running = true;

    const resize = () => {
        width = matrixCanvas.width = window.innerWidth;
        height = matrixCanvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    };

    const draw = () => {
        if (!running) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < columns; i += 1) {
            const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillStyle = `rgba(0, 255, 65, ${0.35 + Math.random() * 0.45})`;
            ctx.fillText(char, x, y);

            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 0.55 + Math.random() * 0.35;
        }

        animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            running = false;
            if (animationId) cancelAnimationFrame(animationId);
        } else if (!running) {
            running = true;
            draw();
        }
    });
}

function revealSection(section) {
    const items = section.querySelectorAll('[data-reveal]');
    items.forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 85}ms`);
        el.classList.add('is-visible');
    });
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealSection(entry.target);
            sectionObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
);

document.querySelectorAll('.reveal-section').forEach((section) => {
    if (prefersReducedMotion) {
        revealSection(section);
    } else {
        sectionObserver.observe(section);
    }
});

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = 'home';

    document.querySelectorAll('section[id]').forEach((section) => {
        if (section.offsetTop <= scrollY) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const id = href?.replace('#', '');
        link.classList.toggle('is-active', id === current);
    });
}

let navTicking = false;
window.addEventListener(
    'scroll',
    () => {
        if (navTicking) return;
        navTicking = true;
        requestAnimationFrame(() => {
            updateActiveNav();
            navTicking = false;
        });
    },
    { passive: true }
);

updateActiveNav();
initMatrixRain();
runDecryptEffect();
