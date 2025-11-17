document.addEventListener('DOMContentLoaded', () => {

    // Skill bars
    document.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.setProperty('--target-width', fill.dataset.width);
        fill.style.width = '0';
    });

    // Counters
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;
                const duration = 2000;
                const start = performance.now();
                const animate = now => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    counter.innerText = Math.floor(easeOut * target);
                    if (progress < 1) requestAnimationFrame(animate);
                    else counter.innerText = target;
                };
                requestAnimationFrame(animate);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    document.querySelectorAll('.counter').forEach(c => observer.observe(c));

    // Dark Mode
    const toggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="bx bx-sun"></i>';
    }
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggle.innerHTML = isDark ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });

    // Testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    let current = 0;
    if (testimonials.length > 1) {
        testimonials[0].classList.add('active');
        setInterval(() => {
            testimonials[current].classList.remove('active');
            current = (current + 1) % testimonials.length;
            testimonials[current].classList.add('active');
        }, 5000);
    }
});