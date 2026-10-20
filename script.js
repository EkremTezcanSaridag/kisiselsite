const header = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

function setNavOpen(open) {
    siteNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
}

navToggle.addEventListener('click', () => {
    setNavOpen(!siteNav.classList.contains('is-open'));
});

siteNav.querySelectorAll('a').forEach((link) => {
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

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
});
