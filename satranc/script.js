(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* —— Mini hero board —— */
    const boardEl = document.getElementById("heroBoard");
    if (boardEl) {
        const layout = [
            /* row 0 (rank 8) — black back rank */
            ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
            ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, "♙", null, null, null, null],
            [null, null, "♘", null, null, null, null, null],
            ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
            ["♖", "♗", "♘", "♕", "♔", "♗", "♘", "♖"],
        ];

        const knightCell = { row: 5, col: 2 };

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const sq = document.createElement("div");
                const isLight = (row + col) % 2 === 0;
                sq.className = "sq " + (isLight ? "light" : "dark");
                sq.dataset.row = String(row);
                sq.dataset.col = String(col);

                const pieceChar = layout[row][col];
                if (pieceChar) {
                    const piece = document.createElement("span");
                    piece.className = "piece";
                    piece.textContent = pieceChar;
                    piece.setAttribute("aria-hidden", "true");

                    if (row === knightCell.row && col === knightCell.col) {
                        piece.classList.add("knight-animate");
                    }

                    if (!prefersReducedMotion) {
                        const delay = (row * 8 + col) * 18 + (pieceChar === "♙" && row === 4 ? 200 : 0);
                        piece.style.transitionDelay = delay + "ms";
                    }

                    sq.appendChild(piece);
                }

                boardEl.appendChild(sq);
            }
        }

        requestAnimationFrame(function () {
            boardEl.classList.add("is-ready");
        });
    }

    /* —— Hero copy fade-in —— */
    document.querySelectorAll(".hero-enter").forEach(function (el) {
        if (prefersReducedMotion) {
            el.classList.add("is-visible");
            return;
        }
        requestAnimationFrame(function () {
            el.classList.add("is-visible");
        });
    });

    /* —— Header scroll state —— */
    const header = document.getElementById("siteHeader");
    function onScroll() {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* —— Mobile nav —— */
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");
    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            const open = siteNav.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", open ? "true" : "false");
        });

        siteNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                siteNav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* —— Scroll reveal (Intersection Observer) —— */
    const revealEls = document.querySelectorAll("[data-reveal]");
    if (revealEls.length) {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealEls.forEach(function (el) {
                el.classList.add("is-revealed");
            });
        } else {
            const observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-revealed");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
            );

            revealEls.forEach(function (el, index) {
                el.style.transitionDelay = (index % 5) * 60 + "ms";
                observer.observe(el);
            });
        }
    }
})();
