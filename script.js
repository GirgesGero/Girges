/* ============================================
   GIRGES OS - DIGITAL IDENTITY PLATFORM
   Premium Next-Generation Script
   ============================================ */

$(document).ready(function () {

    /* ==========================
       LOADING SEQUENCE
    ========================== */
    const terminalLines = $('.terminal-line');
    terminalLines.each(function () {
        const delay = $(this).data('delay');
        setTimeout(() => {
            $(this).addClass('show');
        }, delay);
    });

    setTimeout(() => {
        $('#loader').addClass('hidden');
        $('.hero-content').addClass('visible');
        initCounters();
        // Refresh AOS after loader is hidden to recalculate positions
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 2200);

    /* ==========================
       PARTICLES.JS
    ========================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 1000 } },
                color: { value: '#00f5ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f5ff',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 3 }
                }
            },
            retina_detect: true
        });
    }

    /* ==========================
       TYPED.JS
    ========================== */
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'IT Support Specialist',
                'Network Technician',
                'Cybersecurity Enthusiast',
                'Python Developer',
                'Digital Problem Solver'
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    /* ==========================
       AOS INIT
    ========================== */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });
    }

    /* ==========================
       SCROLL PROGRESS
    ========================== */
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = (scrollTop / docHeight) * 100;
        $('#scroll-progress').css('width', progress + '%');
    });

    /* ==========================
       NAVBAR SCROLL
    ========================== */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('.cyber-navbar').addClass('scrolled');
        } else {
            $('.cyber-navbar').removeClass('scrolled');
        }
    });

    /* ==========================
       ACTIVE NAV LINK
    ========================== */
    const sections = $('section');
    const navLinks = $('.nav-link');

    $(window).on('scroll', function () {
        let current = '';
        sections.each(function () {
            const sectionTop = $(this).offset().top - 150;
            if ($(window).scrollTop() >= sectionTop) {
                current = $(this).attr('id');
            }
        });
        navLinks.removeClass('active');
        navLinks.each(function () {
            if ($(this).attr('href') === '#' + current) {
                $(this).addClass('active');
            }
        });
    });

    /* ==========================
       SMOOTH SCROLL
    ========================== */
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (target === '#') return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);
    });

    /* ==========================
       HERO COUNTERS
    ========================== */
    function initCounters() {
        $('.hero-stat-num').each(function () {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            const increment = target / 60;
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    $this.text(Math.ceil(current));
                    requestAnimationFrame(updateCounter);
                } else {
                    $this.text(target);
                }
            }
            updateCounter();
        });
    }

    /* ==========================
       SKILLS EXPLORER
    ========================== */
    $('.skill-card').on('click', function () {
        const wasActive = $(this).hasClass('active');
        $('.skill-card').removeClass('active');
        if (!wasActive) {
            $(this).addClass('active');
        }
    });

    /* ==========================
       PROJECT FILTERS
    ========================== */
    $('.filter-btn').on('click', function () {
        const filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        let visibleCount = 0;

        $('.project-item').each(function () {
            const categories = String($(this).data('category') || '').split(' ');
            if (filter === 'all' || categories.indexOf(filter) !== -1) {
                $(this).removeClass('hidden').show();
                visibleCount++;
            } else {
                $(this).addClass('hidden').hide();
            }
        });

        // Show/hide "no projects" message
        if (visibleCount === 0) {
            $('#noProjects').show();
        } else {
            $('#noProjects').hide();
        }
    });

    // Ensure no-projects message is hidden on load
    $('#noProjects').hide();

    /* ==========================
       VCF DOWNLOAD
    ========================== */
    const vcfData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Gaber;Girges;;;',
        'FN:Girges Gaber',
        'TITLE:IT Support Specialist',
        'TEL;TYPE=CELL:+201277885621',
        'EMAIL:girgesgaber0@gmail.com',
        'URL:https://www.linkedin.com/in/girges-gaber-183ba23a5/',
        'NOTE:IT Support Specialist, Network Technician & Cybersecurity Enthusiast',
        'END:VCARD'
    ].join('\n');

    function downloadVCF() {
        const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Girges_Gaber.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    $('#btn-save-contact, #fab-save-contact').on('click', function (e) {
        e.preventDefault();
        downloadVCF();
    });

    /* ==========================
       SHARE PROFILE
    ========================== */
    $('#btn-share').on('click', function (e) {
        e.preventDefault();
        if (navigator.share) {
            navigator.share({
                title: 'Girges Gaber - Digital Identity',
                text: 'IT Support Specialist, Network Technician & Cybersecurity Enthusiast',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!');
        }
    });

    /* ==========================
       COPY CONTACT INFO
    ========================== */
    $('#btn-copy-info').on('click', function (e) {
        e.preventDefault();
        const info = 'Girges Gaber\nPhone: +201277885621\nEmail: girgesgaber0@gmail.com\nLinkedIn: linkedin.com/in/girges-gaber-183ba23a5\nGitHub: github.com/GirgesGero';
        navigator.clipboard.writeText(info).then(() => {
            showToast('Contact info copied!');
        });
    });

    /* ==========================
       TOAST NOTIFICATION
    ========================== */
    function showToast(message) {
        const toast = $('#copy-toast');
        toast.html('<i class="fa-solid fa-check-circle"></i> ' + message);
        toast.addClass('show');
        setTimeout(() => toast.removeClass('show'), 2500);
    }

    /* ==========================
       FLOATING ACTION BUTTON
    ========================== */
    $('#fab-toggle').on('click', function () {
        $(this).toggleClass('active');
        $('#fab-menu').toggleClass('show');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#fab-container').length) {
            $('#fab-toggle').removeClass('active');
            $('#fab-menu').removeClass('show');
        }
    });

    /* ==========================
       DARK / LIGHT THEME
    ========================== */
    const $html = $('html');
    const $themeBtn = $('#theme-toggle');

    // Load saved theme
    const savedTheme = localStorage.getItem('girges-theme') || 'dark';
    $html.attr('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    $themeBtn.on('click', function () {
        const current = $html.attr('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        $html.attr('data-theme', next);
        localStorage.setItem('girges-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        const icon = $themeBtn.find('i');
        icon.removeClass('fa-moon fa-sun');
        icon.addClass(theme === 'dark' ? 'fa-moon' : 'fa-sun');
    }

    /* ==========================
       MOUSE PARALLAX - PROFILE
    ========================== */
    $(document).on('mousemove', function (e) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        $('.profile-image, .profile-fallback').css({
            transform: 'translate(' + moveX + 'px, ' + moveY + 'px)'
        });
    });

    /* ==========================
       PROFESSIONAL CURSOR
    ========================== */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const cursorTrail = document.getElementById('cursorTrail');
    const mouseGlow = document.getElementById('mouseGlow');
    const canvas = document.getElementById('cursorParticles');
    const ctx = canvas ? canvas.getContext('2d') : null;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailX = 0, trailY = 0;
    let particles = [];
    let isTabVisible = true;
    let animationId = null;

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        $(window).on('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Pause animation when tab is hidden
    document.addEventListener('visibilitychange', function() {
        isTabVisible = !document.hidden;
        if (isTabVisible) {
            animateCursor();
        }
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = Math.random() > 0.5 ? '#00f5ff' : '#7b61ff';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
        }

        draw() {
            if (ctx) {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
    }

    $(document).on('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = mouseX - 4 + 'px';
            cursorDot.style.top = mouseY - 4 + 'px';
        }

        if (mouseGlow) {
            mouseGlow.style.left = mouseX + 'px';
            mouseGlow.style.top = mouseY + 'px';
        }

        // Add particles on mouse move (reduced frequency)
        if (canvas && Math.random() > 0.85 && particles.length < 50) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    function animateCursor() {
        if (!isTabVisible) return;

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        trailX += (mouseX - trailX) * 0.06;
        trailY += (mouseY - trailY) * 0.06;

        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }

        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }

        // Animate particles
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.life <= 0) {
                    particles.splice(index, 1);
                }
            });
        }

        animationId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Click effect
    $(document).on('mousedown', function () {
        if (cursorRing) cursorRing.classList.add('click');
    });
    $(document).on('mouseup', function () {
        if (cursorRing) cursorRing.classList.remove('click');
    });

    // Hover effect on interactive elements
    $('a, button, .skill-card, .contact-action-card, .cert-card, .social-card, .project-card')
        .on('mouseenter', function () {
            if (cursorRing) cursorRing.classList.add('hover');
        })
        .on('mouseleave', function () {
            if (cursorRing) cursorRing.classList.remove('hover');
        });

    /* ==========================
       CARD 3D HOVER EFFECT
    ========================== */
    $('.contact-action-card, .project-card, .cert-card, .social-card')
        .on('mousemove', function (e) {
            const x = e.pageX - $(this).offset().left;
            const y = e.pageY - $(this).offset().top;
            const centerX = $(this).width() / 2;
            const centerY = $(this).height() / 2;
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            $(this).css({
                transform: 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)'
            });
        })
        .on('mouseleave', function () {
            $(this).css({
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
            });
        });

    /* ==========================
       GSAP SCROLL ANIMATIONS
    ========================== */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // Skill cards
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                scale: 0.9,
                duration: 0.6,
                delay: i * 0.08,
                ease: 'power2.out'
            });
        });

        // Cert cards
        gsap.utils.toArray('.cert-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });

        // Project cards (only if AOS is not available, to avoid conflicts)
        if (typeof AOS === 'undefined') {
            gsap.utils.toArray('.project-item').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: 'power2.out'
                });
            });
        }
    }

    /* ==========================
       GLOW EFFECT ON ORBITS
    ========================== */
    setInterval(() => {
        $('.orbit-1').toggleClass('orbit-glow');
    }, 2000);
    setInterval(() => {
        $('.orbit-2').toggleClass('orbit-glow');
    }, 2500);
    setInterval(() => {
        $('.orbit-3').toggleClass('orbit-glow');
    }, 3000);

    /* ==========================
       CONTACT CARD CLICK RIPPLE
    ========================== */
    $('.contact-action-card').on('click', function (e) {
        const ripple = $('<span class="ripple-effect"></span>');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.css({
            width: size + 'px',
            height: size + 'px',
            left: (e.clientX - rect.left - size / 2) + 'px',
            top: (e.clientY - rect.top - size / 2) + 'px'
        });
        $(this).append(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

});

/* ====================================
   KEYBOARD SHORTCUTS
==================================== */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
