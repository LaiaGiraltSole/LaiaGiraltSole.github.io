// Canvas Animation for Hero Background
(function() {
    'use strict';

    function initializeCanvas() {
        const canvas = document.getElementById('canvas-animation');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        // Set canvas size
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.5;
                this.targetOpacity = this.opacity;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX *= -1;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY *= -1;
                }

                // Stay in bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Draw connecting lines between nearby particles
        function drawConnections() {
            const connectionDistance = 150;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Draw animated gradient background
        function drawBackground() {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.0003;

            // Color shifts for visual interest
            gradient.addColorStop(0, `hsl(${355 + Math.sin(time) * 8}deg, 85%, 30%)`);
            gradient.addColorStop(0.5, `hsl(${5 + Math.sin(time * 0.5) * 8}deg, 88%, 42%)`);
            gradient.addColorStop(1, `hsl(${15 + Math.sin(time * 0.3) * 8}deg, 90%, 52%)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Animation loop
        function animate() {
            // Clear and redraw
            drawBackground();

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            drawConnections();

            animationId = requestAnimationFrame(animate);
        }

        // Handle mouse interaction
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const mouseDistance = 200;

            particles.forEach(particle => {
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    particle.speedX += (dx / distance) * 0.5;
                    particle.speedY += (dy / distance) * 0.5;
                }
            });
        });

        // Stop animation when visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        });

        observer.observe(canvas);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCanvas);
    } else {
        initializeCanvas();
    }
})();
