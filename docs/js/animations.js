// Enhanced animations and interactions
(function() {
    'use strict';

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards and timeline items
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .highlight-card');
        cards.forEach(card => {
            observer.observe(card);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Add hover effects to skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-3px)';
            });
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        });

        // Animate header on scroll
        const header = document.querySelector('nav');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                } else {
                    header.style.boxShadow = 'none';
                }
            });
        }

        // Typewriter effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Delay typewriter effect slightly
            setTimeout(typeWriter, 300);
        }

        // Add parallax effect to hero section
        const hero = document.querySelector('.hero');
        if (hero && hero.querySelector('canvas')) {
            window.addEventListener('mousemove', function(e) {
                const x = (e.clientX / window.innerWidth) * 10;
                const y = (e.clientY / window.innerHeight) * 10;
                hero.style.backgroundPosition = `${x}px ${y}px`;
            });
        }
    });

    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .view-all');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observe elements for counter animation
    const statElements = document.querySelectorAll('[data-count]');
    if (statElements.length > 0) {
        const countObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        statElements.forEach(stat => countObserver.observe(stat));
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        
        if (scrollTop > 100) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });

})();
