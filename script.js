const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
const ambientGlow = document.getElementById('ambientGlow');
const hero = document.querySelector('.hero');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

function splitHeroTitle() {
    const target = document.querySelector('[data-split-hero]');
    if (!target || target.dataset.splitDone) return;

    const text = target.textContent;
    target.textContent = '';
    target.setAttribute('aria-label', text);

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.style.setProperty('--char-i', String(index));
        span.textContent = char === ' ' ? '\u00a0' : char;
        span.setAttribute('aria-hidden', 'true');
        target.appendChild(span);
    });

    target.dataset.splitDone = 'true';
}

function runHeroEntrance() {
    if (!hero) return;

    if (prefersReducedMotion) {
        hero.classList.add('is-entered');
        return;
    }

    splitHeroTitle();

    requestAnimationFrame(() => {
        hero.classList.add('is-entered');
    });
}

function initAmbientGlow() {
    if (!ambientGlow || prefersReducedMotion) return;

    let mx = 0.5;
    let my = 0.35;
    let tx = mx;
    let ty = my;
    let rafId = null;

    const paint = () => {
        mx += (tx - mx) * 0.08;
        my += (ty - my) * 0.08;
        ambientGlow.style.setProperty('--mx', `${mx * 100}%`);
        ambientGlow.style.setProperty('--my', `${my * 100}%`);
        rafId = requestAnimationFrame(paint);
    };

    const onMove = (e) => {
        tx = e.clientX / window.innerWidth;
        ty = e.clientY / window.innerHeight;
        if (!rafId) rafId = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    paint();
}

function revealSection(section) {
    const items = section.querySelectorAll('[data-reveal]');
    items.forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * 90}ms`);
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
runHeroEntrance();
initAmbientGlow();
