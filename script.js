/* ============================================
   GIRGES GABER - DIGITAL IDENTITY & PORTFOLIO
   Graphic Designer • Frontend Developer • IT Specialist
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
    }, 2000);

    /* ==========================
       PARTICLES.JS
    ========================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 65, density: { enable: true, value_area: 1000 } },
                color: { value: ['#00f5ff', '#7b61ff', '#ff007f', '#00ff88'] },
                shape: { type: 'circle' },
                opacity: { value: 0.35, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 145,
                    color: '#00f5ff',
                    opacity: 0.12,
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
       TYPED.JS (GRAPHIC DESIGN, FRONTEND & IT)
    ========================== */
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Freelance Graphic Designer 🎨',
                'Freelance Frontend Web Developer 💻',
                'Photoshop & Illustrator Specialist ✨',
                'CorelDRAW & Inkscape Vector Artist 📐',
                'IT Support & Network Specialist 🛡️',
                'Available for Freelance & Remote Projects 🚀'
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 1600,
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
            offset: 70
        });
    }

    /* ==========================
       SCROLL PROGRESS
    ========================== */
    $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $('#scroll-progress').css('width', progress + '%');
    });

    /* ==========================
       NAVBAR SCROLL
    ========================== */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 40) {
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
            const sectionTop = $(this).offset().top - 140;
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
        if (!target || target === '#' || !$(target).length) return;
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top - 65
        }, 700);
    });

    /* ==========================
       HERO COUNTERS
    ========================== */
    function initCounters() {
        $('.hero-stat-num').each(function () {
            const $this = $(this);
            const target = parseInt($this.data('target')) || 0;
            const increment = target / 50;
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
       WORKSTATION WINDOW TABS
    ========================== */
    $('.ws-tab-btn').on('click', function () {
        const tab = $(this).data('tab');
        $('.ws-tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.ws-pane').hide().removeClass('active');
        $('#pane-' + tab).fadeIn(250).addClass('active');
    });

    /* ==========================
       SANDBOX INTERACTIVE COUNTER
    ========================== */
    let sandboxCount = 0;
    $('#sandbox-counter-btn').on('click', function () {
        sandboxCount++;
        $('#sandbox-count').text(sandboxCount);
        $(this).addClass('clicked');
        setTimeout(() => $(this).removeClass('clicked'), 200);
    });

    /* ==========================
       SKILLS EXPLORER ACCORDION
    ========================== */
    $('.skill-card').on('click', function () {
        const wasActive = $(this).hasClass('active');
        $('.skill-card').removeClass('active');
        if (!wasActive) {
            $(this).addClass('active');
        }
    });

    /* ==========================
       PROJECT FILTERS (ALL, DESIGN, FRONTEND, NETWORKING, SECURITY)
    ========================== */
    $('.filter-btn').on('click', function () {
        const filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        let visibleCount = 0;

        $('.project-item').each(function () {
            const categories = String($(this).data('category') || '').split(' ');
            if (filter === 'all' || categories.indexOf(filter) !== -1) {
                $(this).removeClass('hidden').fadeIn(300);
                visibleCount++;
            } else {
                $(this).addClass('hidden').fadeOut(200);
            }
        });

        // Show/hide "no projects" message
        if (visibleCount === 0) {
            $('#noProjects').fadeIn(300);
        } else {
            $('#noProjects').hide();
        }
    });

    // Ensure no-projects message is hidden on load
    $('#noProjects').hide();

    /* ==========================
       VCF DOWNLOAD (UPDATED MULTI-DISCIPLINARY)
    ========================== */
    const vcfData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Gaber;Girges;;;',
        'FN:Girges Gaber',
        'TITLE:Freelance Graphic Designer | Frontend Web Developer | IT Specialist',
        'TEL;TYPE=CELL:+201277885621',
        'EMAIL:girgesgaber0@gmail.com',
        'URL:https://www.linkedin.com/in/girges-gaber-183ba23a5/',
        'NOTE:Freelance Graphic Designer (Photoshop, CorelDRAW, Illustrator, Inkscape), Frontend Web Developer & IT Systems Specialist',
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
                title: 'Girges Gaber | Freelance Graphic Designer • Frontend Developer • IT Specialist',
                text: 'Girges Gaber - Freelancer in Graphic Design (Photoshop, CorelDRAW, Illustrator, Inkscape), Frontend Web Developer & IT Specialist',
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Portfolio link copied to clipboard!');
        }
    });

    /* ==========================
       COPY CONTACT INFO
    ========================== */
    $('#btn-copy-info').on('click', function (e) {
        e.preventDefault();
        const info = 'Girges Gaber\nFreelance Graphic Designer • Frontend Developer • IT Specialist\nPhone: +201277885621\nEmail: girgesgaber0@gmail.com\nLinkedIn: linkedin.com/in/girges-gaber-183ba23a5\nGitHub: github.com/GirgesGero';
        navigator.clipboard.writeText(info).then(() => {
            showToast('Contact information copied!');
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
       PROFESSIONAL CURSOR & PARTICLES
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

    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        $(window).on('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

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
            this.size = Math.random() * 2.8 + 1;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.life = 1;
            this.decay = Math.random() * 0.025 + 0.015;
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const colors = isLight
                ? ['#0284c7', '#6366f1', '#db2777', '#059669', '#d97706']
                : ['#00f5ff', '#7b61ff', '#ff007f', '#00ff88'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.97;
        }

        draw() {
            if (ctx) {
                ctx.globalAlpha = Math.max(0, this.life);
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

        // Add particles on mouse move
        if (canvas && Math.random() > 0.82 && particles.length < 45) {
            particles.push(new Particle(mouseX, mouseY));
        }
    });

    function animateCursor() {
        if (!isTabVisible) return;

        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;

        trailX += (mouseX - trailX) * 0.07;
        trailY += (mouseY - trailY) * 0.07;

        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }

        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
        }

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                }
            }
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    $(document).on('mousedown', function () {
        if (cursorRing) cursorRing.classList.add('click');
    });
    $(document).on('mouseup', function () {
        if (cursorRing) cursorRing.classList.remove('click');
    });

    $('a, button, .skill-card, .contact-action-card, .cert-card, .social-card, .project-card, .pillar-card, .stack-chip, .btn-hero-primary, .btn-hero-secondary, .btn-hero-cv, .creative-studio-card, .signature-profile-card, .floating-stat-badge, .tool-circle, .swatch-btn, .metric-item')
        .on('mouseenter', function () {
            if (cursorRing) cursorRing.classList.add('hover');
        })
        .on('mouseleave', function () {
            if (cursorRing) cursorRing.classList.remove('hover');
        });

    /* ==========================
       CREATIVE STUDIO INTERACTIVE PALETTE
    ========================== */
    $('.swatch-btn').on('click', function () {
        const color = $(this).data('color');
        $('.swatch-btn').removeClass('active');
        $(this).addClass('active');
        
        // Dynamically tint the studio card border and ambient glow
        $('#studioMainCard').css({
            'border-color': color,
            'box-shadow': '0 25px 65px -15px rgba(0, 0, 0, 0.75), 0 0 45px ' + color + '55'
        });
        
        // Aura pulse effect
        $('.holo-ring-aura').css({
            'background': 'radial-gradient(circle, ' + color + '77 0%, transparent 70%)',
            'opacity': '0.95'
        });
        setTimeout(() => {
            $('.holo-ring-aura').css({
                'background': '',
                'opacity': ''
            });
        }, 1200);
    });

    /* ==========================
       HERO STACK CHIPS HOVER SYNC
    ========================== */
    $('.stack-chip').on('mouseenter', function () {
        const tool = $(this).data('tool');
        if (tool) {
            $('.profile-tools-icons .tool-circle').removeClass('active-pulse');
            let toolClass = '';
            if (tool === 'photoshop') toolClass = '.ps';
            else if (tool === 'illustrator') toolClass = '.ai';
            else if (tool === 'coreldraw') toolClass = '.cdr';
            else if (tool === 'inkscape') toolClass = '.ink';
            else if (tool === 'frontend') toolClass = '.code';
            
            if (toolClass) {
                $(toolClass).addClass('active-pulse');
            }
        }
    }).on('mouseleave', function () {
        $('.profile-tools-icons .tool-circle').removeClass('active-pulse');
    });

    /* ==========================
       CARD 3D TILT EFFECT
    ========================== */
    $('.contact-action-card, .project-card, .cert-card, .social-card, .pillar-card, .creative-studio-card, .signature-profile-card')
        .on('mousemove', function (e) {
            const x = e.pageX - $(this).offset().left;
            const y = e.pageY - $(this).offset().top;
            const centerX = $(this).width() / 2;
            const centerY = $(this).height() / 2;
            const rotateX = (centerY - y) / 22;
            const rotateY = (x - centerX) / 22;

            $(this).css({
                transform: 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)'
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

        gsap.utils.toArray('.pillar-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 35,
                duration: 0.6,
                delay: i * 0.12,
                ease: 'power2.out'
            });
        });
    }

    /* ==========================
       MOUSE PARALLAX - HERO PROFILE CARD
    ========================== */
    $(document).on('mousemove', function (e) {
        if (window.innerWidth > 991) {
            const moveX = (e.clientX - window.innerWidth / 2) / 60;
            const moveY = (e.clientY - window.innerHeight / 2) / 60;
            $('.hero-card-wrapper').css({
                transform: 'translate(' + moveX + 'px, ' + moveY + 'px)'
            });
        }
    });

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
