(function () {
    'use strict';

    const currentYear = new Date().getFullYear();
    const experience = currentYear - 2017 + '+';
    document.querySelectorAll('.total_experience').forEach(function (element) {
        element.textContent = experience;
    });

    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = currentYear;
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    function setTheme(theme, persist) {
        document.body.dataset.theme = theme;
        if (themeColor) {
            themeColor.content = theme === 'dark' ? '#0b1220' : '#ffffff';
        }
        if (themeToggle) {
            const nextTheme = theme === 'dark' ? 'light' : 'dark';
            const label = 'Switch to ' + nextTheme + ' mode';
            themeToggle.setAttribute('aria-label', label);
            themeToggle.setAttribute('title', label);
            themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
        }

        if (persist) {
            try {
                window.localStorage.setItem('portfolio-theme', theme);
            } catch (error) {
                console.warn('Theme preference could not be saved in this browser.', error);
            }
        }
    }

    if (themeToggle) {
        let savedTheme;
        try {
            savedTheme = window.localStorage.getItem('portfolio-theme');
        } catch (error) {
            console.warn('Theme preference could not be read in this browser.', error);
        }

        const systemPrefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(savedTheme === 'dark' || savedTheme === 'light'
            ? savedTheme
            : (systemPrefersDark ? 'dark' : 'light'), false);

        themeToggle.addEventListener('click', function () {
            setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark', true);
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('main-navigation');

    function closeNavigation() {
        if (!menuToggle || !navigation) {
            return;
        }
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        navigation.classList.remove('is-open');
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function () {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
            navigation.classList.toggle('is-open', !isOpen);
        });

        navigation.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNavigation);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
                closeNavigation();
                menuToggle.focus();
            }
        });
    }

    const progressBar = document.querySelector('.reading-progress span');
    const backToTop = document.querySelector('.back-to-top');
    let scrollFrame = 0;

    function updateScrollUI() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        if (progressBar) {
            progressBar.style.transform = 'scaleX(' + Math.min(progress, 1) + ')';
        }
        if (backToTop) {
            backToTop.classList.toggle('is-visible', window.scrollY > 500);
        }
        scrollFrame = 0;
    }

    window.addEventListener('scroll', function () {
        if (!scrollFrame) {
            scrollFrame = window.requestAnimationFrame(updateScrollUI);
        }
    }, { passive: true });
    window.addEventListener('resize', updateScrollUI, { passive: true });
    updateScrollUI();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });
    }

    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('main section[id]');
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                document.querySelectorAll('.main-nav a[aria-current]').forEach(function (link) {
                    link.removeAttribute('aria-current');
                });
                const activeLink = document.querySelector('.main-nav a[href="#' + entry.target.id + '"]');
                if (activeLink) {
                    activeLink.setAttribute('aria-current', 'location');
                }
            });
        }, { rootMargin: '-25% 0px -65% 0px' });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

        const revealItems = document.querySelectorAll(
            '.section-heading, .service-card, .glass-panel, .timeline-item, .about-copy, .contact-card'
        );
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            item.classList.add('reveal');
            revealObserver.observe(item);
        });
        document.documentElement.classList.add('js-ready');
    }
})();
