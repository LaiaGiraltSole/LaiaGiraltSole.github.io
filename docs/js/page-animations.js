// Creative page animations for inner pages
(function () {
    'use strict';

    // Wrap content between h2 headings into .content-section cards
    function wrapSections(wrapper) {
        var children = Array.from(wrapper.childNodes);
        var sections = [];
        var current = null;

        children.forEach(function (node) {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.tagName === 'H2') {
                if (current) sections.push(current);
                current = document.createElement('div');
                current.className = 'content-section';
                current.appendChild(node.cloneNode(true));
            } else if (node.tagName === 'HR') {
                // skip separators
            } else if (current) {
                current.appendChild(node.cloneNode(true));
            }
        });

        if (current) sections.push(current);
        if (sections.length > 0) {
            wrapper.innerHTML = '';
            sections.forEach(function (s) { wrapper.appendChild(s); });
        }
    }

    // Wrap h3 blocks into .timeline-card and h2 blocks into .content-section
    function wrapTimeline(wrapper) {
        var children = Array.from(wrapper.childNodes);
        var newChildren = [];
        var current = null;

        children.forEach(function (node) {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            if (node.tagName === 'H2') {
                if (current) { newChildren.push(current); current = null; }
                var sec = document.createElement('div');
                sec.className = 'content-section';
                sec.appendChild(node.cloneNode(true));
                newChildren.push(sec);
            } else if (node.tagName === 'H3') {
                if (current) newChildren.push(current);
                current = document.createElement('div');
                current.className = 'timeline-card';
                current.appendChild(node.cloneNode(true));
            } else if (node.tagName === 'HR') {
                // skip
            } else if (current) {
                current.appendChild(node.cloneNode(true));
            } else if (newChildren.length > 0) {
                var last = newChildren[newChildren.length - 1];
                if (last.classList && last.classList.contains('content-section')) {
                    last.appendChild(node.cloneNode(true));
                }
            }
        });

        if (current) newChildren.push(current);
        if (newChildren.length > 0) {
            wrapper.innerHTML = '';
            newChildren.forEach(function (c) { wrapper.appendChild(c); });
        }
    }

    // Convert any "Label: X, Y, Z" paragraphs into inline tag chips
    function convertSkillLines() {
        var pattern = /^[\w][\w\s&]+\s*:/;
        document.querySelectorAll('.timeline-card p, .content-section p').forEach(function (p) {
            var text = p.textContent.trim();
            var firstChild = p.firstChild;
            // Only convert if the paragraph starts with a <strong> element (bold label)
            var startsWithBold = firstChild && firstChild.nodeName === 'STRONG';
            var match = startsWithBold && text.match(pattern);
            if (match) {
                var colon = text.indexOf(':');
                var label = text.substring(0, colon);
                var skills = text.substring(colon + 1).split(',');
                p.innerHTML = '<strong>' + label + ':</strong> ' +
                    skills.map(function (s) {
                        return '<span class="skill-inline">' + s.trim() + '</span>';
                    }).join(' ');
            }
        });
    }

    // Scroll-triggered fade-in using IntersectionObserver
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: make everything visible immediately
            document.querySelectorAll('.content-section, .timeline-card, .proj-card').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.content-section, .timeline-card, .proj-card').forEach(function (el) {
            observer.observe(el);
        });
    }

    // Stagger project card entrance delays
    function staggerCards() {
        document.querySelectorAll('.proj-card').forEach(function (card, i) {
            card.style.transitionDelay = (i * 0.1) + 's';
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var wrapper = document.querySelector('.page-content-wrapper');
        if (wrapper) {
            var mode = wrapper.getAttribute('data-mode');
            if (mode === 'timeline') {
                wrapTimeline(wrapper);
            } else {
                wrapSections(wrapper);
            }
            convertSkillLines();
        }

        staggerCards();
        initScrollAnimations();
    });
})();
